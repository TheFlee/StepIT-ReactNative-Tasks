import { Text, TextProps, View, ViewProps } from 'react-native';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { COLORS } from '@/constants/colors';

interface StyledViewProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
}

interface StyledTextProps extends TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const StyledView = ({ children, style, className, ...props }: StyledViewProps) => {
  const [darkmode] = useAsyncStorage<boolean>('darkmode', false);
  return (
    <View
      className={className}
      style={[{ flex: 1, backgroundColor: darkmode ? COLORS.darkBg : COLORS.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export const StyledText = ({ children, style, className, ...props }: StyledTextProps) => {
  const [darkmode] = useAsyncStorage<boolean>('darkmode', false);
  return (
    <Text
      className={className}
      style={[{ color: darkmode ? COLORS.white : COLORS.textPrimary }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
