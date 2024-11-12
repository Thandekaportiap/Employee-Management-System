// app.js
const express = require("express");
const multer = require("multer");
const { db, bucket } = require("./firebaseConfig");

const app = express();
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Add a new employee
app.post("/employees", upload.single("photo"), async (req, res) => {
  try {
    const { name, surname, age, idNumber, role } = req.body;
    const photoFile = req.file;

    // Upload photo to Firebase Storage
    const photoName = `employees/${Date.now()}_${photoFile.originalname}`;
    const file = bucket.file(photoName);

    await file.save(photoFile.buffer, {
      contentType: photoFile.mimetype,
    });
    const photoURL = `https://storage.googleapis.com/${bucket.name}/${photoName}`;

    // Save employee data to Firestore
    const employeeRef = db.collection("employees").doc();
    await employeeRef.set({
      name,
      surname,
      age,
      idNumber,
      role,
      photoURL,
    });

    res.status(201).json({ id: employeeRef.id, message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const employees = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const doc = await db.collection("employees").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
app.put("/employees/:id", upload.single("photo"), async (req, res) => {
  try {
    const { name, surname, age, idNumber, role } = req.body;
    const photoFile = req.file;

    const employeeRef = db.collection("employees").doc(req.params.id);
    const doc = await employeeRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Employee not found" });
    }

    let updatedData = { name, surname, age, idNumber, role };

    // If a new photo is uploaded, update Firebase Storage and Firestore
    if (photoFile) {
      const oldPhotoURL = doc.data().photoURL;
      if (oldPhotoURL) {
        const oldFile = bucket.file(oldPhotoURL.split(`${bucket.name}/`)[1]);
        await oldFile.delete();
      }
      const photoName = `employees/${Date.now()}_${photoFile.originalname}`;
      const file = bucket.file(photoName);
      await file.save(photoFile.buffer, {
        contentType: photoFile.mimetype,
      });
      updatedData.photoURL = `https://storage.googleapis.com/${bucket.name}/${photoName}`;
    }

    await employeeRef.update(updatedData);
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const employeeRef = db.collection("employees").doc(req.params.id);
    const doc = await employeeRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete photo from Firebase Storage
    const photoURL = doc.data().photoURL;
    if (photoURL) {
      const file = bucket.file(photoURL.split(`${bucket.name}/`)[1]);
      await file.delete();
    }

    // Delete employee record from Firestore
    await employeeRef.delete();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
