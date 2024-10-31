import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Breadcrumbs } from '@mui/material';
import { useBreadCrumbs } from '../../Hooks/common/useBreadCrumbs';
import { motion } from 'framer-motion'

const MotionBox = motion(Breadcrumbs)
const BreadcrumbsNav = ({ currentComponentName, nesting, setCurrentComponentName }) => {
    const { setBreadcrumbs, updateBreadcrumb, BreadcrumbsValues } = useBreadCrumbs();

    useEffect(() => {
        nesting ? updateBreadcrumb([currentComponentName]) : setBreadcrumbs([currentComponentName]);
    }, [currentComponentName]);

    return (
        <MotionBox
            initial={{ x: -800 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.95 }}
            aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Typography
                color="inherit"
                sx={{ cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}
            >
                Dashboard
            </Typography>
            {
                BreadcrumbsValues && BreadcrumbsValues.map((e, i) => (
                    <motion.div
                        key={`${e}-${i}`}
                        initial={{ y: -800 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            key={i}
                            sx={{ color: 'text.primary', cursor: 'pointer' }}
                            onClick={() => BreadcrumbsValues.length - 1 !== i && setCurrentComponentName(e, -1, false)}
                        >
                            {e}
                        </Typography>
                    </motion.div>
                ))
            }
        </MotionBox>
    );
};

export default BreadcrumbsNav;
