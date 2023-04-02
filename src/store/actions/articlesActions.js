import api from '../../utils/axios';

export const fetchArticles = page => async dispatch => {
  dispatch({ type: 'FETCH_ARTICLES_REQUEST' });

  try {
    const response = await api.get('/articles', {
      params: {
        limit: 10,
        offset: page * 10,
      },
    });

    dispatch({
      type: 'FETCH_ARTICLES_SUCCESS',
      payload: response.data.articles,
    });
  } catch (error) {
    dispatch({ type: 'FETCH_ARTICLES_FAILURE', error: error.message });
  }
};
