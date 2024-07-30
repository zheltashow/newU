import React from "react";
import { useTodos } from "../context/TodoContext";

const DateChanger = () => {
  const { state, dispatch } = useTodos();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("New Date:", e.target.value);
    dispatch({ type: "CHANGE_DATE", date: e.target.value });
  };

  return (
    <div>
      <label>
        Current Date:
        <input
          type="date"
          value={state.currentDate}
          onChange={handleDateChange}
        />
      </label>
    </div>
  );
};

export default DateChanger;
