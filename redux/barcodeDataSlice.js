import { createSlice } from '@reduxjs/toolkit'

// เรียกใช้ async thunk ที่สร้างไว้
import { loadBarcodeHistories, saveBarcode } from '../services/db.service';

const initialState = {
    barcodeData: undefined,
    barcodeHistories: [],
}

const barcodeDataSlice = createSlice({
    name: 'barcodeData',
    initialState,
    reducers: {
        barcodeScanned: (state, action) => {
            console.log(`barcode data in slice: ${action.payload}`)
            state.barcodeData = action.payload;
        }
    },

    // กำหนดเคสที่จะทำงานเมื่อ async thunk 'saveBarcode' ทำงานเสร็จ ด้วย Builder ใน extraReducers ของ slice
    extraReducers: (builder) => {
        builder
            .addCase(saveBarcode.fulfilled, (state, action) => {
                console.log(`Save barcode data succeed, current barcode count: ${action.payload.length}`);
                state.barcodeHistories = action.payload;
            })
            .addCase(saveBarcode.rejected, (state, action) => {
                console.error('Save barcode data failed: ' + action.payload)
            })
            // เคสที่ loadBarcodeHistories ทำงานสมบูรณ์ ไม่มี rejected หรือ error 
            .addCase(loadBarcodeHistories.fulfilled, (state, action) => {
                console.log(`Load barcode data succeed, current barcode count: ${action.payload.length}`);
                state.barcodeHistories = action.payload;
            })
            // เคสที่ loadBarcodeHistories โดน rejected หรือ error 
            .addCase(loadBarcodeHistories.rejected, (state, action) => {
                console.error('Load barcode data failed: ' + action.payload)
            })
    }
});
export const { barcodeScanned } = barcodeDataSlice.actions

export default barcodeDataSlice.reducer