import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	let tokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
	const [user, setUser] = useState(tokens ? jwt_decode(tokens.access) : null);
	const [authTokens, setAuthTokens] = useState(tokens);
	const [loading, setLoading] = useState(true);
	const nagivate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:8000/api/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value }),
		});
		if (response.status === 200) {
			const data = await response.json();
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			nagivate("/");
		} else {
			console.log("Something went wrong");
		}
	};

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		nagivate("/login");
	};

	const updateToken = async () => {
		const response = await fetch("http://localhost:8000/api/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: authTokens?.refresh }),
		});
		if (response.status === 200) {
			const data = await response.json();
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			nagivate("/");
		} else {
			logout();
			console.log("Something went wrong");
		}
	};

	useEffect(() => {
		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, 4000 * 60);

		return () => clearInterval(interval);
	}, [authTokens, loading]);

	let contextData = { user, loginUser, logout, authTokens };

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
