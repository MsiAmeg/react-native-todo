import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type {AnimatedProps} from 'react-native-reanimated';
import {StyledTodoBtn} from './styled';
import {PropsWithChildren} from 'react';

type TodoBtnProps = AnimatedProps<PropsWithChildren> & {
  disabled?: boolean;
  handlePress: () => void;
  accessibilityLabel: string;
};

export default function TodoBtn({
  disabled = false,
  children,
  handlePress,
  accessibilityLabel,
  ...rest
}: TodoBtnProps) {
  const scale = useSharedValue(1);

  const handleScale = (num: number) => {
    scale.value = num;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(scale.value, {
          duration: 400,
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
  }));

  return (
    <StyledTodoBtn
      {...rest}
      $isDisabled={disabled}
      disabled={disabled}
      style={animatedStyles}
      onPress={handlePress}
      onPressIn={() => handleScale(0.7)}
      onPressOut={() => handleScale(1)}
      accessibilityLabel={accessibilityLabel}>
      {children}
    </StyledTodoBtn>
  );
}
