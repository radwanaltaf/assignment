import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Post from './post';

const HomeFeed = ({ posts }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeFeed;
