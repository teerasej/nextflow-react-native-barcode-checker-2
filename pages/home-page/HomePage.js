import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
// import component ที่จำเป็น
import { Box, FlatList, HStack, Text, VStack } from 'native-base'
import { useSelector } from 'react-redux'

const HomePage = () => {

    // ยกเลิกการดึง barcode.barcodeData 
    // let barcodeData = useSelector(state => state.barcode.barcodeData)

    // ใช้ข้อมูลจาก barcode.barcodeHistories ในการแสดงรายการข้อมูลย้อนหลังแทน
    const barcodeHistories = useSelector(state => state.barcode.barcodeHistories)

    // แสดงข้อมูลใน barcodeHistories บน console
    console.log(barcodeHistories);

    // ปรับการแสดงข้อมูลบนหน้า home page ให้ตอบรับกับข้อมูลการแสกนย้อนหลัง
    return (
        <>
            {
                // เช็คว่ามีข้อมูลย้อนหลังของ barcode หรือไม่ ถ้ามีให้แสดงเป็น list
                barcodeHistories.length > 0 ? (
                    <FlatList
                    // กำหนด barcodeHistories เป็นข้อมูลของ FlatList
                        data={barcodeHistories}
                    // กำหนด function render ที่จะ return เป็น component ที่ต้องการแสดงข้อมูลของแต่ละ item ที่อยู่ใน data ของ FlatList
                    // ในที่นี้ function จะได้ object item มาใช้งานด้วย
                        renderItem={({ item }) => (
                            <Box borderBottomWidth="1" paddingLeft={5} paddingBottom={5} paddingTop={5}>
                                <VStack space={1}>
                                    <Text>id: {item.id}</Text>
                                    <Text>code: {item.barcodeData}</Text>
                                </VStack>
                            </Box>
                        )}
                    />
                    // ถ้าไม่มีให้แสดงเป็นข้อความ nothing here...
                ) : (
                    <Box padding="10">
                        <Text>Nothing here...</Text>
                    </Box >
                )
            }

        </>
    )
}

export default HomePage

const styles = StyleSheet.create({})