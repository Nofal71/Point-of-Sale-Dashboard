import { useSelector } from "react-redux";
import { Analytics, Pending, Placed, Products, UserAccounts, UserCarts, Settings } from '../../Pages/page-components/index';



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
                <Analytics />
            ) : selectOption === 'Pending Orders' ? (
                <Pending />
            ) : selectOption === 'Placed Orders' ? (
                <Placed />
            ) : selectOption === 'Products' ? (
                <Products />
            ) : selectOption === 'User Accounts' ? (
                <UserAccounts />
            ) : selectOption === 'User Carts' ? (
                <UserCarts />
            ) : selectOption === 'Site Settings' ? (
                <Settings />
            ) : null
        );
    };

    return getComponent();
};
