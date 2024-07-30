import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { TrackingType, Todo } from "../types";

const Settings = () => {
  const { state, dispatch } = useTodos();
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [trackingType, setTrackingType] = useState<TrackingType>("daily");
  const [schedule, setSchedule] = useState<number[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(0);

  const handleTodoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const todoId = Number(e.target.value);
    const selectedTodo: Todo | undefined = state.todos.find(
      (todo) => todo.id === todoId
    );
    if (selectedTodo) {
      setSelectedTodoId(todoId);
      setTrackingType(selectedTodo.trackingType);
      setSchedule(selectedTodo.schedule);
      setWeeklyGoal(selectedTodo.weeklyGoal);
    }
  };

  const handleSave = () => {
    if (selectedTodoId !== null) {
      dispatch({
        type: "CHANGE_SETTINGS",
        id: selectedTodoId,
        newSettings: { trackingType, schedule, weeklyGoal },
      });
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <select onChange={handleTodoChange} value={selectedTodoId ?? ""}>
        <option value="" disabled>
          Select a todo
        </option>
        {state.todos.map((todo) => (
          <option key={todo.id} value={todo.id}>
            {todo.text}
          </option>
        ))}
      </select>
      {selectedTodoId !== null && (
        <>
          <div>
            <label>
              Tracking Type:
              <select
                value={trackingType}
                onChange={(e) =>
                  setTrackingType(e.target.value as TrackingType)
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
          </div>
          {trackingType === "daily" && (
            <div>
              <label>
                Schedule (days of the week):
                <input
                  type="text"
                  value={schedule.join(",")}
                  onChange={(e) =>
                    setSchedule(e.target.value.split(",").map(Number))
                  }
                  placeholder="e.g., 1,3,5 for Mon, Wed, Fri"
                />
              </label>
            </div>
          )}
          {trackingType === "weekly" && (
            <div>
              <label>
                Weekly Goal:
                <input
                  type="number"
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                  placeholder="e.g., 3"
                />
              </label>
            </div>
          )}
          <button onClick={handleSave}>Save Settings</button>
        </>
      )}
    </div>
  );
};

export default Settings;
