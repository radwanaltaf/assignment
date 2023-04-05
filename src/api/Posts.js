import api from '../utils/axios';

export const fetchPostDetails = async slug => {
  const response = await api.get(`/articles/${slug}`);
  return response.data.article;
};

export const fetchPostComments = async slug => {
  const response = await api.get(`/articles/${slug}/comments`);
  return response.data.comments;
};

export const deleteComment = async (slug, commentId) => {
  await api.delete(`/articles/${slug}/comments/${commentId}`);
};
