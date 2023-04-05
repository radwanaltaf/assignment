import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  fetchPostDetails,
  fetchPostComments,
  deleteComment,
} from '../api/Posts';
import Text from '../styledComponents/CustomText';

const PostDetailsScreen = ({ route }) => {
  const { slug } = route.params;
  const { user } = useSelector(state => state.user);

  // State for storing post details and comments
  const [postDetails, setPostDetails] = useState(null);
  const [commentsG, setCommentsG] = useState([]);

  // Fetch post details and comments
  useEffect(() => {
    const fetchDetailsAndComments = async () => {
      const [details, comments] = await Promise.all([
        fetchPostDetails(slug),
        fetchPostComments(slug),
      ]);
      setPostDetails(details);
      setCommentsG(comments);
    };

    fetchDetailsAndComments();
  }, [slug]);

  const handleDeleteComment = async commentId => {
    await deleteComment(slug, commentId);
    setCommentsG(commentsG.filter(comment => comment.id !== commentId));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {postDetails && (
          <View>
            <View style={styles.header}>
              <Image
                style={styles.authorImage}
                source={{ uri: postDetails.author.image }}
              />
              <Text style={styles.authorUsername}>
                {postDetails.author.username}
              </Text>
            </View>
            <Text style={styles.title}>{postDetails.title}</Text>
            <Text style={styles.description}>{postDetails.description}</Text>
            <Text style={styles.tags}>{postDetails.tagList.join(', ')}</Text>
            <Text style={styles.favoritesCount}>
              {postDetails.favoritesCount} favorites
            </Text>
          </View>
        )}
        {commentsG.map(comment => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.author.username}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
            {user && user.username === comment.author.username && (
              <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                <Text style={styles.deleteCommentText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 16,
  },
  authorUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft: 5,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  tags: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
    marginBottom: 10,
  },
  favoritesCount: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  commentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  deleteCommentText: {
    fontSize: 12,
    color: 'red',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default PostDetailsScreen;
