import type { ComponentProps, ReactNode } from 'react';
import { Pressable, type PressableStateCallbackType, type StyleProp, type ViewStyle } from 'react-native';

type ScalePressableProps = ComponentProps<typeof Pressable> & {
  children: ReactNode;
};

function pressStyle({ pressed }: PressableStateCallbackType): ViewStyle {
  return {
    opacity: pressed ? 0.92 : 1,
    transform: [{ scale: pressed ? 0.97 : 1 }],
  };
}

export function ScalePressable({ children, style, ...props }: ScalePressableProps) {
  return (
    <Pressable
      {...props}
      style={(state) => {
        const base = typeof style === 'function' ? style(state) : style;
        return [pressStyle(state), base] as StyleProp<ViewStyle>;
      }}>
      {children}
    </Pressable>
  );
}
