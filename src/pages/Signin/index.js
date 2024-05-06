import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import User from '../../model/User';

export default function SignIn() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    function logandoUser() {
        console.log('Ift Teste');
        if (email === '' || pass === '') {
            alert("Todos os campos devem ser preenchidos");
            return;
        } else if (email === '') {
            alert("Digite seu e-mail");
            return;
        } else if (pass === '') {
            alert ("Digite sua senha");
            return;
        }

        fetch('http://192.168.0.102:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                pass: pass,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Login bem-sucedido:', data);
            if(data.token){

                AcessaHomi()
            }

            // fetchUserData(data.token);

        })
        .catch(error => console.error('Erro no login:', error));
    }
    const AcessaHomi = () => {
        navigation.navigate("HomeCli")
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message} onPress={() => navigation.navigate('Welcome')}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite um email"
                    style={styles.input}
                    keyboardType='email-address'
                    onChangeText={(text)=>setEmail(text)}
                    value={email}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text)=>setPass(text)}
                />

                <TouchableOpacity style={styles.button} onPress={logandoUser}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('RegisterCli')}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button:{
        backgroundColor:'red',
        width:'100%',
        borderRadius:4,
        paddingVertical:8,
        marginTop:14,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color:'#000',
        fontSize:18,
        fontWeight:'bold'
    },
    buttonRegister:{
        marginTop:14,
        alignSelf:'center'
    },
    registerText:{
        color:'#a1a1a1'
    }
});
