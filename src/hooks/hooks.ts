import {useDispatch, useSelector} from "react-redux";
import type {TypedUseSelectorHook} from "react-redux"
import type {SourceState, AppDispatch} from "../store";

export const useAppSelector: TypedUseSelectorHook<SourceState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
