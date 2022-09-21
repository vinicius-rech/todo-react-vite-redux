import {
  Container,
  SpeedDial,
  Unstable_Grid2 as Grid
} from "@mui/material";
import React from "react"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Input} from "./Input";
import {colors} from "../../global/colors";
import {TaskList} from "./TaskList";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {deleteMany} from "../../features/task/taskSlice";


export const Task = () => {
  const hasSelectedTask = useAppSelector((state) => state.tasks.hasSelectedTask)
  const tasksToBeDeleted = useAppSelector((state) => state.tasks.toBeDeleted)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    console.log('has? ', hasSelectedTask)
  }, [hasSelectedTask])

  return (
    <React.Fragment>
      <Container maxWidth='lg'>
        <Grid container direction='column' rowGap={1}>
          <Input/>
          <TaskList/>
        </Grid>

      </Container>
      {tasksToBeDeleted.length > 0 && (
        <SpeedDial
          ariaLabel="delete selected"
          color={colors.green}
          sx={{position: 'absolute', bottom: 16, right: 16}}
          icon={<DeleteForeverIcon/>}
          onClick={() => dispatch(deleteMany(tasksToBeDeleted))}
        />
      )}

    </React.Fragment>
  )
}