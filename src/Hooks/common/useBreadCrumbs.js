import { useDispatch, useSelector } from "react-redux"
import { setBreadcrumb, updateBreadcrumbs } from "../../redux/Reducers/commonSlice"

export const useBreadCrumbs = () => {
    const dispatch = useDispatch()
    const BreadcrumbsValues = useSelector(state => state.common.Breadcrumbs)

    const setBreadcrumbs = (ArrayOfBreadCrumbs) => dispatch(setBreadcrumb(ArrayOfBreadCrumbs))
    const updateBreadcrumb = (ArrayOfNewBreadCrumbs) => dispatch(updateBreadcrumbs(ArrayOfNewBreadCrumbs))


    return { setBreadcrumbs, updateBreadcrumb, BreadcrumbsValues }
}