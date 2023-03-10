import { configureStore } from '@reduxjs/toolkit'
// import slice ที่ต้องการ
import barcodeDataSlice from './barcodeDataSlice'


export default configureStore({
  reducer: {
    // กำหนด slice ให้เป็น reducer ของ store 
    barcode: barcodeDataSlice
  }
})
