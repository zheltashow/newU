import { Todo } from "../types";
import { useTodos } from "../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { dispatch, state } = useTodos();

  const handleComplete = () => {
    dispatch({ type: "COMPLETE_TODO", id: todo.id });
  };

  const isCompletedToday = todo.completedDates.includes(state.currentDate);

  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={handleComplete} disabled={isCompletedToday}>
        {isCompletedToday ? "Completed" : "Complete"}
      </button>
    </div>
  );
};

export default TodoItem;
