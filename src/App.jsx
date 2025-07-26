// App.jsx

import { env_vars } from "./environments";
import Parse from "parse";
import { Components } from "./Components";
import "./App.css"

Parse.initialize(env_vars.applicationId, env_vars.javaScriptKey);
Parse.serverURL = env_vars.serverURL;

function App() {
  return (
    <Components />
  ); 
}

export default App;
