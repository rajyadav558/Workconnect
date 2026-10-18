
import { createSlice } from "@reduxjs/toolkit";


const ProductSlicer = createSlice({
    name:'product',
    initialState:{},
    reducers:{
        addProduct(state,action){
            state[action.payload[0]]=action.payload[1];
           // console.log("DAAAAAAATA",action.payload)
        },
        removeProduct(state,action){
            alert(action.payload)
            delete state[action.payload[0]]
        },
        clearAllProducts(state,action){
            return {}
        }
    }
})

export default ProductSlicer.reducer
export const {addProduct, removeProduct, clearAllPoducts}=ProductSlicer.actions