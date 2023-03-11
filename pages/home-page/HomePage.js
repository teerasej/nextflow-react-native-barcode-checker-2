import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Box, FlatList, HStack, Text, VStack } from 'native-base'

// เรียกใช้งาน useDispatch
import { useDispatch, useSelector } from 'react-redux'

import { loadBarcodeHistories } from '../../services/db.service'

const HomePage = () => {

    const barcodeHistories = useSelector(state => state.barcode.barcodeHistories)

    // เรียกใช้ dispatch สำหรับการใช้ thunk
    const dispatch = useDispatch();

    // ทำการ dispatch action ของ thunk เพื่อโหลดข้อมูลจาก SQLite ตอนเริ่มแสดงหน้า HomePage
    useEffect(() => {
      dispatch(loadBarcodeHistories())

    //   ถ้า dispatch เป็นตัวเดิม กลไก useEffect จะไม่ทำงานอีก
    }, [dispatch])
    

    console.log(barcodeHistories);

    return (
        <>
            {
                barcodeHistories.length > 0 ? (
                    <FlatList
                        data={barcodeHistories}
                        renderItem={({ item }) => (
                            <Box borderBottomWidth="1" paddingLeft={5} paddingBottom={5} paddingTop={5}>
                                <VStack space={1}>
                                    <Text>id: {item.id}</Text>
                                    <Text>code: {item.barcodeData}</Text>
                                </VStack>
                            </Box>
                        )}
                    />
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