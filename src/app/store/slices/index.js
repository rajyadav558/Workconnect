import { configureStore } from "@reduxjs/toolkit";
import ProductSlicer from './Slicer'
import userSlicer from './userSlicer'
const store = configureStore({
    reducer:{
        product:ProductSlicer,
        users:userSlicer,
    },
})

export default store