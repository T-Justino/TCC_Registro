import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>

                <Animatable.Image
                    animation={"flipInY"}
                    delay={400}
                    source={require('../../assets/logoTCC.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />

            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Reserve sua mesa de qualquer lugar!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <SafeAreaView style={styles.btnFix}>
                    <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonText}>Cliente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('SignInRest')}>
                        <Text style={styles.buttonText}>Restaurante</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'

    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        paddingStart: '5%'
    },
    text: {
        color: '#a1a1a1',
        paddingStart: '5%'
    },
    button1: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 50,
        paddingVertical: 8,
        width: '40%',
        alignSelf: 'flex-start',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: '5%'
    },
    button2: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 50,
        paddingVertical: 8,
        width: '40%',
        alignSelf: 'flex-end',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: '5%',
        marginStart: '5%',

    },
    buttonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    btnFix: {
        flex: 1,
        padding: 5


    }
})