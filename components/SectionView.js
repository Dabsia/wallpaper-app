import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { capitalize, hp } from '../helpers/common'
import { themes } from '../constants/themes'

const SectionView = ({ title, content }) => {
    return (
        <View style={styles.sectionContainer} >
            <Text style={styles.sectionTitle} >{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
}

export const CommonFilterRow = ({ data, filterName, allFilters, setAllFilters }) => {

    const onSelect = (item) => {
        setAllFilters({ ...allFilters, [filterName]: item })
    }

    return (
        <View style={styles.flexRowWrap} >
            {
                data && data?.map((item) => {
                    let isActive = allFilters && allFilters[filterName] === item;
                    let backgroundColor = isActive ? themes.colors.neutral(0.7) : 'white'
                    let color = isActive ? 'white' : themes.colors.neutral(0.7)
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}
                            style={[styles.outlinedButton, { backgroundColor }]}
                        >
                            <Text style={[styles.outlinedButtonText, { color }]} >{capitalize(item)}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export const ColorFilter = ({ data, filterName, allFilters, setAllFilters }) => {

    const onSelect = (item) => {
        setAllFilters({ ...allFilters, [filterName]: item })
    }

    return (
        <View style={styles.flexRowWrap} >
            {
                data && data?.map((item) => {
                    let isActive = allFilters && allFilters[filterName] === item;
                    let borderColor = isActive ? themes.colors.neutral(0.4) : 'white'
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}

                        >
                            <View style={[styles.colorWrapper, { borderColor }]} >
                                <View style={[styles.color, { backgroundColor: item }]} />
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}


export default SectionView

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 6
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: themes.fontWeight.medium,
        color: themes.colors.neutral(0.8)
    },
    flexRowWrap: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    outlinedButton: {
        padding: 8,
        paddingHozontal: 14,
        borderWidth: 1,
        borderColor: themes.colors.grayBg,
        borderRadius: themes.radius.xs,
        borderCurve: 'continuous'
    },
    color: {
        height: 30,
        borderCurve: 'continuous',

        padding: 1,
        width: 40,
        borderRadius: themes.radius.sm

    },
    colorWrapper: {
        padding: 3,
        borderRadius: themes.radius.sm,
        borderWidth: 2,
        borderCurve: 'continuous'
    }
})