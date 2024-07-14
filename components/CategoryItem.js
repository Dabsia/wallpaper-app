import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themes } from '../constants/themes'
import { hp } from '../helpers/common'
import Animated, { FadeInRight } from 'react-native-reanimated'

const CategoryItem = ({ title, isActive, index, handleChangeCategory }) => {
    let color = isActive ? themes.colors.white : themes.colors.neutral(0.8)
    let backgroundColor = isActive ? themes.colors.neutral(0.8) : themes.colors.white
    return (
        <Animated.View entering={FadeInRight.delay(index * 200).duration(1000).springify().damping(14)}>
            <Pressable onPress={() => handleChangeCategory(isActive ? null : title)} style={[styles.category, { backgroundColor }]} >
                <Text style={[styles.item, { color }]} >{title}</Text>
            </Pressable>
        </Animated.View>

    )
}

export default CategoryItem

const styles = StyleSheet.create({
    category: {
        padding: 12,
        borderWidth: 1,
        borderColor: themes.colors.grayBg,
        borderRadius: themes.radius.lg,
        borderCurve: 'continuous',
        // backgroundColor: themes.colors.white

    },
    item: {
        fontSize: hp(1.8),
        fontWeight: themes.fontWeight.semibold

    }
})