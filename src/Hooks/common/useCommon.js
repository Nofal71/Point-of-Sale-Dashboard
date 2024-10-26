import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/Reducers/themeSlice';
import { setLoaderAction } from '../../redux/Reducers/loaderSlice';
import { setAlertAction } from '../../redux/Reducers/AlertSlice';
import { setConfirmState, setOpen } from '../../redux/Reducers/confirmSlice';

export const useCommon = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const getConfirm = useSelector(state => state.confirm)

  const setGlobalTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const setLoader = (value) => {
    dispatch(setLoaderAction(value));
  };

  const setAlert = (msg, type) => {
    dispatch(setAlertAction({ msg, type }));
  };

  const setOpenState = (val) => dispatch(setOpen(val))

  const setConfirm = (message, process) => {
    setOpenState(true)
    dispatch(setConfirmState({ message: message, process: process }))
  }


  return { setLoader, setAlert, setGlobalTheme, theme, setConfirm, getConfirm, setOpenState };
};