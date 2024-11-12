import express from 'express';
import { db } from './firebaseConfig.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // Limit to handle larger base64 images

const employeesCollection = db.collection('employees');

// Add a new employee
app.post('/employees', async (req, res) => {
  try {
    const { name, surname, age, idNumber, photo, role } = req.body;

    const newEmployee = {
      name,
      surname,
      age,
      idNumber,
      photo, // base64 string
      role,
    };

    const employeeDoc = await employeesCollection.add(newEmployee);
    res.status(201).json({ id: employeeDoc.id, ...newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const snapshot = await employeesCollection.get();
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get a specific employee by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeDoc = await employeesCollection.doc(employeeId).get();

    if (!employeeDoc.exists) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ id: employeeDoc.id, ...employeeDoc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// Update an employee
app.put('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, surname, age, idNumber, photo, role } = req.body;

    const updatedEmployee = {
      name,
      surname,
      age,
      idNumber,
      photo, // base64 string
      role,
    };

    await employeesCollection.doc(employeeId).set(updatedEmployee, { merge: true });
    res.status(200).json({ id: employeeId, ...updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    await employeesCollection.doc(employeeId).delete();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
