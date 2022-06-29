import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<>
			<Link to="/">Home</Link>
			<span> | </span>
			<Link to="/about">About</Link>
			<span> | </span>
			{user ? (
				<button type="button" onClick={logout}>
					Logout
				</button>
			) : (
				<Link to="/login">Login</Link>
			)}
		</>
	);
};
export default Header;
