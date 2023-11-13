import { useLocation, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const location = useLocation();
    console.log(location);
    
    return (
        <Outlet />
    )
}