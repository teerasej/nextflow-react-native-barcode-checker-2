import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Text } from 'native-base'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useDispatch } from 'react-redux'
import { barcodeScanned } from '../../redux/barcodeDataSlice'


const ScanPage = ({ navigation }) => {

    const dispatch = useDispatch();  

    useEffect(() => {

        console.log('checking permission')

        
    }, []);

    if (hasPermission === null) {
        console.log('requesting permission')
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        console.log('no permission detected')
        return <Text>No access to camera</Text>;
    }

    const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        const action = barcodeScanned(data);
        dispatch(action)

        // ส่งข้อมูล barcode ไปบันทึกใน database ผ่าน Async thunk
        // const asyncAction = saveBarcode(data)
        // dispatch(asyncAction);

        // navigation.goBack()
    };

    return (
        <>
            
        </>
    )
}

export default ScanPage

const styles = StyleSheet.create({})