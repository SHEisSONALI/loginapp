import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="card">
        <Signup />
      </div>

      <div className="card">
        <Login />
      </div>
    </div>
  );
}

export default App;