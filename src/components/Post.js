import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../styledComponents/CustomText';

const Post = ({
  title,
  description,
  tagList,
  favoritesCount,
  author,
  slug,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('PostDetails', { slug: slug });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.authorImage} source={{ uri: author.image }} />
          <Text style={styles.authorUsername}>{author.username}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.tags}>{tagList.join(', ')}</Text>
        <Text style={styles.favoritesCount}>{favoritesCount} favorites</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  tags: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  favoritesCount: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Post;
