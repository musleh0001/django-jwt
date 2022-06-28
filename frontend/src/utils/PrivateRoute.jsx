import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const [user, setUser] = useState(false);

	return user ? <Outlet /> : <Navigate to="login" />;
};
export default PrivateRoute;
