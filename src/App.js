import React, { useState } from "react";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Route, useHistory } from "react-router-dom";

function App() {
  const [activeUser, setActiveUser] = useState(null);

  const history = useHistory();

  if (!activeUser) history.push("/login");

  return (
    <div>
      <h1>My Site</h1>
      {activeUser ? <button onClick={() => setActiveUser(null)}>Logout</button> : null}
      <Route exact path="/">
        <Home user={activeUser}  />
      </Route>
      <Route path="/login" >
        <LoginForm setActiveUser={setActiveUser}/>
      </Route>
      <Route path="/signup" >
        <SignupForm setActiveUser={setActiveUser}/>
      </Route>
    </div>
  );
}

export default App;
