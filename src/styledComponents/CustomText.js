import React from 'react';
import { Text as DefaultText } from 'react-native';

export default function Text(props) {
  const { style, ...otherProps } = props;

  return (
    <DefaultText
      style={[{ fontFamily: 'Iowan Old Style' }, style]}
      {...otherProps}
    />
  );
}
