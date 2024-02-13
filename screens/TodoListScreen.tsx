import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {TabsParamList, TodoT} from '../types/types';
import {useContext} from 'react';
import {TodosContext} from '../contexts/TodosContext';
import TodoList from '../components/TodoList';

export default function TodoListScreen({
  route,
}: MaterialTopTabScreenProps<TabsParamList>) {
  const {todos} = useContext(TodosContext);
  const filteredTodos = todosFiltered();

  console.log(route.params.filter, filteredTodos);

  function todosFiltered(): TodoT[] {
    const mode = route.params.filter;
    if (mode === 'finished') {
      return todos.filter(el => el.isDone === true);
    } else if (mode === 'unfinished') {
      return todos.filter(el => el.isDone === false);
    }
    return todos;
  }

  return <TodoList todos={filteredTodos} />;
}
