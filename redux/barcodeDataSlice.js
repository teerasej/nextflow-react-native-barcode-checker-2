import { createSlice } from '@reduxjs/toolkit'

// เรียกใช้ async thunk ที่สร้างไว้
import { saveBarcode } from '../services/db.service';

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
            // เคสที่ saveBarcode ทำงานสมบูรณ์ ไม่มี rejected หรือ error 
            .addCase(saveBarcode.fulfilled, (state, action) => {
                console.log(`Save barcode data succeed, current barcode count: ${action.payload.length}`);
                state.barcodeHistories = action.payload;
            })
            // เคสที่ saveBarcode โดน rejected หรือ error 
            .addCase(saveBarcode.rejected, (state, action) => {
                console.error('Save barcode data failed: ' + action.payload)
            })
    }
});
export const { barcodeScanned } = barcodeDataSlice.actions

export default barcodeDataSlice.reducer