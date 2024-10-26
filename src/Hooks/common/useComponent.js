import { useDispatch, useSelector } from "react-redux";
import { useCommon } from "./useCommon";
import { getComponent } from "../../Components/Tabs/DashBoardComponents";
import { setIndexState, setName } from "../../redux/Reducers/currentComponentSlice";

export const useComponent = () => {
    const dispatch = useDispatch()
    const { setLoader, setConfirm } = useCommon()
    const currentComponentName = useSelector(state => state.currentSelection.name)
    const nestedComponent = useSelector(state => state.currentSelection.nestedComponent)
    const selectedIndex = useSelector(state => state.currentSelection.selectedIndex)

    const getCurrentComponent = () => getComponent()

    const setSelectedIndex = (index) => {
        if (!JSON.parse(localStorage.getItem('DataLossPrevention'))) {
            dispatch(setIndexState(index))
        }
    }


    const setCurrentComponent = (option) => {
        currentComponentName !== option && setLoader(false)
        if (!JSON.parse(localStorage.getItem('DataLossPrevention'))) {
            dispatch(setName(option))
        } else {
            const process = () => {
                localStorage.setItem('DataLossPrevention', JSON.stringify(false))
                dispatch(setName(option))
            }
            setConfirm('Are You Sure to Lose All Progress', process)
        }
    }


    return { setCurrentComponent, getCurrentComponent, currentComponentName, nestedComponent, selectedIndex, setSelectedIndex };
};
