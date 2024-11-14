// frontend/src/components/EmployeeForm.js
import React, { useState } from "react";
import axios from "axios";

function EmployeeForm({ visible }) {
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    age: "",
    idNumber: "",
    role: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read file as base64
      reader.onloadend = () => {
        setEmployee({ ...employee, photo: reader.result }); // Store base64 in state
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { ...employee };
    try {
      await axios.post("https://employee-management-system-lflc.onrender.com/employees", formData);
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("There was an error adding the employee.");
    }
  };

  if (!visible) return null;

  return (
    <form 
    onSubmit={handleSubmit} 
    className="flex flex-col justify-center items-center max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
>
    <h2 className="text-xl font-bold mb-4">Add Employee</h2>
    <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={employee.name} 
        onChange={handleChange} 
        required 
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <input 
        type="text" 
        name="surname" 
        placeholder="Surname" 
        value={employee.surname} 
        onChange={handleChange} 
        required 
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <input 
        type="number" 
        name="age" 
        placeholder="Age" 
        value={employee.age} 
        onChange={handleChange} 
        required 
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <input 
        type="text" 
        name="idNumber" 
        placeholder="ID Number" 
        value={employee.idNumber} 
        onChange={handleChange} 
        required 
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <input 
        type="text" 
        name="role" 
        placeholder="Role" 
        value={employee.role} 
        onChange={handleChange} 
        required 
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <input 
        type="file" 
        name="photo" 
        onChange={handleFileChange} 
        className="w-full mb-3 border border-gray-300 rounded-md p-2"
    />
    <button 
        type="submit" 
        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
    >
        Add Employee
    </button>
</form>
  );
}

export default EmployeeForm;
