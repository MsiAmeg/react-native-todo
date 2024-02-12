import {PropsWithChildren, createContext, useState} from 'react';
import {TodoT} from '../types/types';

const todosValues = () => {
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

  return {
    todos,
    setTodos,
    handleDeleteTodo,
    handleDoneTodo,
    handleEditTodo,
    handleCreateTodo,
  };
};

export const TodosContext = createContext<ReturnType<typeof todosValues>>(
  {} as ReturnType<typeof todosValues>,
);

export const TodosProvider = ({children}: PropsWithChildren) => {
  return (
    <TodosContext.Provider value={todosValues()}>
      {children}
    </TodosContext.Provider>
  );
};
