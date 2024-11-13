// frontend/src/components/EmployeePage.js
import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

function EmployeePage() {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="employee-page">
      <button
        onClick={toggleFormVisibility}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        {showForm ? "Close Form" : "Add Employee"}
      </button>

      {/* EmployeeForm is only rendered when showForm is true */}
      <EmployeeForm visible={showForm} />
    </div>
  );
}

export default EmployeePage;
