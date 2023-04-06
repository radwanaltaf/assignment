import React from 'react';
import { Text as DefaultText } from 'react-native';

export default function Text(props) {
  const { style, ...otherProps } = props;

  return (
    <DefaultText
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{ fontFamily: 'Iowan Old Style' }, style]}
      {...otherProps}
    />
  );
}
