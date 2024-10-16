import React from 'react';
import { useDispatch } from 'react-redux';
import { setName, setNestedComponent } from '../../redux/Reducers/currentComponentSlice';

const MainDashboard = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Main Dashboard</h1>
            <button onClick={() => {
                dispatch(setNestedComponent('nested1'));
            }}>
                Navigate to Nested
            </button>
        </div>
    );
};

export default MainDashboard;
