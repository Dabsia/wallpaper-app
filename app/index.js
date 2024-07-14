import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { hp, wp } from '../helpers/common'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { themes } from '../constants/themes'
import { useRouter } from 'expo-router'

const Welcome = () => {

    const router = useRouter()

    return (
        <View styles={styles.container} >
            <StatusBar style='light' />
            <ImageBackground
                source={require('../assets/welcome.png')}
                style={styles.bgImage}
                resizeMode='cover'
            />
            {/**Linear Gradient */}
            <Animated.View entering={FadeInDown.duration(600)} style={styles.bottomContainer} >
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                />
                <View style={styles.contentContainer} >
                    <View>
                        <Animated.Text
                            entering={FadeInDown.delay(400).springify()}
                            style={styles.title}
                        >Pixels</Animated.Text>
                        <Animated.Text
                            entering={FadeInDown.delay(500).springify()}
                            style={styles.punchLine}
                        >Every Pixel Tells a Story</Animated.Text>

                        <Animated.View
                            entering={FadeInDown.delay(600).springify()}
                        >
                            <Pressable onPress={() => router.push('home')} style={styles.startButton} >
                                <Text style={styles.startText} >Start Exploring</Text>
                            </Pressable>
                        </Animated.View>
                    </View>

                </View>

            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bgImage: {
        height: '100%',
        width: wp(100),

    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        height: '60%',
        width: '100%'
    },
    gradient: {
        width: wp(100),
        height: hp(65)

    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
        position: 'absolute',
        bottom: 0,

    },
    title: {
        textAlign: 'center',
        fontSize: hp(7),
        color: themes.colors.neutral(0.9),
        fontWeight: themes.fontWeight.bold
    },
    punchLine: {
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: themes.fontWeight.medium
    },
    startButton: {
        marginBottom: 50,
        backgroundColor: themes.colors.neutral(0.9),
        padding: 15,
        paddingHorizontal: 70,
        borderCurve: 'continuous',
        borderRadius: 500,

    },
    startText: {
        color: themes.colors.white,
        fontSize: hp(2),
        fontWeight: themes.fontWeight.medium,
        letterSpacing: 1
    }
})

export default Welcome