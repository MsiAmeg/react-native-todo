import {
  NativeSyntheticEvent,
  Pressable,
  TextInputEndEditingEventData,
} from 'react-native';

import {StyledIcon} from './styled';
import {TodoT} from '../types/types';

import Animated, {
  FadeInUp,
  FadeOut,
  CurvedTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import styled from 'styled-components/native';
import TodoBtn from './TodoBtn';

type TodoItemProps = {
  item: TodoT;
  title: string;
  isDone: boolean;
  delay: number;
  handleEdit: (item: TodoT) => void;
  handleExpand: () => void;
  handleDelete: () => void;
  handleDone: () => void;
};

export default function TodoItem({
  item,
  title,
  isDone,
  delay,
  handleEdit,
  handleExpand,
  handleDelete,
  handleDone,
}: TodoItemProps): React.JSX.Element {
  const borderColor = useSharedValue(isDone ? 1 : 0);

  const animatedStyles = useAnimatedStyle(() => ({
    borderBottomColor: interpolateColor(
      borderColor.value,
      [0, 1],
      ['#EFBA36', '#44E417'],
    ),
  }));

  const onEndEditingHandler = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (/[^ ]+/g.test(e.nativeEvent.text) && e.nativeEvent.text !== title) {
      handleEdit({...item, title: e.nativeEvent.text});
    } else if (e.nativeEvent.text === '') {
      handleDelete();
    }
  };

  return (
    <StyledContainer
      style={animatedStyles}
      $isDone={isDone}
      entering={FadeInUp.delay(delay)}
      exiting={FadeOut}
      layout={CurvedTransition}
      onPress={handleExpand}>
      <StyledTodoTitle
        multiline
        maxLength={40}
        defaultValue={title}
        onEndEditing={onEndEditingHandler}
      />
      <StyledOptionsWrapper>
        {!isDone && (
          <TodoBtn
            handlePress={() => {
              handleDone();
              borderColor.value = withTiming(1);
            }}
            accessibilityLabel="Mark Todo done">
            <StyledIcon
              resizeMode="center"
              source={require('../assets/doneIcon.png')}
            />
          </TodoBtn>
        )}
        <TodoBtn handlePress={handleDelete} accessibilityLabel="delete Todo">
          <StyledIcon
            resizeMode="center"
            source={require('../assets/deleteIcon.png')}
          />
        </TodoBtn>
      </StyledOptionsWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled(Animated.createAnimatedComponent(Pressable))<{
  $isDone: boolean;
}>`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  border-bottom-width: 2px;
`;

const StyledTodoTitle = styled.TextInput`
  flex: 1;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const StyledOptionsWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
