import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/Reducers/userSlice";

export const useCustoms = () => {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.user)

    const updateUser = (userDetails) => {
        dispatch(userData(userDetails))
    }
 

    return { updateUser , getUser }; 
};
