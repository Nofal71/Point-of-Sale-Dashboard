import { Analytics, Pending, Placed, Products, UserAccounts, UserCarts, Settings } from '../../Pages/page-components/index';
import UpdateProducts from '../../Pages/page-components/ProductManagement/UpdateProduct';

export const CurrentComponent = ({ selectOption, setCurrentComponent, setValues, ...props }) => {
    const componentMap = {
        'Dashboard': (props) => <Analytics {...props} />,
        'Pending Orders': (props) => <Pending {...props} />,
        'Placed Orders': (props) => <Placed {...props} />,
        'Products': (props) => <Products {...props} />,
        'Add Product': (props) => <UpdateProducts {...props} />,
        'Edit Product': (props) => <UpdateProducts {...props} />,
        'User Accounts': (props) => <UserAccounts {...props} />,
        'User Carts': (props) => <UserCarts {...props} />,
        'Site Settings': (props) => <Settings {...props} />,
    };

    const RenderComponent = componentMap[selectOption];
    return RenderComponent ? RenderComponent({ ...props, setCurrentComponent, setValues }) : null;
};
