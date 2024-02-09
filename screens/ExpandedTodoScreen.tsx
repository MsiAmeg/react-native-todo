import {StyledText} from '../components/styled';
import {ExpandedTodoScreenProps} from '../types/types';

export default function ExpandedTodoScreen({route}: ExpandedTodoScreenProps) {
  const {todo} = route.params;

  return <StyledText $textColor="white">{todo.title}</StyledText>;
}
