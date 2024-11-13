// frontend/src/App.js
import React from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeePage from "./pages/EmployeesPage";
import Navbar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="bg-[#613659]  min-h-screen">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center py-7 my-4">Employee Management System</h1>
      <EmployeePage />
      <EmployeeList />
    </div>
  );
}

export default App;
