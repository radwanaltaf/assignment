const initialState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  error: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ARTICLES_REQUEST':
      return { ...state, isLoading: true };
    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        articles: [...state.articles, ...action.payload],
        articlesCount: action.payload.articlesCount,
      };
    case 'FETCH_ARTICLES_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default articlesReducer;
