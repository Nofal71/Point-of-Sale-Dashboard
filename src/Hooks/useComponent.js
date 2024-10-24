import { useDispatch, useSelector } from "react-redux";
import { setName } from "../redux/Reducers/currentComponentSlice";
import { getComponent } from "../Components/Tabs/DashBoardComponents";
import { useInfo } from "./useInfo";



export const useComponent = () => {
    const dispatch = useDispatch()
    const { setLoader } = useInfo()
    const currentComponentName = useSelector(state => state.currentSelection.name)
    const nestedComponent = useSelector(state => state.currentSelection.nestedComponent)

    const getCurrentComponent = () => getComponent()

    const setCurrentComponent = (option) => {
        dispatch(setName(option))
        currentComponentName !== option && setLoader(false)
    }

    return { setCurrentComponent, getCurrentComponent, currentComponentName, nestedComponent };
};
