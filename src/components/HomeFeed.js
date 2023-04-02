import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles } from '../store/actions/articlesActions';
import Post from './Post';

const HomeFeed = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [page]);

  const loadMoreArticles = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({ item, index }) => <Post {...item} />;

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={item => item.slug}
      onEndReached={loadMoreArticles}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
    />
  );
};

export default HomeFeed;
