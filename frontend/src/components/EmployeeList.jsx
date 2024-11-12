// frontend/src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} {employee.surname}, {employee.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
