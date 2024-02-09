import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyledTodoBtn} from './styled';
import {PropsWithChildren} from 'react';

type TodoBtnProps = PropsWithChildren & {
  handlePress: () => void;
  accessibilityLabel: string;
};

export default function TodoBtn({
  children,
  handlePress,
  accessibilityLabel,
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
      $isDisabled={false}
      style={animatedStyles}
      onPress={handlePress}
      onPressIn={() => handleScale(0.7)}
      onPressOut={() => handleScale(1)}
      accessibilityLabel={accessibilityLabel}>
      {children}
    </StyledTodoBtn>
  );
}
