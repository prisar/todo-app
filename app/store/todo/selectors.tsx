
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { Todo } from './model';

export const selectTodos = (): Todo[] =>
    useSelector((state: RootState) => state.todo.todos);

export const selectCurrentTodo = (): Todo | undefined =>
    useSelector((state: RootState) => state.todo.currentTodo);