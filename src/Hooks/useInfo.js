import { useDispatch } from 'react-redux';
import { setLoaderAction } from '../redux/Reducers/loaderSlice';
import { setAlertAction } from '../redux/Reducers/AlertSlice';

export const useInfo = () => {
  const dispatch = useDispatch();

  const setLoader = (value) => {
    dispatch(setLoaderAction(value));
  };

  const setAlert = (msg, type) => {
    dispatch(setAlertAction({ msg: msg, type: type }))
  }
  return { setLoader, setAlert };
};
