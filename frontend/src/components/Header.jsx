import { Link } from "react-router-dom";

const Header = () => {
	return (
		<>
			<Link to="/">Home</Link>
			<span> | </span>
			<Link to="/about">About</Link>
			<span> | </span>
			<Link to="/login">Login</Link>
		</>
	);
};
export default Header;
