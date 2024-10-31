import { Analytics, Pending, Placed, Products, Settings, Users } from '../../Pages/page-components/index';
import UpdateProducts from '../../Pages/page-components/ProductManagement/UpdateProduct';

export const CurrentComponent = ({ selectOption, setCurrentComponent, setValues, setNestaion, ...props }) => {
    const componentMap = {
        'Dashboard': (props) => <Analytics {...props} />,
        'Manage Users': (props) => <Users {...props} />,
        'Pending Orders': (props) => <Pending {...props} />,
        'Placed Orders': (props) => <Placed {...props} />,
        'Manage Products': (props) => <Products {...props} />,
        'Add Product': (props) => <UpdateProducts {...props} />,
        'Edit Product': (props) => <UpdateProducts {...props} />,
        'Site Settings': (props) => <Settings {...props} />,
    };
    const RenderComponent = componentMap[selectOption];
    return RenderComponent ? RenderComponent({ ...props, setCurrentComponent, setValues, setNestaion }) : null;
};
