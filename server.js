// Express Dependencies //////////////////////////////////////////////////////////////////////
    // Express
    const express = require('express');
    // Path and FS for file path and file writing
    const path = require('path');
    const fs = require('fs');
    // JSON Array File
    const db = require('./db/db.json');

// Express Boilerplate

    // Port Declarance and Express function call
    const PORT = process.env.PORT || 3001;
    const app = express();

    // Boilerplate to use JSON Data and urlEncoded
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // BOILERPLATE TO LET YOU KNOW EXPRESS SERVER HAS STARTED
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });



// ROUTES //////////////////////////////////////////////////////////////////////

    // HTML '/' PAGES

    //INDEX : HOMEPAGE
    app.get('/', (req, res) =>
        res.sendFile(path.join(__dirname, '/public/index.html'))
    );
    // NOTEPAD ROUTE
    app.get('/notes', (req, res) =>
        res.sendFile(path.join(__dirname, '/public/notes.html'))
    );


// API CALLS //////////////////////////////////////////////////////////////////////

    // BASE NOTEPAGE, GET NOTES / INIT
    app.get('/api/notes', (req, res) => {
        res.json(db.slice(1));
    });

    // API Call to Create a Note and then return notes
    app.post('/api/notes', (req, res) => {
        const note = newNote(req.body, db);
        res.json(note);
        })
    // API Call to Delete a Note
    app.delete('/api/notes/:id', (req, res) => {
        deleteNote(req.params.id, db);
        res.json(true);
        
    })
        
    // FUNCTIONS to CREATE AND DELETE NOTES //////////////////////////////////////////////////////////////////////

    const newNote = (body, noteArr) => {
        const temp = body;
        if (!Array.isArray(noteArr))
            noteArr = [];
        if (noteArr.length === 0)
            noteArr.push(0);
    
        body.id = noteArr.length;
        noteArr[0]++;
        noteArr.unshift(temp);
    
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(noteArr, null, 2)
        );
        return temp;
    };

    // Function to delete notes if user decided to
const deleteNote = (id, noteArr) => {
    for (let i = 0; i < noteArr.length; i++) {
        let note = noteArr[i];
        if (note.id == id) {
            noteArr.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArr, null, 2)
            );
            break;
        }
    }
};