import { useDispatch, useSelector } from 'react-redux';
import { setLoaderAction } from '../redux/Reducers/loaderSlice';
import { setAlertAction } from '../redux/Reducers/AlertSlice';
import { setTheme } from '../redux/Reducers/themeSlice';

export const useInfo = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const setGlobalTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const setLoader = (value) => {
    dispatch(setLoaderAction(value));
  };

  const setAlert = (msg, type) => {
    dispatch(setAlertAction({ msg, type }));
  };

  return { setLoader, setAlert, setGlobalTheme, theme };
};
