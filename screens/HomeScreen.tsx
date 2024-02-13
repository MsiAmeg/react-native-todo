import React, {useContext, useEffect} from 'react';

import {TabsParamList, TodoT} from '../types/types';
import {ActivityIndicator, Alert, SafeAreaView, View} from 'react-native';
import {TodosContext} from '../contexts/TodosContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Form from '../components/Form';
import TodoList from '../components/TodoList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabsNavigator from '../components/TabsNavigator';

export default function HomeScreen() {
  const {todos, setTodos, handleCreateTodo} = useContext(TodosContext);

  const storeTodos = async (value: TodoT[]) => {
    AsyncStorage.setItem('Todos', JSON.stringify(value)).catch(err => {
      Alert.alert('Ошибка', err.message);
    });
  };

  const getLocalTodos = async () => {
    AsyncStorage.getItem('Todos')
      .then(jsonValue => {
        if (jsonValue) {
          setTodos(JSON.parse(jsonValue));
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
    if (todos.length >= 1) {
      storeTodos(todos);
    }
  }, [todos]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#474747'}}>
      <Header />
      <Form createTodo={handleCreateTodo} />
      <TabsNavigator />
    </SafeAreaView>
  );
}
