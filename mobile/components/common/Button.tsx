import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const variantStyles = {
      primary: {
        backgroundColor: '#FF6B6B',
      },
      secondary: {
        backgroundColor: '#4ECDC4',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FF6B6B',
      },
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        minHeight: 48,
      },
      large: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        minHeight: 56,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(disabled && { opacity: 0.5 }),
      ...style,
    } as ViewStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    const variantStyles = {
      primary: {
        color: 'white',
      },
      secondary: {
        color: 'white',
      },
      outline: {
        color: '#FF6B6B',
      },
    };

    const sizeStyles = {
      small: {
        fontSize: 14,
      },
      medium: {
        fontSize: 16,
      },
      large: {
        fontSize: 18,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...textStyle,
    } as TextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}