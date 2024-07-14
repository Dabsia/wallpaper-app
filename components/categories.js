import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { categoriesData } from './data'
import CategoryItem from './CategoryItem'
import { wp } from '../helpers/common'

const Categories = ({ activeCategory, handleChangeCategory }) => {

    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            data={categoriesData}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem
                    index={index}
                    title={item}
                    isActive={activeCategory === item}
                    handleChangeCategory={handleChangeCategory}
                />
            )}
        />

    )
}

export default Categories

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: wp(4),
        gap: 8
    }
})