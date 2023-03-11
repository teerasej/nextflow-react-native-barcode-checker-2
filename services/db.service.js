
// import function ในการสร้าง Async thynk ของ redux 
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as SQLite from "expo-sqlite";
import { useState } from "react";

const dbName = 'barcodeDB.db';
const tableName = 'BarcodeHistory';
const db = SQLite.openDatabase(dbName);

export const initDB = () => {

    const [isDBReady, setIsDBReady] = useState(undefined)
    db.transaction(tx => {

        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, barcodeData text);`,
            [],
            () => {
                
                setIsDBReady(true);
            },
            (error) => {
                setIsDBReady(false);
                console.error(error);
            }
        );
    });

    return { isDBReady };

}

// สร้าง async function แบบ thunk เพื่อให้ทำงานแบบ async และกำหนดใช้งานเข้ากับ redux slice ได้
export const saveBarcode = createAsyncThunk(
    // ตั้งชื่อ 
    'db/saveBarcode',
    // กำหนด async function ที่จะรับค่า barcode data มา
    async (barcodeData: String) => {

        // สร้าง Promise object เพื่อควบคุมการทำงานแบบ Async ด้วยตัวเอง
        // เพราะ sqlite api ของ Expo มีแต่ callback function ไม่มีโหมดการทำงานแบบ async 
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    // ใส่ข้อมูล barcode ลงไปใน database
                    tx.executeSql(
                        `INSERT INTO ${tableName} (barcodeData) values (?)`,
                        // กำหนดตัวแปรลงไปใน array เพื่อให้เอาไปแทนที่ ? ใน SQL statement
                        [barcodeData],
                       
                        () => {},
                        // ถ้าไม่สำเร็จ เรียกใช้ reject() function ถือเป็นการสิ้นสุดการทำงานของ promise 
                        // และเรียกว่าสถานะ rejected ใน slice's extra reducer
                        (error) => reject(error)
                    );

                    // Query ข้อมูลจาก Database 
                    tx.executeSql(
                        `SELECT * FROM ${tableName} ORDER BY id DESC`,
                        [],
                        (tx, { rows }) => {
                            // ถ้าสำเร็จ เรียกใช้ resolve() function ถือเป็นการสิ้นสุดการทำงานของ promise 
                            // และเรียกว่าสถานะ fulfiled ใน slice's extra reducer
                            // ในที่นี้เราจะส่งข้อมูลที่ query ได้กลับออกไปใน redux slice ในฐานะของ Action Payload 
                            resolve(rows._array);
                        },
                        // ถ้าไม่สำเร็จ เรียกใช้ reject() function ถือเป็นการสิ้นสุดการทำงานของ promise 
                        // และเรียกว่าสถานะ rejected ใน slice's extra reducer
                        (error) => reject(error)
                    );
    
            });
        })
    }
);

export default db;

