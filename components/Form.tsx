import {StyledBtn, StyledInput, StyledText} from './styled';
import {useEffect, useState} from 'react';
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {formatInput} from '../utils/textUtils';

type FormProps = {
  createTodo: (title: string) => void;
};

export default function Form({createTodo}: FormProps) {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const scale = useSharedValue(1);

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

  const onInputTextChange = (text: string) => {
    setInput(text);
  };

  useEffect(() => {
    setIsValid(/[^ \n]+/g.test(input));
  }, [input]);

  return (
    <Animated.View
      entering={FadeInUp.delay(150)}
      style={{
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'white',
      }}>
      <StyledInput
        maxLength={40}
        onChangeText={onInputTextChange}
        value={input}
        placeholderTextColor={'grey'}
        placeholder="Insert title"
      />
      <StyledBtn
        $isDisabled={!isValid}
        style={animatedStyles}
        disabled={!isValid}
        onPressIn={() => (scale.value = 0.7)}
        onPressOut={() => (scale.value = 1)}
        onPress={() => {
          createTodo(formatInput(input));
          setInput('');
        }}>
        <StyledText $textColor="white">+</StyledText>
      </StyledBtn>
    </Animated.View>
  );
}
