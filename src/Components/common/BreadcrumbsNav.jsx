import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { Breadcrumbs } from '@mui/material';
import { useBreadCrumbs } from '../../Hooks/common/useBreadCrumbs';

const BreadcrumbsNav = ({ currentComponentName, nesting }) => {
    const { setBreadcrumbs, updateBreadcrumb, BreadcrumbsValues } = useBreadCrumbs()
    useEffect(() => {
        if (nesting) {
            updateBreadcrumb([currentComponentName])
        } else {
            setBreadcrumbs([currentComponentName])
        }
    }, [currentComponentName])

    return (
        <>

            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} >
                <Typography color="inherit" sx={{ cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}>
                    Dashboard
                </Typography>
                {
                    BreadcrumbsValues && BreadcrumbsValues.map((e, i) => (
                        <Typography key={i} sx={{ color: 'text.primary', cursor: 'pointer' }}> {e} </Typography>
                    ))
                }
            </Breadcrumbs>

        </>
    )
}

export default BreadcrumbsNav
