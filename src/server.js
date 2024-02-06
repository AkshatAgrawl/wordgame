const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/validate-word', (req, res) => {
  const { word } = req.body;

  // Use spawn to run the Python script as a separate process
  const pythonProcess = spawn('python', ['C:/Users/Akshat.agrawal/Desktop/Project/wordgame/test.py', word]);

  let result = '';

  // Capture the standard output of the Python script
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  // Handle errors during the Python script execution
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error executing Python script: ${data}`);
    res.status(500).json({ error: 'Internal server error' });
  });

  // Handle the end of the Python script execution
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // Successfully executed
      const isValid = result.trim() === 'True';
      res.json({ isValid });
    } else {
      // Script execution failed
      console.error(`Python script exited with code ${code}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
