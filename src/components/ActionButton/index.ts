import {TextStyle} from 'react-native';

export interface ActionButtonProps {
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  title: string;
  titleStyles?: TextStyle;
  disabled: boolean;
  onTap: () => void;
}
