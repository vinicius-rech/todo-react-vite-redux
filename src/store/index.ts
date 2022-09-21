import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {taskSlice} from "../features/task/taskSlice";

const reducer = {
  tasks: taskSlice.reducer
}

export const store = configureStore(
  {reducer},
  )

export type SourceState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
