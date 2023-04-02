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
      const uniqueArticles = action.payload.articles.filter(
        article =>
          !state.articles.some(
            existingArticle => existingArticle.slug === article.slug,
          ),
      );
      return {
        ...state,
        isLoading: false,
        articles: [...state.articles, ...uniqueArticles],
        articlesCount: action.payload.articlesCount,
      };
    case 'FETCH_ARTICLES_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default articlesReducer;
