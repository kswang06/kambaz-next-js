/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../database";

const initialState: any = {
  assignments: (db as any).assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const payload = action.payload;
      const newAssignment = {
        ...payload,
        _id: payload._id || new Date().getTime().toString(),
      };
      state.assignments = [newAssignment, ...state.assignments];
    },
    deleteAssignment: (state, action) => {
      const assignmentId = action.payload;
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, action) => {
      const assignment = action.payload;
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;