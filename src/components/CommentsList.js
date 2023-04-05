import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../styledComponents/CustomText';
import api from '../utils/axios';

const CommentsList = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/articles/${slug}/comments`);
        setComments(response.data.comments);
        console.log(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [slug]);

  return (
    <View style={styles.container}>
      {comments.map((comment, index) => (
        <View key={index} style={styles.comment}>
          <Text>{comment.body}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  comment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
  },
});

export default CommentsList;
