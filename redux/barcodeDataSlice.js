import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    barcodeData: undefined
}

const barcodeDataSlice = createSlice({
    name: 'barcodeData',
    initialState,

    // กำหนด function ชื่อ barcodeScanned เป็น reducer 
    //   - โดยที่ตัว function จะทำงานเมื่อมีการเรียกใช้จากภายใน component
    //   - ทุกครั้งที่ function reducer ทำงาน จะได้รับ state object ล่าสุด และ action ที่ส่งมาจาก component เสมอ
    reducers: {
        barcodeScanned: (state, action) => {
            console.log(`barcode data in slice: ${action.payload}`)
            // ดึงค่าที่ส่งมากับ action ใส่ลงไปใน state
            state.barcodeData = action.payload;
        }
    }
});

// กำหนด action สำหรับส่งไปเรียกใช้ที่ส่วนอื่นของแอพ
export const { barcodeScanned } = barcodeDataSlice.actions

export default barcodeDataSlice.reducer