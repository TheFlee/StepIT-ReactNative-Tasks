import type { ReactNode } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

type FadeInViewProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInView({ children, delay = 0, className }: FadeInViewProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(450).springify().damping(20).stiffness(120)}
      className={className}>
      {children}
    </Animated.View>
  );
}
