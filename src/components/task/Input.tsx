import {TextField} from "@mui/material";
import React from "react";
import {addTask} from "../../features/task/taskSlice"
import {useAppDispatch} from "../../hooks/hooks";

export const Input = () => {
  const dispatch = useAppDispatch()
  const text = React.useRef<any>(null)
  const keys = {enter: 'Enter', numpadEnter: 'NumpadEnter'}

  // @todo melhorar o retorno
  const isEnterKeyPressed = (key: React.KeyboardEvent<HTMLInputElement>) => {
    let isEnterKey: boolean = key.code === keys.numpadEnter || key.code === keys.enter
    return isEnterKey
  }

  const handleKeyDown = (keyPressed: React.KeyboardEvent<HTMLInputElement>) => {
    isEnterKeyPressed(keyPressed)
    && dispatch(addTask({description: String(text.current.value)}))
      .finally(() => text.current.value = '')
  }

  return (
    <TextField fullWidth={true}
               sx={{marginTop: 2}}
               variant="outlined"
               id="outlined-basic"
               label="Descreva sua tarefa e presione: enter"
               inputRef={text}
               onKeyDown={async (key: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(key)}
    />
  )
}