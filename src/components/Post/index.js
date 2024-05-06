import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';

const days = 7;

const Post = (props) => {

  const post = props.post;

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Post', {postId: post.id});
  }

  return (
    <Pressable onPress={goToPostPage} style={styles.container}>
      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri:'https://i.em.com.br/Zkntn9UJ_LfIw925yyFAEGjOYI0=/1772x1181/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/29/1500287/outback_1_272600.jpg'}}
      />

      {/* Bed & Bedroom  */}
      <Text style={styles.description}>
        Outback Steakhouse
      </Text>

      {/* Type & Description */}
      <Text style={styles.description} numberOfLines={2}>
  Av. Autonomistas 1400 - Vila Yara, Osasco
      </Text>

      {/*  Old price & new price */}
      <Text style={styles.prices}>
       
      </Text>

      {/*  Total price */}
      <Text > </Text>
    </Pressable>
  );
};

export default Post;
