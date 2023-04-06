import api from '../utils/axios';
import { Alert } from 'react-native';

export const fetchPostDetails = async slug => {
  try {
    const response = await api.get(`/articles/${slug}`);
    return response.data.article;
  } catch (error) {
    Alert.alert('An unexpected error occurred, please try again later.');
    console.error('Error fetching post details:', error);
  }
};

export const fetchPostComments = async slug => {
  try {
    const response = await api.get(`/articles/${slug}/comments`);
    return response.data.comments;
  } catch (error) {
    Alert.alert('An unexpected error occurred, please try again later.');
    console.error('Error fetching comments:', error);
  }
};

export const postCommentOnPost = async (slug, body, token) => {
  try {
    const response = await api.post(
      `/articles/${slug}/comments`,
      {
        comment: { body },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    Alert.alert('An unexpected error occurred, please try again later.');
    console.error('Error posting comment:', error);
  }
};

export const deleteComment = async (slug, commentId, token) => {
  try {
    const res = await api.delete(`/articles/${slug}/comments/${commentId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log('Comment deleted', res);
  } catch (error) {
    Alert.alert('An unexpected error occurred, please try again later.');
    console.error('Error deleting comment:', error);
  }
};
