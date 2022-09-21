import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {API} from "../../services/api.service";
import {TaskProps} from "../../global/types";
import {SourceState} from "../../store";
import {AxiosResponse} from "axios";

const API_BASE_URL = 'https://api-nest-production.up.railway.app'
const name = 'task'

export interface TaskInitialState {
  isLoading: boolean
  isDeleting: boolean
  isRefreshing: boolean
  hasSelectedTask: boolean
  all: TaskProps[]
  toBeDeleted: []
  error: string
}

const initialState: TaskInitialState = {
  isLoading: false,
  isDeleting: false,
  isRefreshing: false,
  hasSelectedTask: false,
  all: [],
  toBeDeleted: [],
  error: ''
}

export const fetchTasks = createAsyncThunk(
  'task/list',
  async () => {
    return await API.get<TaskProps[]>(String(`${API_BASE_URL}/task/all`))
      .then((response: AxiosResponse): TaskProps[] => {
        console.log("tarefas atualizadas: ", response)
        return response.data
      })
  })

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (task: TaskProps) => {
    return await API.delete(`${API_BASE_URL}/task/delete/${task.id}`)
  }
)

export const addTask = createAsyncThunk(
  'task/new',
  async (task: TaskProps) => {
    return await API.post(`${API_BASE_URL}/task/new`, task)
  }
)

export const deleteMany = createAsyncThunk(
  'task/delete/many',
  async (tasks: []) => {
    const bodyBuild = tasks.map((task) => {
      return {id: task}
    })

    await API.post(`${API_BASE_URL}/task/mass-delete`, bodyBuild)
  }
)

export const taskSlice = createSlice({
  name,
  initialState,
  reducers: {
    addToMassDeletion: (state, action) => {
      state.toBeDeleted.push(action.payload)
    },
    setHasSelectedTask: (state, action) => {
      !action.payload.status
        ?
        state.toBeDeleted = state.toBeDeleted.filter((item: number) => item !== action.payload.taskId)
        :
        state.toBeDeleted.push(action.payload.taskId)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled,
        (state, action: PayloadAction<TaskProps[]>) => {
          state.isLoading = false
          state.isRefreshing = false
          state.all = action.payload
          state.error = ''
        })
      .addCase(fetchTasks.rejected,
        (state, action) => {
          state.isLoading = true
          state.all = []
          state.error = String(action.error.message) || "Ocorreu um erro"
        })
      .addCase(addTask.fulfilled,
        (state, action) => {
          state.isRefreshing = true
        }
      )
      .addCase(deleteTask.fulfilled,
        (state, action) => {
          state.isRefreshing = true
        }
      )
      .addCase(deleteMany.fulfilled,
        (state, action) => {
          state.isDeleting = true
          state.toBeDeleted = []
        }
      )
  }
})

export const {setHasSelectedTask} = taskSlice.actions
export const selectTask = (state: SourceState) => state.tasks
export default taskSlice.reducer