import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Text } from 'native-base'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useDispatch } from 'react-redux'
import { barcodeScanned } from '../../redux/barcodeDataSlice'

// import async thunk `saveBarcode` เพื่อส่งข้อมูลไปบันทึกใน database
import { saveBarcode } from '../../services/db.service'

const ScanPage = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const dispatch = useDispatch();  

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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        const action = barcodeScanned(data);
        dispatch(action)

        // ส่งข้อมูล barcode ไปบันทึกใน database ผ่าน Async thunk
        const asyncAction = saveBarcode(data)
        dispatch(asyncAction);

        navigation.goBack()
    };

    return (
        <>
            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </>
    )
}

export default ScanPage

const styles = StyleSheet.create({})