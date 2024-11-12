// frontend/src/App.js
import React from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Employee Management System</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}

export default App;
