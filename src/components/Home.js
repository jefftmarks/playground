import React from "react";

function Home({ user }) {
	return <h1>Welcome {user ? user.name : null}</h1>
}

export default Home;