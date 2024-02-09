import React, {useEffect, useRef, useState} from 'react';

import {HomeScreenProps, TodoT} from '../types/types';
import {Alert, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import Form from '../components/Form';

export default function HomeScreen({navigation}: HomeScreenProps) {
  const firstRender = useRef(true);
  const [todos, setTodos] = useState<TodoT[]>([]);

  const handleDeleteTodo = (id: number) => {
    setTodos(prevState => prevState.filter(el => el.id !== id));
  };

  const handleDoneTodo = (item: TodoT) => {
    setTodos(prevState =>
      prevState.map(el =>
        el.id === item.id ? {...el, isDone: !el.isDone} : el,
      ),
    );
  };

  const handleEditTodo = (item: TodoT) => {
    setTodos(prevState =>
      prevState.map(el =>
        el.id === item.id ? {...el, title: item.title} : el,
      ),
    );
  };

  const handleCreateTodo = (title: string) => {
    const newTodo = {id: Date.now(), title, isDone: false};
    setTodos(todos => [...todos, newTodo]);
  };

  const handleExpandTodo = (todo: TodoT) => {
    navigation.navigate('ExpandedTodo', {todo});
  };

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
          firstRender.current = false;
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
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 20, gap: 20}}>
        <Animated.View style={{gap: 10, minWidth: 90, height: '100%'}}>
          {todos.map((el, i) => (
            <TodoItem
              key={el.id}
              item={el}
              title={el.title}
              isDone={el.isDone}
              handleEdit={handleEditTodo}
              handleDelete={() => {
                handleDeleteTodo(el.id);
              }}
              handleDone={() => {
                handleDoneTodo(el);
              }}
              handleExpand={() => {
                handleExpandTodo(el);
              }}
              delay={firstRender.current ? i * 80 : 0}
            />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
