import express from 'express';
import cors from 'cors'; // Import CORS middleware
import { db } from './firebaseConfig.js'; // Firestore setup

const employeesCollection = db.collection('employees')

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins (you can restrict this to specific origins later)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Employee Management System');
});

app.post('/employees', async (req, res) => {
  try {
    const { name, surname, age, idNumber, role, photo } = req.body;

    // Create a new employee document with base64-encoded photo
    const newEmployee = {
      name,
      surname,
      age,
      idNumber,
      role,
      photo, // Store the base64-encoded image
    };

    // Save employee data in Firestore
    const employeeDoc = await db.collection('employees').add(newEmployee);
    res.status(201).json({ id: employeeDoc.id, ...newEmployee });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const snapshot = await employeesCollection.get();
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched employees:', employees); // Log the employees to see the data
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
