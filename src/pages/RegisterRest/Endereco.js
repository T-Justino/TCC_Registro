import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Endereco() {
    const navigation = useNavigation();
    const route = useRoute();
    const { name, email, cnpj, cep, pass, confirmPass } = route.params;

    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");

    useEffect(() => {
        if (cep) {
            buscarCEP(cep);
        }
    }, [cep]);

    const buscarCEP = async (cep) => {
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
            if (!response.ok) {
                throw new Error('Não foi possível obter os dados do CEP');
            }
            const data = await response.json();
            setCidade(data.city);
            setRua(data.street);
            setBairro(data.neighborhood);
            setNumero("");
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível obter os dados do CEP');
        }
    }

    const salvarEndereco = async () => {
        try {
            const response = await fetch('http://192.168.0.102:3000/auth/register_rest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    cnpj,
                    cep,
                    pass,
                    confirmPass,
                    cidade,
                    bairro,
                    rua,
                    numero,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Erro ao salvar endereço');
            }

            Alert.alert('Sucesso', 'Endereço salvo com sucesso');
            navigation.navigate("SignInRest");
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', error.message || 'Não foi possível salvar o endereço');
        }
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Endereço Restaurante</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>CEP</Text>
                <TextInput
                    placeholder="Digite o CEP"
                    style={styles.input}
                    keyboardType='number-pad'
                    value={cep}
                    editable={false}
                />

                <Text style={styles.title}>Cidade</Text>
                <TextInput
                    style={styles.input}
                    editable={false}
                    value={cidade}
                />

                <Text style={styles.title}>Bairro</Text>
                <TextInput
                    style={styles.input}
                    editable={false}
                    value={bairro}
                />

                <Text style={styles.title}>Rua</Text>
                <TextInput
                    style={styles.input}
                    editable={false}
                    value={rua}
                />

                <Text style={styles.title}>Número</Text>
                <TextInput
                    placeholder="Número"
                    style={styles.input}
                    keyboardType='number-pad'
                    onChangeText={setNumero}
                    value={numero}
                />

                <TouchableOpacity style={styles.button} onPress={salvarEndereco}>
                    <Text style={styles.buttonText}>Salvar Endereço</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignInRest')}>
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
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    }
});
