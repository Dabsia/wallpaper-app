import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../helpers/common'
import { themes } from '../constants/themes'

const ImageCard = ({ item, index, router, columns }) => {

    const isLastInRow = () => {
        return (index + 1) % columns === 0
    }

    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item
        return { height: getImageSize(height, width) }
    }
    return (
        <Pressable onPress={() => router.push({ pathname: 'home/image', params: { ...item } })} style={[styles.imageWrapper, !isLastInRow() && styles.spacing]} >
            <Image
                style={[styles.image, getImageHeight()]}
                transition={100}
                source={item?.webformatURL} />
        </Pressable>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%'
    },
    imageWrapper: {
        backgroundColor: themes.colors.grayBg,
        borderRadius: themes.radius.xl,
        borderCurve: 'continuous',
        overflow: 'hidden',
        marginBottom: wp(2)
    },
    spacing: {
        marginRight: wp(2)
    }
})