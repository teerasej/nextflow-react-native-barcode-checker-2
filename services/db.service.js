import * as SQLite from "expo-sqlite";
import { useState } from "react";

const dbName = 'barcodeDB.db';
const tableName = 'BarcodeHistory';
const db = SQLite.openDatabase(dbName);

export const initDB = () => {

    // สร้าง State variable ที่แสดงสถานะของ database ที่พร้อมสำหรับการใช้งาน
    const [isDBReady, setIsDBReady] = useState(undefined)

    // สั่งรัน transaction ไปที่ database
    db.transaction(tx => {

        // Execute SQL ในการสร้าง table สำหรับเก็บข้อมูลบาร์โค้ดที่แสกนได้
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, barcodeData text);`,
            [],
            () => {
                
                // กำหนดค่ายืนยันว่า Database และ table พร้อมใช้งานแล้ว
                setIsDBReady(true);
            },
            (error) => {
                // กำหนดค่าว่่า database ไม่พร้อมใช้งาน
                setIsDBReady(false);
                console.error(error);
            }
        );
    });

    // ส่ง State variable ออกไปให้กับ component ที่เรียกใช้ initDB() hook ของเรา
    return { isDBReady };

}

export default db;

