// frontend/src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get("http://localhost:5000/employees");
          setEmployees(response.data);
        } catch (err) {
          setError('Error fetching employees');
          console.error('Error:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmployees();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div>
        <h2>Employee List</h2>
        <ul>
          {employees.length === 0 ? (
            <li>No employees found.</li>
          ) : (
            employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} {employee.surname}, {employee.role}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

export default EmployeeList;
