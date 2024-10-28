import { useDispatch, useSelector } from 'react-redux';
import { setAlertAction, setConfirmState, setLoaderAction, setOpen } from '../../redux/Reducers/feedbackSlice';
import { setTheme } from '../../redux/Reducers/commonSlice';

export const useCommon = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.common.theme);
  const getConfirm = useSelector(state => state.feedback.confirm)

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
