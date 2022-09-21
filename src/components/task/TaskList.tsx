import {
  Checkbox,
  IconButton,
  styled,
  Typography,
  Unstable_Grid2 as Grid
} from "@mui/material";
import React from "react";
import {TaskProps} from "../../global/types";
import {Delete} from "@mui/icons-material";
import { deleteTask, fetchTasks, setHasSelectedTask} from "../../features/task/taskSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {listStyle} from "./style";

export const TaskList = () => {
  const dispatch = useAppDispatch()
  const isRefreshing = useAppSelector((state) => state.tasks.isRefreshing)
  const isDeleting = useAppSelector((state) => state.tasks.isDeleting)
  const tasks = useAppSelector((state) => state.tasks)

  React.useEffect(() => {
    dispatch(fetchTasks())
  }, [isRefreshing, isDeleting])

  return (
    <React.Fragment>
      <Grid>
        {tasks.all.map((task: TaskProps) => {
          return (
            <Grid key={task.id} sx={listStyle}>
              <Checkbox //onChange={(): void => { dispatch(addToMassDeletion(task.id))}}
                onClick={(checkbox: any) => {
                  dispatch(setHasSelectedTask({
                    status: checkbox.target.checked, taskId: task.id
                  }))
                }}
              />
              <Typography>
                {task.description}
              </Typography>
              <IconButton aria-label="deletar"
                          onClick={() => {dispatch(deleteTask({id: task.id}))}}
              >
                <Delete sx={{color: 'red'}}/>
              </IconButton>
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )
}