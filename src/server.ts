import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 6968;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // <-- added timestamp for the files
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/gallery', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/gallery.html'))
})

app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, '../public', 'images');
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



app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('no image uploaded');
    }
    const imagePath = '/images/' + req.file.filename;
    res.send(imagePath); // this is the image path so i can put it on the hyperlink
});

app.listen(port, () => {
    console.log(`started: ${port}`);
});
