import { Todo } from './model';

export enum TodoActionTypes {
    ADD_TODOS = 'todo/ADD_TODOS',
    REMOVE_TODO = 'todo/REMOVE_TODO',
    ADD_TODO = 'todo/ADD_TODO',
    LOAD_TODOS = 'todo/LOAD_TODOS',
    SET_CURRENT_TODO = 'todo/SET_CURRENT_TODO',
}

export const addTodos = (todos: Todo[]) => ({
    type: TodoActionTypes.ADD_TODOS,
    payload: todos,
});

export const removeTodo = (todo: Todo) => ({
    type: TodoActionTypes.REMOVE_TODO,
    payload: todo,
});

export const addTodo = (todo: Todo) => ({
    type: TodoActionTypes.ADD_TODO,
    payload: todo,
});

export const loadTodos = (todos: Todo[]) => ({
    type: TodoActionTypes.LOAD_TODOS,
    payload: todos,
});

export const setCurrentTodo = (todo: Todo) => ({
    type: TodoActionTypes.SET_CURRENT_TODO,
    payload: todo,
});
