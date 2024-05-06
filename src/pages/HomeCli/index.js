import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable'

const prod = [
    {
        codigo_produto: 1,
        codigo_categoria: 1,
        nome_produto: 'Outback SteakHouse',
        valor_produto: '90,00',
        imagem_livro:require('../HomeCli/outback.png'),
        descricao_produto: 'Av. dos Autonomistas,1400'
    },
    {
        codigo_produto: 2,
        codigo_categoria: 1,
        nome_produto: 'Mouse',
        valor_produto: '90,00',
        imagem_livro:require('../HomeCli/outback2.png'),
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 3,
        codigo_categoria: 5,
        nome_produto: 'Isaac SmartWatch',
        valor_produto: '90,00',
        imagem_livro: { uri:'https://www.baressp.com.br/bares/fotos/outback_alphaville_011.jpg'},
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 4,
        codigo_categoria: 5,
        nome_produto: 'SmartPhone',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 5,
        codigo_categoria: 4,
        nome_produto: 'Camiseta',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 6,
        codigo_categoria: 4,
        nome_produto: 'Calça',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 7,
        codigo_categoria: 3,
        nome_produto: 'Desodorante',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 8,
        codigo_categoria: 3,
        nome_produto: 'Shampoo',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 9,
        codigo_categoria: 2,
        nome_produto: 'Caderno',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
    {
        codigo_produto: 10,
        codigo_categoria: 2,
        nome_produto: 'Caneta',
        valor_produto: '90,00',
        imagem_livro: { uri: 'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg' },
        descricao_produto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque libero, tempor id blandit id, interdum ut sapien.'
    },
];

const prodItem = ({ item }) => {
    return (
        <View style={styles.container2}>
        <TouchableOpacity onPress={() => { }}>
            {/* Image  */}
            <Image
                style={styles.image}
                source={item.imagem_livro}
            />
        </TouchableOpacity>

        {/* Bed & Bedroom  */}
        <Text style={styles.description}>
            {item.nome_produto}
        </Text>

        {/* Type & Description */}
        <Text style={styles.description} numberOfLines={2}>
            {item.descricao_produto}
        </Text>

        {/*  Old price & new price */}
    </View>
    );

}
export default function HomeCli() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <TouchableOpacity>
                        <View style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={styles.text}>Where to?</Text>
                                <Text style={styles.subText}>Anywhere · Any week</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>

            </View>

            <SafeAreaView style={styles.container1}>
                <FlatList
                    data={prod}
                    renderItem={prodItem}
                    ListEmptyComponent={<Text>A LISTA DE PRODUTOS ESTÁ VAZIA</Text>}
                    keyExtractor={prod => prod.codigo_produto}
                />

            </SafeAreaView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: 100,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    container1: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        margin: 20,
        borderBottomWidth:0.5,
        paddingBottom:20,
        borderColor:'#a2a2a2',
        borderRadius: 10,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
        paddingTop: 10
    },

    searchBtn: {
        backgroundColor: '#D7D7D7',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#d5d5d5',
        borderRadius: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 24,
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    subText: {
        color: 'grey',
        fontSize: 15,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 250, // ajuste conforme necessário
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth:2.5,
        borderColor:'#FE0000'
    },

    bedrooms: {
        marginVertical: 10,
        color: '#5b5b5b',
    },
    description: {
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        color: '#fff'
    },
    prices: {
        fontSize: 18,
        marginVertical: 10,
    },
    oldPrice: {
        color: '#5b5b5b',
        textDecorationLine: 'line-through',
    },
    price: {
        fontWeight: 'bold',
    },
    totalPrice: {
        color: '#5b5b5b',
        textDecorationLine: 'underline',
    }
});
