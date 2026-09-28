import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },

  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },

  currency : {
    type : String,
    required : true,
    enum : ['PKR' , 'EUR' , 'USD']
  },

  sizes: [
    {
      size: {
        type: String,
        required: true,
        enum: ["XS", ,  "M" ,"S", "L", "XL", "XXL"],
      },

      stock: {
        type: String,
        required: true,
        minLength: 0,
      },

      price : {
        required : true,
        type : Number,
      }
    },
  ],

  images: {
    type: [
      {
        type: String,
      },
    ],

    validate: {
      validator: (images) => images.length <= 5,
      message: "You can upload a maximum of 5 images",
    },
  },

  userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true 
  }
});

const productModel = mongoose.model('products' , productSchema)

export default productModel