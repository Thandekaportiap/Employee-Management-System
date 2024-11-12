// frontend/src/components/EmployeeForm.js
import React, { useState } from "react";
import axios from "axios";

function EmployeeForm() {
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
    setEmployee({ ...employee, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(employee).forEach((key) => formData.append(key, employee[key]));

    try {
      await axios.post("http://localhost:5000/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="surname" placeholder="Surname" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} />
      <input type="text" name="role" placeholder="Role" onChange={handleChange} />
      <input type="file" name="photo" onChange={handleFileChange} />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
