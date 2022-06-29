import { useEffect } from "react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
	const { user, authTokens, logout } = useContext(AuthContext);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = async () => {
		const response = await fetch("http://localhost:8000/api/notes/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens.access}`,
			},
		});

		if (response.status === 200) {
			const data = await response.json();
			// setNotes(data);
			console.log(data);
		} else if (response.status === 401) {
			logout();
		} else {
			console.log("Something went wrong");
		}
	};

	return (
		<div>
			<p>{user?.username}, you are logged to the home page!</p>

			<ul>
				{notes.map((note) => (
					<li key={note.id}>{note}</li>
				))}
			</ul>
		</div>
	);
};
export default HomePage;
