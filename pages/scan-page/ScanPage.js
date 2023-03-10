import { StyleSheet, View } from 'react-native'

// Import React hook 
// 1. useEffect เพื่อรันโค้ดหลังจากที่ component render ขึ้นมาบนหน้าจอแล้ว
// 2. useState เพื่อใช้งานกลไก State
import React, { useEffect, useState } from 'react'

import { Box, HStack, Text } from 'native-base'

// Import BarcodeScanner
import { BarCodeScanner } from 'expo-barcode-scanner'

const ScanPage = () => {

    // สร้าง State variable เก็บค่าผลลัพธ์การขอ permission ในการเปิดกล้องแสกน
    const [hasPermission, setHasPermission] = useState(null);

    // ใช้ useEffect เพื่อรัน function ด้านใน หลังจาก component render ขึ้นมาบนหน้าจอแล้ว
    useEffect(() => {

        console.log('checking permission')

        // สร้าง async function ในการเช็คการขอ permission barcode scanner
        const getBarCodeScannerPermissions = async () => {
            const result = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Permission: ${result.granted}`)
            setHasPermission(result.granted);
        };

        // เรียกใช้ Async function
        getBarCodeScannerPermissions();
    }, []);

    // เช็ค permission เพื่อแสดงข้อความบนหน้าจอที่แตกต่างกัน
    if (hasPermission === null) {
        console.log('requesting permission')
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        console.log('no permission detected')
        // ถ้าไม่มี permission ก็จะขึ้นข้อความแบบนี้
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            {/* แสดงส่วนกล้อง Scan */}
            <BarCodeScanner 
                style={StyleSheet.absoluteFillObject}
            />
        </>
    )
}

export default ScanPage

const styles = StyleSheet.create({})