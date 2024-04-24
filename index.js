const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 6968;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/images/') // svaing to foler
    },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // time stamp
    }
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));
app.get('/gallery', (req, res) => {
 res.sendFile(path.join(__dirname, './public/gallery.html'));
})

app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const imagePaths = files
            .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif'))
            .map(file => '/images/' + file);
        res.json(imagePaths);
    });
});


app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const imagePath = '/images/' + req.file.filename;
    res.send(imagePath);
});

app.listen(port, () => {
    console.log(`running at ${port}`);
});
