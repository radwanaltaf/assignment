import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import Text from '../styledComponents/CustomText';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles } from '../store/actions/articlesActions';
import Post from '../components/Post';

const HomeFeed = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  const loadMoreArticles = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({ item, index }) => <Post {...item} />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (isLoading && articles.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.slug}
        onEndReached={loadMoreArticles}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default HomeFeed;
