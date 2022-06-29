import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
