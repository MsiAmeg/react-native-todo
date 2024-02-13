import {Pressable, TextInput} from 'react-native';

import {StyledIcon} from './styled';
import {TodoT} from '../types/types';

import DoneIcon from '../assets/doneIcon.png';
import DeleteIcon from '../assets/deleteIcon.png';

import Animated, {
  FadeInUp,
  CurvedTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  FadeOutUp,
  runOnJS,
} from 'react-native-reanimated';

import styled from 'styled-components/native';
import TodoBtn from './TodoBtn';

export type TodoItemProps = {
  id: number;
  title: string;
  isDone: boolean;
  handleEdit: (item: TodoT) => void;
  handleExpand: () => void;
  handleDelete: () => void;
  handleDone: () => void;
};

export default function TodoItem({
  id,
  title,
  isDone,
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

  return (
    <StyledContainer
      style={animatedStyles}
      $isDone={isDone}
      entering={FadeInUp}
      exiting={FadeOutUp}
      layout={CurvedTransition}
      onPress={handleExpand}>
      <StyledTodoTitle
        sharedTransitionTag={`todoTitle${id}`}
        multiline
        maxLength={40}
        defaultValue={title}
        editable={false}
      />
      <StyledOptionsWrapper onStartShouldSetResponder={e => true}>
        {!isDone && (
          <TodoBtn
            handlePress={() => {
              borderColor.value = withTiming(1);
              handleDone();
            }}
            accessibilityLabel="Mark Todo done">
            <StyledIcon resizeMode="center" source={DoneIcon} />
          </TodoBtn>
        )}
        <TodoBtn handlePress={handleDelete} accessibilityLabel="delete Todo">
          <StyledIcon resizeMode="center" source={DeleteIcon} />
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

export const StyledTodoTitle = styled(
  Animated.createAnimatedComponent(TextInput),
)`
  flex: 1;
  font-size: 24px;
  font-weight: 600;
  color: white;
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  text-align-vertical: top;
`;

const StyledOptionsWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
