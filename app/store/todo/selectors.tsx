import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {Todo} from './model';

export const selectTodos = (): Todo[] =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSelector((state: RootState) => state.todo.todos);

export const selectCurrentTodo = (): Todo | undefined =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSelector((state: RootState) => state.todo.currentTodo);
