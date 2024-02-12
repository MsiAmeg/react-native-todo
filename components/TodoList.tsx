import {useContext} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TodosContext} from '../contexts/TodosContext';
import {FlatList} from 'react-native';

import TodoItem from './TodoItem';

export default function TodoList() {
  const {todos, handleDeleteTodo, handleDoneTodo, handleEditTodo} =
    useContext(TodosContext);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleExpandTodo = (todoId: number) => {
    navigation.navigate('ExpandedTodo', {todoId});
  };

  return (
    <FlatList
      style={{paddingHorizontal: 20, gap: 20}}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
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
    />
  );
}
