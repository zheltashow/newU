import { TodoProvider } from "./context/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Settings from "./components/Settings";
import DateChanger from "./components/DateChanger";
import "./App.css";

const App = () => {
  return (
    <TodoProvider>
      <div className="App">
        <div className="container">
          <h1>Do More.</h1>
          <DateChanger />
          <AddTodo />
          <Settings />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
