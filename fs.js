import express from "express";
import * as dotenv from 'dotenv';
import fs from 'fs'

const app = express();

dotenv.config()

// API endpoint to create a text file with current timestamp

app.get('/createFile', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); 
    const filename = `${timestamp}.txt`;

    fs.writeFile(`./current/${filename}`, timestamp, (err) => {
        if (err) {
            return res.status(500).send("Error creating file");
        }
        res.send(`File ${filename} created successfully`);
    });
});


// API endpoint to retrieve all text files in the folder

app.get('/getTextFiles', (req, res) => {
    fs.readdir('./current', (err, files) => {
        if (err) {
            return res.status(500).send("Error retrieving files");
        }
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json(textFiles);
    });
});

// Start server
const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server listening on port", PORT))