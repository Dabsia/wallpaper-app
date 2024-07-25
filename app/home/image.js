import { ActivityIndicator, Alert, Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { hp, wp } from '../../helpers/common'
import { Image } from 'expo-image'
import { themes } from '../../constants/themes'
import { Entypo, Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
// import Toast from 'react-native-toast-message'

const ImagePage = () => {

    const [status, setStatus] = useState('loading')

    const router = useRouter()
    const item = useLocalSearchParams()
    let uri = item?.webformatURL

    const fileName = item?.previewURL?.split('/').pop()
    const imageUrl = uri

    const filePath = `${FileSystem.documentDirectory}${fileName}`

    const getSize = () => {
        const aspectRation = item?.imageWidth / item?.imageHeight
        const maxWidth = Platform.OS == 'web' ? wp(50) : wp(92)
        let calcHeight = maxWidth / aspectRation
        let calcWidth = maxWidth

        if (aspectRation < 1) //portrait image
        {
            calcWidth = calcHeight * aspectRation
        }
        return {
            width: calcWidth,
            height: calcHeight
        }
    }

    const onLoad = () => {
        setStatus('')
    }

    const downloadImage = async () => {
        setStatus('downloading')
        await downloadFile()
        if (uri)
            setStatus('')
    }

    const shareImage = async () => {
        setStatus('sharing')
        let uri = await downloadFile()
        if (uri) {
            // share image
            await Sharing.shareAsync(uri)
            setStatus('')
        }
    }

    // const showToast = ({ message }) => {
    //     ToastAndroid.show({
    //         type: 'success',
    //         text1: message,
    //         postion: 'bottom'
    //     })
    // }

    // const toastConfig = {
    //     success: ({ text1, props, ...rest }) => {
    //         return (
    //             <View style={styles.toast} >
    //                 <Text style={styles.toastText} >{text1}</Text>
    //             </View>
    //         )
    //     }
    // }

    const downloadFile = async () => {
        try {
            const { uri } = await FileSystem.downloadAsync(imageUrl, filePath)
            console.log('I am', uri)
            return uri

        }
        catch (err) {
            console.log(err.message)
            setStatus('')
            Alert.alert('Image: ', err.message)
            return null
        }
    }



    return (
        <BlurView
            tint='dark'
            intensity={60}
            style={styles.container}
        >
            <View style={[{ marginBottom: 10 }, getSize()]} >
                <View style={styles.loading} >
                    {
                        status === 'loading' && <ActivityIndicator size='large' color='white' />
                    }
                </View>
                <Image
                    transition={100}
                    style={[styles.image, getSize()]}
                    source={uri}
                    onLoad={onLoad}
                />
            </View>
            <View style={styles.buttons} >
                <Animated.View
                    entering={FadeInDown.springify()}
                >
                    <Pressable onPress={() => router.back()} style={styles.button} >
                        <Octicons name='x' size={24} color='white' />
                    </Pressable>
                </Animated.View>
                <Animated.View
                    entering={FadeInDown.springify().delay(100)}
                >
                    {
                        status == 'downloading' ? (
                            <View style={styles.button} >
                                <ActivityIndicator size='small' color='white' />
                            </View>
                        ) :
                            <Pressable style={styles.button} onPress={downloadImage} >
                                <Octicons name='download' size={24} color='white' />
                            </Pressable>
                    }

                </Animated.View>
                <Animated.View
                    entering={FadeInDown.springify().delay(200)}
                >
                    {
                        status == 'sharing' ? (
                            <View style={styles.button} >
                                <ActivityIndicator size='small' color='white' />
                            </View>
                        ) :
                            <Pressable style={styles.button} onPress={shareImage} >
                                <Entypo name='share' size={22} color='white' />
                            </Pressable>
                    }

                </Animated.View>
            </View>


        </BlurView>
    )
}

export default ImagePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: wp(4)

    },
    image: {
        borderRadius: themes.radius.lg,
        borderWidth: 2,
        borderColor: 'rgba(225,225,225,0.1)',
        backgroundColor: 'rgba(225,225,225,0.1)',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 50
    },
    button: {
        height: hp(6),
        width: hp(6),
        alignItems: 'center',
        backgroundColor: 'rgba(225,225,225,0.1)',
        borderCurve: 'continuous',
        justifyContent: 'center',
        borderRadius: themes.radius.md
    }

})