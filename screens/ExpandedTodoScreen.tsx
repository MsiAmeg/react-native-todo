import {NativeSyntheticEvent, TextInputEndEditingEventData} from 'react-native';
import {ExpandedTodoScreenProps} from '../types/types';
import {StyledTodoTitle} from '../components/TodoItem';
import {useContext, useEffect, useRef} from 'react';
import {TodosContext} from '../contexts/TodosContext';
import {StyledIcon, StyledText} from '../components/styled';

import {formatInput} from '../utils/textUtils';

import TodoBtn from '../components/TodoBtn';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-gesture-handler';

export default function ExpandedTodoScreen({
  navigation,
  route,
}: ExpandedTodoScreenProps) {
  const {todoId} = route.params;

  const {todos, handleEditTodo, handleDeleteTodo} = useContext(TodosContext);

  const inputRef = useRef<TextInput>(null);

  const expandedTodo = todos.find(el => el.id === todoId);
  if (expandedTodo === undefined) throw new Error('selected todo not found');

  const onEndEditingHandler = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const text = e.nativeEvent.text;
    if (/[^ \n]+/g.test(text) && text !== expandedTodo.title) {
      const formatedText = formatInput(e.nativeEvent.text);
      handleEditTodo({
        ...expandedTodo,
        title: formatedText,
      });
      e.nativeEvent.text = formatedText;
    } else if (text === '') {
      navigation.navigate('Home');
      handleDeleteTodo(expandedTodo.id);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <StyledContainer>
      <StyledNavContainer>
        <TodoBtn
          handlePress={() => navigation.navigate('Home')}
          accessibilityLabel="Go back button">
          <StyledIcon
            resizeMode="center"
            source={require('../assets/goBackIcon.png')}
          />
        </TodoBtn>
        <StyledText $textColor="white">Edit Title</StyledText>
      </StyledNavContainer>
      <StyledExpandedTitle
        ref={inputRef}
        multiline
        maxLength={40}
        defaultValue={expandedTodo.title}
        onEndEditing={onEndEditingHandler}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.ScrollView`
  flex: 1;
  background-color: #474747;
  padding: 10px 20px 10px 20px;
`;

const StyledNavContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px 0 10px 0;
  gap: 20px;
`;

const StyledExpandedTitle = styled(StyledTodoTitle)`
  margin-bottom: 30px;
  padding: 5px 10px 0 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  min-height: 100px;
  text-align-vertical: top;
`;
