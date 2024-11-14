import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("https://employee-management-system-lflc.onrender.com/employees");
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

    const handleViewClick = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setFormData(employee); // Load current details into the form
        setIsEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://employee-management-system-lflc.onrender.com/employees/${selectedEmployee.id}`, formData);
            setEmployees(employees.map(emp => (emp.id === selectedEmployee.id ? formData : emp)));
            setIsEditing(false);
            alert("Employee details updated successfully");
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee details");
        }
    };

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`https://employee-management-system-lflc.onrender.com/employees/${employeeId}`);
            setEmployees(employees.filter(emp => emp.id !== employeeId));
            setSelectedEmployee(null);
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("There was an error deleting the employee.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({ ...prevState, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold text-center py-7">Employee List</h2>
            <ul>
                {employees.length === 0 ? (
                    <li className="text-center text-red-500">No employees found</li>
                ) : (
                    employees.map((employee) => (
                        <li key={employee.id}>
                            <div className="max-w-md mx-auto">
                                <div className="p-4 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
                                    <div className="flex items-center">
                                        <img
                                            className="rounded-full h-16 w-16"
                                            src={employee.photo || "https://loremflickr.com/g/600/600/person"} 
                                            alt={`${employee.name} ${employee.surname}`}
                                        />
                                        <div className="ml-2 flex flex-col">
                                            <div className="leading-snug text-xl font-bold">{employee.name}</div>
                                            <div className="leading-snug text-xl">{employee.surname}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleViewClick(employee)}
                                        className="h-8 px-3 py-1 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {selectedEmployee && (
                <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md  rounded-lg flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold mb-4">{selectedEmployee.name} {selectedEmployee.surname}</h3>
                    <p className="mb-2"><strong>Age:</strong> {selectedEmployee.age}</p>
                    <p className="mb-2"><strong>ID Number:</strong> {selectedEmployee.idNumber}</p>
                    <p className="mb-2"><strong>Role:</strong> {selectedEmployee.role}</p>
                    <img
                        className="mt-4 rounded-lg w-32 h-32 object-cover"
                        src={selectedEmployee.photo || "https://loremflickr.com/g/600/600/person"}
                        alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
                    />
                    <div className="flex mt-4">
                        <button
                            onClick={() => handleEditClick(selectedEmployee)}
                            className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(selectedEmployee.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {selectedEmployee && isEditing && (
                <form onSubmit={handleEditSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Edit Employee</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={formData.surname || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="ID Number"
                        value={formData.idNumber || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formData.role || ""}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="w-full mb-3 border border-gray-300 rounded-md p-2"
                    />
                    <button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}

export default EmployeeList;
