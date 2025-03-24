import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import './styles/MenuItem.css';

export interface MenuItemProps {
    route?: string;
    url?: string;
    children?: ReactNode;
}

function MenuItem(props: MenuItemProps) {
    const { route, url, children } = props;
    const location = useLocation();
    const atRoute = location.pathname === `/${route === '/' ? '' : route}`;

    if (url) {
        return (
            <a href={url} target="_blank" className="menu-item">{children}</a>
        );
    }

    return (
        <Link className={`menu-item ${atRoute ? "active" : ""}`} to={route!}>
            {children || route}
        </Link>
    );
}

export default MenuItem;