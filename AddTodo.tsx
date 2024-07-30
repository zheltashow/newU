import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { TrackingType } from "../types";

const AddTodo = () => {
  const { dispatch } = useTodos();
  const [text, setText] = useState("");
  const [trackingType, setTrackingType] = useState<TrackingType>("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", text, trackingType });
      setText("");
    }
  };

  const handleTrackingTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTrackingType(e.target.value as TrackingType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
        required
      />
      <select value={trackingType} onChange={handleTrackingTypeChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
