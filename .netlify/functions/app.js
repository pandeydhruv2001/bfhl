const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');
const router = express.Router;
// Sample user data (you can replace this with your own data)
const userData = {
  full_name: 'Dhruv',
  dob: '22072001',
  email: 'dp0689@srmist.edu.in',
  roll_number: 'RA201103030192',
};

app.use(bodyParser.json());
app.use(cors());
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid input data');
    }

    // Extract numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);

    // Find the highest alphabet
    const highestAlphabet = alphabets.reduce((prev, current) =>
      current > prev ? current : prev
    );

    const response = {
      is_success: true,
      user_id: `${userData.full_name}_${userData.dob}`,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error_message: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  try {
    // Handle GET request, return operation_code
    res.json({ operation_code: 1 });
  } catch (error) {
    res.status(500).json({ is_success: false, error_message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/.netlify/functions/app',router)
module.exports.handler = serverless(app);