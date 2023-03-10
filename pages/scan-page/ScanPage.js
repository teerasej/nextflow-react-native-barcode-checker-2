import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Text } from 'native-base'

import { BarCodeScanner } from 'expo-barcode-scanner'

const ScanPage = () => {

    const [hasPermission, setHasPermission] = useState(null);

    // สร้าง State variable สำหรับเก็บค่ายืนยันว่า Scan สำเร็จไปหรือยัง
    const [scanned, setScanned] = useState(false);

    useEffect(() => {

        console.log('checking permission')

        const getBarCodeScannerPermissions = async () => {
            const result = await BarCodeScanner.requestPermissionsAsync();
            console.log(`Permission: ${result.granted}`)
            setHasPermission(result.granted);
        };

        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        console.log('requesting permission')
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        console.log('no permission detected')
        return <Text>No access to camera</Text>;
    }

    // กำหนด function ที่จะรับข้อมูลการแสกน
    const handleBarCodeScanned = ({ type, data }) => {

        // กำหนด State scanned เป็น true เพื่อยืนยันว่า Scan เสร็จแล้ว จะไม่ต้องอ่านค่า barcode อีก
        setScanned(true);

        // alert popup ประเภท และข้อมูลบาร์โค้ดที่แสกนได้
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    return (
        <>
            {/* 
                ใส่ function ให้กับ event onBarCodeScanned  
                โดยเทียบค่า state variable ชื่อ scanned ว่าถ้าแสกนไปแล้วก็ไม่ต้องเรียกใช้ function รับข้อมูลการแสกน
            */}
            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </>
    )
}

export default ScanPage

const styles = StyleSheet.create({})