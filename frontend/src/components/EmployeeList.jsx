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
            <li className="text-center text-red-500">No employees found</li>
          ) : (
            employees.map((employee) => (
              <li key={employee.id}>
                <div class="max-w-sm mx-auto ">
    <div class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
        <div class="flex items-center">
            <img class="rounded-full h-10 w-10" src="https://loremflickr.com/g/600/600/girl" />
            <div class="ml-2 flex flex-col">
                <div class="leading-snug text-sm text-white font-bold">{employee.name}</div>
                <div class="leading-snug text-xs text-white">{employee.surname}</div>
            </div>
        </div>
        <button class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">view</button>
    </div>
    </div>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

export default EmployeeList;
