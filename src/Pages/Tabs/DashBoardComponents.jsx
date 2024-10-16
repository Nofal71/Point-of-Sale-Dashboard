import { useSelector } from "react-redux";
import MainDashboard from "../MainDashboard/MainDashboard";

export const useComponent = () => {
    const name = useSelector(state => state.currentSelection.name);
    const nestedComponents = useSelector(state => state.currentSelection.nestedComponent);

    const getComponent = () => {

        if (nestedComponents.length > 0) {
            return nestedComponents.map((c, index) => {
                if (c === 'nested2') {
                    return (
                        <div key={index}>
                            <h1>Nested 2</h1>
                        </div>
                    );
                }
                return null;
            });
        } else {
            if (name === 'Dashboard') {
                return <MainDashboard />;
            } else if (name === 'item1') {
                return <h1>Item 1</h1>;
            } else if (name === 'item2') {
                return <h1>Item 2</h1>
            }
        }
        return null;
    };

    return getComponent();
};
