import { StyleSheet, View } from 'react-native'
import React from 'react'
// import component ที่จำเป็น
import { Box, HStack, Text } from 'native-base'

const HomePage = () => {
    return (
        <>
            {/* กำหนดพื้นที่ safe area และสี */}
            <Box safeAreaTop bgColor="violet.800" />
            {/* กำหนดส่วนที่เป็น  header */}
            <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" w="100%">
                {/* กำหนดข้อความ */}
                <Text color="white" fontSize="20" fontWeight="bold">
                    Home
                </Text>
            </HStack>
        </>
    )
}

export default HomePage

const styles = StyleSheet.create({})