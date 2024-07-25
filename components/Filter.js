import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import {
    BottomSheetModal,
    BottomSheetView,

} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { hp, wp } from '../helpers/common';
import { themes } from '../constants/themes';
import SectionView, { ColorFilter, CommonFilterRow } from './SectionView';
import { capitalize } from 'lodash';
import { filters } from './data';

const CustomBackdrop = ({ animatedIndex, style }) => {

    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value, [-1, 0], [0, 1],
            Extrapolation.CLAMP

        )
        return {
            opacity
        }
    })
    const containerStyle = [
        style, styles.overlay, StyleSheet.absoluteFill, containerAnimatedStyle
    ]
    return (
        <Animated.View style={containerStyle} >
            <BlurView style={StyleSheet.absoluteFill}
                tint='dark'
                intensity={25} />
        </Animated.View>
    )
}


const Filter = ({ modalRef, onApply, onReset, onClose, allFilters, setAllFilters }) => {

    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={CustomBackdrop}

        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content} >
                    <Text style={styles.filterText} > Filters</Text>
                    {
                        Object.keys(sections).map((sectionName, index) => {
                            let sectionView = sections[sectionName]
                            let title = capitalize(sectionName)
                            let sectionData = filters[sectionName]
                            return (
                                <Animated.View
                                    entering={FadeInDown.delay((index * 100) + 100).springify().damping(11)}
                                    key={sectionName} >
                                    <SectionView
                                        title={title}
                                        content={sectionView({
                                            data: sectionData,
                                            allFilters,
                                            setAllFilters,
                                            filterName: sectionName
                                        })}

                                    />

                                </Animated.View>

                            )
                        })
                    }
                    <Animated.View
                        style={styles.buttons}
                        entering={FadeInDown.delay(500).springify().damping(11)}
                    >
                        <Pressable style={styles.resetButton} onPress={onReset} >
                            <Text style={[styles.buttonText, { color: themes.colors.neutral(0.9) }]} >Reset</Text>
                        </Pressable>
                        <Pressable style={styles.applyButton} onPress={onApply} >
                            <Text style={[styles.buttonText, { color: themes.colors.white }]} >Apply</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const sections = {
    'order': (props) => <CommonFilterRow {...props} />,
    'orientation': (props) => <CommonFilterRow {...props} />,
    'type': (props) => <CommonFilterRow {...props} />,
    'colors': (props) => <ColorFilter {...props} />,
}


export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,

    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    content: {
        gap: 15,
        width: wp(100),
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    filterText: {
        fontSize: hp(3),
        fontWeight: themes.fontWeight.semibold,
        color: themes.colors.neutral(0.8),
        marginBottom: 5
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    applyButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'continous',
        borderRadius: themes.radius.md,
        backgroundColor: themes.colors.neutral(0.8)
    },
    resetButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderCurve: 'continous',
        borderRadius: themes.radius.md,

        borderColor: themes.colors.grayBg,
        borderWidth: 1
    }

})