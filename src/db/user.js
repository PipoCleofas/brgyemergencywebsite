const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


let connection;

function setConnection(conn) {
  connection = conn;
}



function validateUserData(req, res, next) {
  const { lname, fname, mname, gender, birthday } = req.body;

  if (!lname || !fname || !mname || !gender || !birthday) {
    return res.status(400).send('Last name, First name, Middle Name, Gender, and Birthday are required');
  }

  next(); 
}




router.post('/submittt', (req, res) => {
  const { lname, fname, mname, gender, birthday, address } = req.body;

  // Debugging: Log the incoming data
  console.log('Received user data:', { lname, fname, mname, gender, birthday, address });

  // Validate required fields (no empty strings or undefined values)
  if ([lname, fname, mname, gender, birthday, address].some((field) => !field || field.trim() === '')) {
    return res.status(400).json({ error: 'All fields are required and must not be empty.' });
  }

  const query = `
    INSERT INTO User (LastName, FirstName, MiddleName, Gender, Birthday, Address) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [lname, fname, mname, gender, birthday, address];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error);

      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Duplicate entry. User already exists.' });
      }

      return res.status(500).json({ error: 'Failed to save data.' });
    }

    // Success: Retrieve the inserted user's ID
    const insertedUserId = results.insertId;
    res.status(201).json({ message: 'Data saved successfully.', userId: insertedUserId });
  });
});






router.get('/getUser', (req, res) => {
  const { username, password } = req.query;

  const verify = `SELECT * FROM User WHERE Username = ? AND Password = ? AND Status = "approved" `;

  connection.query(verify, [username, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({
        id: user.UserID,
        username: user.Username,
        fname: user.FirstName,
        lname: user.LastName,
        mname: user.MiddleName,
        gender: user.Gender,
        address: user.Address
      });
    } else {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }
  });
});

router.get('/getUserList', (req, res) => {
  const verify = 'SELECT * FROM User WHERE Status = "pending"';

  connection.query(verify, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    return res.status(200).json(results.length > 0 ? results : []);
  });
});

router.get('/user-count', (req, res) => {
    const query = 'SELECT COUNT(*) AS userCount FROM User';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).send('Database error');
      }
  
      const userCount = results[0].userCount;
      res.status(200).json({ userCount });
    });
  });

router.put('/updateUserStatus/:newStatus', (req, res) => {
  const newStatus = req.params.newStatus; 
  const { id } = req.body;    

  console.log('Received data:', { newStatus, id });

  if (!id) {
    return res.status(400).send('Id is required');
  }

  const query = `UPDATE User SET status = ? WHERE UserID = ?`;
  const values = [newStatus, id]; 

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Status updated successfully');
  });
});

router.put('/updateUser/:newUsername/:newPassword', (req, res) => {
  const newUsername = req.params.newUsername;
  const newPassword = req.params.newPassword; // Fixed: Use newPassword parameter

  const { lname, fname, mname } = req.body;

  // Log the received data for debugging
  console.log('Received data:', { newUsername, newPassword, lname, fname, mname });

  // Validate input
  if (!lname || !fname || !mname || !newUsername || !newPassword) {
    return res.status(400).send('All fields (username, password, first name, last name, middle name) are required.');
  }

  // Correct SQL query
  const query = `UPDATE User SET username = ?, password = ? WHERE FirstName = ? AND LastName = ? AND MiddleName = ?`;
  const values = [newUsername, newPassword, fname, lname, mname]; // Correct parameter order

  // Execute query
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Username and password updated successfully.');
  });
});


router.put('/updateStatusUser/:status', (req, res) => {
  const { status } = req.params;  // Extract the status from URL
  const { UserID } = req.body;    // Extract user ID from request body
    
  if (!UserID) {
      return res.status(400).send('UserID is required');
  }

  if (!UserID) {
    return res.status(400).send('UserID is required');
  }

  const query = 'UPDATE User SET Status = ? WHERE UserID = ?';
  const values = [status, UserID]; 

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User status updated successfully');
  });
});





module.exports = { router, setConnection };