import "./App.css";
import AddExpense from "./components/AddExpense/AddExpense";
import AddExpenseFormWithImg from "./components/AddExpense/AddExpenseFormWithImg";
import TopNav from "./components/TopNav/TopNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ReminderPage from "./pages/reminders/ReminderPage";
import GoalPage from "./pages/goals/GoalPage";
import AllReminders from "./pages/AllReminders";
import AllGoals from "./pages/AllGoals";
import Alltransactions from "./pages/Alltransactions";
import Analytics from "./pages/analytics/Analytics";

function App() {
  return (
    <Router>
      <TopNav />

      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/add-expense" element={<AddExpense />}></Route>
        <Route
          exact
          path="/add-expense-img"
          element={<AddExpenseFormWithImg />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add-reminder" element={<ReminderPage />}></Route>
        <Route
          path="/reminders/add-reminder"
          element={<ReminderPage />}
        ></Route>
        <Route path="/reminders" element={<AllReminders />}></Route>
        <Route path="/goals" element={<AllGoals />}></Route>
        <Route path="/add-goal" element={<GoalPage />}></Route>
        <Route path="/transactions" element={<Alltransactions />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
