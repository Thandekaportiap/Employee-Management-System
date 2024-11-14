import React from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeePage from "./pages/EmployeesPage";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
     <Navbar/>
    <div className="bg-[#613659]  min-h-screen">
      <h1 className="text-3xl font-bold text-center py-7 ">Employee Management System</h1>
      <EmployeeList />
      <EmployeePage />
    </div>
      <Footer />
      </>
  );
}

export default App;
