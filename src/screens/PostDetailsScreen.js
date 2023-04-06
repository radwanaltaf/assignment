import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import {
  fetchPostDetails,
  fetchPostComments,
  deleteComment,
  postCommentOnPost,
} from '../api/Posts';
import CommentForm from '../components/CommentForm';
import CommentsList from '../components/CommentsList';
import Text from '../styledComponents/CustomText';

const PostDetailsScreen = ({ route }) => {
  const { slug } = route.params;
  const { user } = useSelector(state => state.user);

  // State for storing post details and comments
  const [postDetails, setPostDetails] = useState(null);
  const [commentsG, setCommentsG] = useState([]);
  const [showPostMessage, setShowPostMessage] = useState(true);
  const postMessageAnim = useRef(new Animated.Value(0)).current;

  // Fetch post details and comments
  useEffect(() => {
    console.log('slug', user);
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

  const showPostedMessage = () => {
    setShowPostMessage(true);
    Animated.timing(postMessageAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(postMessageAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowPostMessage(false);
        });
      }, 3400);
    });
  };

  const handleDeleteComment = async commentId => {
    await deleteComment(slug, commentId, user.token);
    setCommentsG(commentsG.filter(comment => comment.id !== commentId));
  };

  const submitComment = async body => {
    console.log('Submitting comment', user.token);
    const response = await postCommentOnPost(slug, body, user.token);
    if (response.status === 200) {
      showPostedMessage();
      const newComment = response.data.comment;
      setCommentsG(prevComms => [...prevComms, newComment]);
      console.log(newComment);
    } else {
      console.log('Error submitting comment:', response);
    }
  };

  return (
    <ScrollView>
      {postDetails && (
        <View style={styles.container}>
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

          <View style={styles.divider} />

          <CommentForm
            onSubmit={submitComment}
            disabled={user ? false : true}
            slug={slug}
          />

          <CommentsList
            user={user}
            commentsList={commentsG}
            handleDeleteComment={handleDeleteComment}
          />
          {showPostMessage && (
            <Animated.View
              style={[
                styles.postMessageContainer,
                {
                  opacity: postMessageAnim,
                  transform: [
                    {
                      translateY: postMessageAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.postMessage}>Posted</Text>
            </Animated.View>
          )}
        </View>
      )}
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
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  postMessageContainer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  postMessage: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PostDetailsScreen;
