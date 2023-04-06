import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../styledComponents/CustomText';

const CommentsList = ({ commentsList, user, handleDeleteComment }) => {
  console.log(user);
  return (
    <View style={styles.container}>
      {commentsList.map((comment, index) => (
        <View key={index} style={styles.comment}>
          <Image style={styles.avatar} source={{ uri: comment.author.image }} />
          <View style={styles.commentContent}>
            <Text style={styles.authorUsername}>{comment.author.username}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>

            {user && user.username === comment.author.username && (
              <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                <Text style={styles.deleteCommentText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  authorUsername: {
    fontWeight: 'bold',
  },
  commentBody: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  deleteCommentText: {
    fontSize: 12,
    color: 'red',
    marginTop: 8,
  },
});

export default CommentsList;
