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
      await axios.post("http://localhost:5000/employees", formData);
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("There was an error adding the employee.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
      <input type="text" name="surname" placeholder="Surname" value={employee.surname} onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" value={employee.age} onChange={handleChange} required />
      <input type="text" name="idNumber" placeholder="ID Number" value={employee.idNumber} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" value={employee.role} onChange={handleChange} required />
      <input type="file" name="photo" onChange={handleFileChange} />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
