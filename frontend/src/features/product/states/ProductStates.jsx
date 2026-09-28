import { createSlice } from "@reduxjs/toolkit";
import { createProductThunk, getAllProductsThunk, updateProductThunk, yourProductThunk } from "../apis/ProductApis.thunk";

const productSlice = createSlice({
    name : 'product',
    initialState : {
        allProducts : [],
        userProduct : [],
        isLoading : false,
        yourProduct : [],
        updateData : {},
    },

    reducers : {
        updateAllProduct : (state , action)=>{
            const updateArr = state.allProducts.filter((product)=>{
                return product._id.toString() !== action.payload._id.toString()
            })

            state.allProducts = updateArr

            const yourProductArr = state.yourProduct.filter((product)=>{
                return product._id.toString() !== action.payload._id.toString()
            })

            state.yourProduct = yourProductArr

        },

        updateDataFnc : (state , action)=>{
            state.updateData = action.payload
        }
    },

    extraReducers : (builder)=>{
        builder.addCase(getAllProductsThunk.pending , (state)=>{
            state.isLoading = true
        }) 
        .addCase(getAllProductsThunk.fulfilled , (state , action)=>{
            state.isLoading = false
            const products = []

            for(let i = 1;i<action.payload.data.products.length;i++){
                products.push(action.payload.data.products[i])
            }

            state.allProducts = products
        })
        .addCase(getAllProductsThunk.rejected , (state)=>{ 
            state.isLoading = false
        })
        .addCase(createProductThunk.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(createProductThunk.fulfilled , (state , action)=>{
            state.isLoading = false 
            const arr = [...state.allProducts]
            arr.push(action.payload.data.product)
            state.allProducts = arr
        })
        .addCase(createProductThunk.rejected , (state)=>{
            state.isLoading = false
        })
        .addCase(yourProductThunk.pending , (state)=>{
            state.isLoading = true
        })  
        .addCase(yourProductThunk.fulfilled , (state , action)=>{
            state.isLoading = false
            state.yourProduct = action.payload.data.products
        })
        .addCase(yourProductThunk.rejected , (state, action)=>{
            state.isLoading = false
        })
        .addCase(updateProductThunk.pending , (state , action)=>{
            state.isLoading = true
        })
        .addCase(updateProductThunk.fulfilled , (state , action)=>{
            state.isLoading = false 
            const updateData = state.allProducts.findIndex((product)=>{
                return product._id.toString() === action.payload.data.UpdatedProduct._id.toString()
            })

            state.allProducts[updateData] = action.payload.data.UpdatedProduct
            
            const updateYourData = state.yourProduct.findIndex((product)=>{
                return product._id.toString() === action.payload.data.UpdatedProduct._id.toString()
            })

            state.yourProduct[updateYourData] = action.payload.data.UpdatedProduct
        })
        .addCase(updateProductThunk.rejected , (state ,action)=>{
            state.isLoading = false
        })
    }
})

export const {updateAllProduct , updateDataFnc} = productSlice.actions

export default productSlice.reducer 
