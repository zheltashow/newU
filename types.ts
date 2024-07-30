export type TrackingType = "daily" | "weekly";

export interface Todo {
  id: number;
  text: string;
  completedDates: string[];
  trackingType: TrackingType;
  schedule: number[];
  weeklyGoal: number;
}

export interface TodoState {
  todos: Todo[];
  currentDate: string;
}

export type Action =
  | { type: "ADD_TODO"; text: string; trackingType: TrackingType }
  | { type: "COMPLETE_TODO"; id: number }
  | { type: "CHANGE_SETTINGS"; id: number; newSettings: Partial<Todo> }
  | { type: "SET_CURRENT_DATE"; date: string }
  | { type: "BACKTRACK_TODO"; id: number; date: string }
  | { type: "CHANGE_DATE"; date: string };
