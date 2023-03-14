import { createAsyncThunk } from "@reduxjs/toolkit";

import * as SQLite from "expo-sqlite";
import { useState } from "react";

const dbName = 'barcodeDB.db';
const tableName = 'BarcodeHistory';
const db = SQLite.openDatabase(dbName);

export const initDB = () => {

    const [isDBReady, setIsDBReady] = useState(undefined)
    

    return { isDBReady };
}

export const saveBarcode = createAsyncThunk(
    'db/saveBarcode',
    async (barcodeData) => {
        
    }
);

// สร้าง async function แบบ thunk เพื่อให้ทำงานแบบ async และกำหนดใช้งานเข้ากับ redux slice ได้
export const loadBarcodeHistories = createAsyncThunk(
    // ตั้งชื่อ 
    'db/loadBarcodeHistories',
    // กำหนด async function 
    async () => {

        
    }
);

export default db;

