/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import * as db from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: db.enrollments as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const { user, course } = payload;
      const exists = state.enrollments.some(
        (e: any) => e.user === user && e.course === course
      );
      if (exists) return;

      state.enrollments.push({
        _id: uuidv4(),
        user,
        course,
      });
    },
    unenroll: (state, { payload }) => {
      const { user, course } = payload;
      state.enrollments = state.enrollments.filter(
        (e: any)=> !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;