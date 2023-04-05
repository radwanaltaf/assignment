import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import Text from '../styledComponents/CustomText';

const CommentForm = ({ onSubmit, disabled }) => {
  const [body, setBody] = useState('');
  const user = useSelector(state => state.user);

  const handleSubmit = () => {
    if (disabled) {
      Alert.alert('You must be logged in to comment');
      return;
    }
    onSubmit(body);
    setBody('');
  };

  return (
    <View style={styles.inputContainer}>
      {user && (
        <Image
          source={{ uri: 'https://i.imgur.com/9pNffkj.png' }}
          style={styles.avatar}
        />
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={setBody}
        value={body}
        editable={!disabled}
        placeholder='Comment on this...'
        placeholderTextColor={disabled ? '#ccc' : '#999'}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={body === '' ? true : false}
        style={styles.submitButton}
      >
        <View style={styles.postButtonContainer}>
          <Text style={styles.postButtonText}>Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 55,
    marginLeft: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
  },
  avatar: {
    position: 'absolute',
    left: -50,
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  submitButton: {
    position: 'absolute',
    right: -60,
  },
  postButtonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CommentForm;
