import { useDispatch, useSelector } from "react-redux";
import { userData } from "../redux/Reducers/userSlice";
import { setCompanyLogo } from "../redux/Reducers/Profile";

export const useCustoms = () => {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.user); 
    const logo = useSelector(state => state.profile?.companyLogo || null); 

    const updateUser = (userDetails) => {
        dispatch(userData(userDetails));
    };

    const setLogo = (url) => {
        dispatch(setCompanyLogo(url));
    };

    return { updateUser, getUser, setLogo, logo };
};
