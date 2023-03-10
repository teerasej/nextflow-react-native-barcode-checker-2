import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
// import component ที่จำเป็น
import { Box, HStack, Text } from 'native-base'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

const HomePage = () => {

    let barcodeData = useSelector(state => state.barcode.barcodeData)

    console.log(barcodeData);

    return (
        <>
            <Box padding="10">
                {barcodeData ?
                    <Text>Barcode Data: {barcodeData}</Text>
                    : <Text>Nothing here...</Text>
                }
            </Box>
        </>
    )
}

export default HomePage

const styles = StyleSheet.create({})