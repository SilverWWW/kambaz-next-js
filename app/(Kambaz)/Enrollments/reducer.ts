import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload: { userId, courseId } }) => {
      const existingEnrollment = state.enrollments.find(
        (enrollment: any) => enrollment.user === userId && enrollment.course === courseId
      );
      if (!existingEnrollment) {
        state.enrollments = [...state.enrollments, { user: userId, course: courseId }] as any;
      }
    },
    unenrollUser: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
