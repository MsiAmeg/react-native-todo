import React, {useContext, useEffect} from 'react';

import {TodoT} from '../types/types';
import {Alert, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Form from '../components/Form';
import {TodosContext} from '../contexts/TodosContext';
import TodoList from '../components/TodoList';

export default function HomeScreen() {
  const todosCtx = useContext(TodosContext);

  const storeTodos = async (value: TodoT[]) => {
    AsyncStorage.setItem('Todos', JSON.stringify(value)).catch(err => {
      Alert.alert('Ошибка', err.message);
    });
  };

  const getLocalTodos = async () => {
    AsyncStorage.getItem('Todos')
      .then(jsonValue => {
        if (jsonValue) {
          todosCtx.setTodos(JSON.parse(jsonValue));
        }
      })
      .catch(err => {
        Alert.alert('Ошибка', err.message);
      });
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    if (todosCtx.todos.length >= 1) {
      storeTodos(todosCtx.todos);
    }
  }, [todosCtx.todos]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#474747'}}>
      <Header />
      <Form createTodo={todosCtx.handleCreateTodo} />
      <TodoList />
    </SafeAreaView>
  );
}
