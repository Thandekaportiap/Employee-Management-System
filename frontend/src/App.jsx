// frontend/src/App.js
import React from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Navbar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="bg-[#613659] text-white min-h-screen">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center py-7 my-4">Employee Management System</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}

export default App;
