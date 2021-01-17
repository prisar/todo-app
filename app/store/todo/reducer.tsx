import {TodoActionTypes} from './actions';
import {Todo} from './model';
import {sortBy} from 'lodash';
export interface TodoState {
  todos: Todo[];
  currentTodo?: Todo;
}

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = (state = initialState, action: any): TodoState => {
  const payload = action.payload;

  switch (action.type) {
    case TodoActionTypes.ADD_TODOS:
      return {...state, todos: [...state.todos, ...payload]};

    case TodoActionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
      };

    case TodoActionTypes.ADD_TODO:
      const newTodoList = sortBy([...state.todos, payload], 'dateDue');

      // return {...state, todos: [...state.todos, payload]};
      return {...state, todos: newTodoList};

    case TodoActionTypes.LOAD_TODOS:
      return {...state, todos: payload};

    case TodoActionTypes.SET_CURRENT_TODO:
      return {...state, currentTodo: payload};

    default:
      return state;
  }
};
