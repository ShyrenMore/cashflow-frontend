import "./App.css";
import AddExpense from "./components/AddExpense/AddExpense";
import AddExpenseFormWithImg from "./components/AddExpense/AddExpenseFormWithImg";
import TopNav from "./components/TopNav/TopNav";

function App() {
  return (
    <div className="App">
      {/* <AddExpense /> */}
      <TopNav />
      <AddExpenseFormWithImg />
    </div>
  );
}

export default App;
