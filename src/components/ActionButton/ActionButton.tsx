import React from 'react';
import {ActionButtonProps} from '.';
import {Text, TouchableOpacity, View} from 'react-native';
import {actionButtonStyles as styles} from './ActionButton.styles';

export const ActionButton: React.FC<ActionButtonProps> = ({
  width,
  height,
  radius,
  color,
  title,
  titleStyles,
  disabled,
  onTap,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: width,
          height: height,
          borderColor: color,
          borderWidth: 1,
          borderRadius: radius,
        },
      ]}
      disabled={disabled}
      onPress={onTap}>
      <Text
        style={[
          titleStyles,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
