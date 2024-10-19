import { useSelector } from "react-redux";


export const useComponent = () => {
    const selectOption = useSelector(state => state.currentSelection.name);
    // const nestedComponents = useSelector(state => state.currentSelection.nestedComponent);

    const getComponent = () => {
        // return
        // nestedComponents.length > 0 ? (
        //     nestedComponents.map((c, index) =>
        //         c === 'nested2' ? (
        //             <div key={index}>
        //                 <h1>Nested 2</h1>
        //             </div>
        //         ) : null
        //     )
        // ) :

        return (
            selectOption === 'Dashboard' ? (
                <h1>Main Dashboard</h1>
            ) : selectOption === 'item1' ? (
                <h1>Item 1</h1>
            ) : selectOption === 'item2' ? (
                <h1>Item 2</h1>
            ) : selectOption === 'Dashboard Settings' ? (
                <h1>Settings</h1>
            ) : null
        );
    };

    return getComponent();
};
