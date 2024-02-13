import {
  NativeSyntheticEvent,
  SafeAreaView,
  TextInputEndEditingEventData,
} from 'react-native';
import {ExpandedTodoScreenProps} from '../types/types';
import {StyledTodoTitle} from '../components/TodoItem';
import {useContext, useEffect, useRef} from 'react';
import {TodosContext} from '../contexts/TodosContext';
import {StyledIcon, StyledText} from '../components/styled';

import {formatInput} from '../utils/textUtils';
import {TextInput} from 'react-native-gesture-handler';

import TodoBtn from '../components/TodoBtn';
import styled from 'styled-components/native';

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
    if (inputRef.current && inputRef.current.defaultProps) {
      inputRef.current.defaultProps.editable = true;
      inputRef.current.focus();
    }
  }, []);

  // without sharedTransitionTag
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#474747'}}>
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
          blurOnSubmit
          sharedTransitionTag={`todoTitle${expandedTodo.id}`}
          ref={inputRef}
          multiline
          maxLength={40}
          defaultValue={expandedTodo.title}
          onEndEditing={onEndEditingHandler}
          onTouchStart={e => e.stopPropagation()}
          editable
        />
      </StyledContainer>
    </SafeAreaView>
  );
}

const StyledContainer = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
  gap: 20px;
`;

const StyledNavContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
`;

const StyledExpandedTitle = styled(StyledTodoTitle)`
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  min-height: 100px;
  text-align-vertical: top;
`;
