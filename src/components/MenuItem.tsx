import { ReactNode } from "react";
import { Link } from "react-router-dom";
import './styles/MenuItem.css';

export interface MenuItemProps {
    route: string;
    children?: ReactNode;
}

function MenuItem(props: MenuItemProps) {
    const { route, children} = props;
    
    return (
        <Link className="menu-item" to={route}>
            {children || route}
        </Link>
    )
}

export default MenuItem;