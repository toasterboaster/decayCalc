const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//render test page
app.get("/test", (req, res) => {
//res.sendFile(path.join(__dirname, '../public/test.html'));
res.sendFile(path.join(__dirname, "..", "public", "test.html"));
});