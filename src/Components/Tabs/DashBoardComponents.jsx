import { Analytics, Orders, Products, Settings, Users } from '../../Pages/page-components/index';
import UpdateProducts from '../../Pages/page-components/ProductManagement/UpdateProduct';
import UserProfile from '../../Pages/page-components/UserManagement/UserProfile';

export const CurrentComponent = ({ selectOption, setCurrentComponent, setValues, setNestaion, ...props }) => {
    const componentMap = {
        'Dashboard': (props) => <Analytics {...props} />,
        'Manage Users': (props) => <Users {...props} />,
        'Orders': (props) => <Orders {...props} />,
        'Manage Products': (props) => <Products {...props} />,
        'Add Product': (props) => <UpdateProducts {...props} />,
        'Edit Product': (props) => <UpdateProducts {...props} />,
        'Site Settings': (props) => <Settings {...props} />,
        'User Profile': (props) => <UserProfile {...props} />,
    };
    const RenderComponent = componentMap[selectOption];
    return RenderComponent ? RenderComponent({ ...props, setCurrentComponent, setValues, setNestaion }) : null;
};
