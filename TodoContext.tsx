import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Todo, TodoState, Action } from "../types";

// Initial State
const initialState: TodoState = {
  todos: [],
  currentDate: new Date().toISOString().split("T")[0],
};

// Reducer function to handle actions
const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        id: Date.now(),
        text: action.text,
        completedDates: [],
        trackingType: action.trackingType,
        schedule: [],
        weeklyGoal: 0,
      };
      return { ...state, todos: [...state.todos, newTodo] };

    case "COMPLETE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                completedDates: [...todo.completedDates, state.currentDate],
              }
            : todo
        ),
      };

    case "CHANGE_SETTINGS":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, ...action.newSettings } : todo
        ),
      };

    case "SET_CURRENT_DATE":
      return { ...state, currentDate: action.date };

    case "CHANGE_DATE":
      console.log("Reducer - CHANGE_DATE:", action.date); // Add this line
      return {
        ...state,
        currentDate: action.date,
      };

    case "BACKTRACK_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completedDates: [...todo.completedDates, action.date] }
            : todo
        ),
      };

    default:
      return state;
  }
};

// Context to hold the state and dispatch function
const TodoContext = createContext<
  { state: TodoState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Provider component to wrap the application and provide context
interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};

export { TodoProvider, useTodos };
