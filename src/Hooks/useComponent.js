import { useDispatch, useSelector } from "react-redux";
import { setDataLossPreventionState, setIndexState, setName } from "../redux/Reducers/currentComponentSlice";
import { getComponent } from "../Components/Tabs/DashBoardComponents";
import { useInfo } from "./useInfo";



export const useComponent = () => {
    const dispatch = useDispatch()
    const { setLoader, setConfirm , setAlert } = useInfo()
    const currentComponentName = useSelector(state => state.currentSelection.name)
    const nestedComponent = useSelector(state => state.currentSelection.nestedComponent)
    const dataLossPrevention = useSelector(state => state.currentSelection.dataLossPrevention)
    const selectedIndex = useSelector(state => state.currentSelection.selectedIndex)

    const getCurrentComponent = () => getComponent()

    const setSelectedIndex = (index) => {
        if (!dataLossPrevention) {
            dispatch(setIndexState(index))
        }
    }

    const setPreventLoss = (val) => dispatch(setDataLossPreventionState(val))

    const setCurrentComponent = (option) => {
        currentComponentName !== option && setLoader(false)
        if (!dataLossPrevention) {
            dispatch(setName(option))
        } else {
            // const process = () => setPreventLoss(false)
            // setConfirm('Are You Sure to Lose All Progress', process)
            setAlert('Save Your Changes', 'info')
        }
    }


    return { setCurrentComponent, getCurrentComponent, currentComponentName, nestedComponent, selectedIndex, setSelectedIndex, setPreventLoss ,dataLossPrevention};
};
