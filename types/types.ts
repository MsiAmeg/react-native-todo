import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TodoT = {
  id: number;
  title: string;
  isDone: boolean;
};

export type StackParamList = {
  Home: undefined;
  ExpandedTodo: {todo: TodoT};
};

export type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type ExpandedTodoScreenProps = NativeStackScreenProps<
  StackParamList,
  'ExpandedTodo'
>;
