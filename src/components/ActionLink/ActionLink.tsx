import React from 'react';
import {ActionLinkProps} from '.';
import {Text} from 'react-native';

export const ActionLink: React.FC<ActionLinkProps> = ({
  title,
  fontSize,
  isSelected,
  color,
  onTap,
}) => {
  return (
    <Text
      style={{
        fontSize,
        color,
        textDecorationLine: isSelected ? 'underline' : 'none',
      }}
      onPress={onTap}>
      {title}
    </Text>
  );
};
