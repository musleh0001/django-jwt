const LoginPage = () => {
	return (
		<>
			<form method="POST">
				<input type="text" name="username" placeholder="Enter Username" />
				<input type="password" name="password" placeholder="Enter Password" />
				<input type="submit" value="Submit" />
			</form>
		</>
	);
};
export default LoginPage;
