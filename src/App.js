import "./App.css";
import AddExpense from "./components/AddExpense/AddExpense";
import AddExpenseFormWithImg from "./components/AddExpense/AddExpenseFormWithImg";
import TopNav from "./components/TopNav/TopNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuth } from "./context/auth.context";

function App() {
  const { authState} = useAuth();
  return (
    <Router>
      <TopNav/>
      <Routes>
        <Route exact path="/" element={<AddExpenseFormWithImg />}>
        </Route>

        <Route path="/signup" element={<Signup />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;
