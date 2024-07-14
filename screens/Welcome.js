import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Welcome = () => {
    return (
        <View styles={styles.container} >
            <StatusBar style='dark' />
            <Image
                source={require('../assets/welcome.png')}
                style={styles.bgImage}
                resizeMode='cover'
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Welcome