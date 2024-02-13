import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TodosContext} from '../contexts/TodosContext';

import Animated, {CurvedTransition} from 'react-native-reanimated';
import {StackParamList, TodoT} from '../types/types';

import TodoItem from './TodoItem';
import {Text, View} from 'react-native';
import {StyledText} from './styled';

type TodoListProps = {
  todos: TodoT[];
};

const EmptyList = (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <StyledText $textColor="white">There is nothing</StyledText>
  </View>
);

export default function TodoList({todos}: TodoListProps) {
  const {handleDeleteTodo, handleDoneTodo, handleEditTodo} =
    useContext(TodosContext);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const handleExpandTodo = (todoId: number) => {
    navigation.navigate('ExpandedTodo', {todoId});
  };

  return (
    <Animated.FlatList
      layout={CurvedTransition}
      style={{paddingHorizontal: 20, gap: 20}}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          title={item.title}
          isDone={item.isDone}
          handleEdit={handleEditTodo}
          handleDelete={() => {
            handleDeleteTodo(item.id);
          }}
          handleDone={() => {
            handleDoneTodo(item);
          }}
          handleExpand={() => {
            handleExpandTodo(item.id);
          }}
        />
      )}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={EmptyList}
    />
  );
}
