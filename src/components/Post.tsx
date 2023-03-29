import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface PostProps {
  title: string;
  description: string;
  tags: string[];
  favoritesCount: number;
  authorImage: string;
  authorUsername: string;
}

const Post: React.FC<PostProps> = ({
  title,
  description,
  tags,
  favoritesCount,
  authorImage,
  authorUsername,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.authorImage} source={{ uri: authorImage }} />
        <Text style={styles.authorUsername}>{authorUsername}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.tags}>{tags.join(', ')}</Text>
      <Text style={styles.favoritesCount}>{favoritesCount} favorites</Text>
    </View>
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
    fontSize: 20,
    fontWeight: 'bold',
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
  },
});

export default Post;
