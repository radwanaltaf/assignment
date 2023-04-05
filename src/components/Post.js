import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Text from '../styledComponents/CustomText';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { postCommentOnPost } from '../api/Posts';
import { useSelector } from 'react-redux';

const Post = ({
  title,
  description,
  tagList,
  favoritesCount,
  author,
  slug,
}) => {
  const navigation = useNavigation();
  const [showPostMessage, setShowPostMessage] = useState(true);
  const postMessageAnim = useRef(new Animated.Value(0)).current;
  const user = useSelector(state => state.user.user);
  const handlePress = () => {
    navigation.navigate('PostDetails', { slug: slug });
  };

  const submitComment = async body => {
    console.log('Submitting comment', user.user.token);
    const response = await postCommentOnPost(slug, body, user.user.token);
    if (response.status === 200) {
      showPostedMessage();
    }
    console.log(response);
  };

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

        <View style={styles.divider} />

        <CommentForm
          onSubmit={submitComment}
          disabled={user ? false : true}
          slug={slug}
        />

        <CommentsList slug={slug} />

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

export default Post;
