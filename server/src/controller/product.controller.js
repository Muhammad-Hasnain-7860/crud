import productModel from "../model/product.mode.js"
import { uploadFile } from "../services/upload.service.js"

export const productCreate = async (req , res) => {
    const {title , description , sizes , userId , currency} = req.body

    const user = req.user

    const filesImages = []

    if(!req.files.length === 0){
       return res.status(400).json({
            message : 'images is Required'
        })
    }

    for(let i = 0;i<req.files.length;i++){
       const response = await uploadFile(req.files[i].buffer , req.files[i].originalname)
       filesImages.push(response.url)
    }
    
    const product = await productModel.create({
        title,
        description,
        sizes,
        userId : user._id,
        images : filesImages,
        currency
    })


    return res.status(201).json({
        message : 'product created SuccessFully',
        data : {
            product : product
        }
    })
}

export const getAllProduct = async (req , res) => {
    const products = await productModel.find()

    return res.status(200).json({
        message : 'all product Fetched SuccessFully',
        data : {
            products : products
        }
    })
}

export const getSingleProduct = async (req, res) => {
    const id = req.params.id

    const product = await productModel.findById(id)

    if(!product){
       return res.status(404).json({
            message  :'product not found'
        })
    }

   return res.status(200).json({
        message : 'get single product fetched SuccessFully',
        data : {
            product : product
        }
    })
}

export const deleteProduct = async (req , res) => {
    const id = req.params.id 
    const user = req.user

    const deleteProduct = await productModel.findById(id)

    if(!deleteProduct){
       return res.status(404).json({
            message  :'product not found'
        })
    }

    if(deleteProduct.userId.toString() !== user._id.toString()){
       return res.status(400).json({
            message: "You can only delete your own products"
        })
    }

    const data = await productModel.findByIdAndDelete(id)

    return res.status(200).json({
        message  : 'product deleted SuccessFully',
        data : {
            product: data
        }
    })
}

export const updateProduct = async (req,res) => {
    const {title , description , sizes , userId , existingImages , currency} = req.body
    
    const id = req.params.id 

    const product = await productModel.findById(id)

    if(!product){
       return res.status(404).json({
            message : 'product not found'
        })
    }

    if(!existingImages){
       return res.status(400).json({
            message  : 'existing Images is Required'
        })
    }

    let parseExistingImages = []

    try {
         parseExistingImages = JSON.parse(existingImages)
    } catch (error) {
        res.status(400).json({
            message : 'invalid existing Images'
        })
    }

    const newImagesURLS = []

    if(req.files?.length > 0){
        for(let i = 0;i<req.files.length;i++){
           const response = await uploadFile(req.files[i].buffer , req.files[i].originalname)
           newImagesURLS.push(response.url)
        }
    }

    const existingAndNew = parseExistingImages.concat(newImagesURLS)

    const updated = await productModel.findByIdAndUpdate(id , {
        title : title,
        description : description,
        sizes : sizes,
        images : existingAndNew,
        userId : userId,
        currency : currency
    },{
        returnDocument : 'after'
    })

    console.log(updated)

    return res.status(200).json({
        message : 'product updated SuccessFully',
        data : {
            UpdatedProduct : updated
        }
    })

}

export const userProduct = async (req , res) => {
    const user = req.user 

    const products = await productModel.find()

    const userProduct = products.filter((p)=>{
        return p.userId.toString() === user._id.toString()
    })

    return res.status(200).json({
        message : 'your products fetched successFully',
        data: {
            products : userProduct
        }
    })
}