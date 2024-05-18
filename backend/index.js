const multer = require('multer');
const path = require('path');
const cors = require("cors");
const express = require("express");
const myInfo = [
    {
        id: "1",
        name: "Sreyasree Sasmal",
        age: "21"
    },
    {
        id: "2",
        name: "Piyali Ghosh",
        age: "20"
    },
    {
        id: "3",
        name: "Pausali Sengupta",
        age: "19"
    }
];

const app = express();

const port = process.env.PORT || 5000;

//app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//add cors for allowing server
app.use(cors());
//for backend server landing page
app.get('/', (req, res) => {
    res.send("Server is ready");
});
//for backend server extra page
app.get('/api/mypage', (req, res) => {
    res.send(myInfo);
})

app.post('/api/mypage', (req, res) => {
    console.log(req.body);
    myInfo.push(req.body);
    res.redirect("/");
})
//


const storage = multer.diskStorage({
    destination : function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage});

app.get('/api/upload',(req, res)=>{
    res.send("This page is for upload")
})
app.post('/api/upload',upload.single('image'), (req, res)=>{
    console.log("Backend connected");
    if(!req.file){
        return res.status(400).json({message: 'No file uploaded'});
    }
    const imagePath = req.file.path;

    console.log(req.file);
    console.log(req.body);

    res.json({imagePath});

    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

/*const PORT = process.env.PORT || 5000;

app.set("view engine", "js");
app.set("views",path.resolve("/src/app"));

app.use(express.urlencoded({extended: false}));

app.get("/",(req, res)=>{
    return res.render("layout");
})

const storage = multer.diskStorage({
    destination : function (req, file, cb){
        return cb(null, '/uploads');
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage});

app.post('/upload',upload.single('image'), (req, res)=>{
    if(!req.file){
        return res.status(400).json({message: 'No file uploaded'});
    }
    const imagePath = req.file.path;

    console.log(req.file);
    console.log(req.body);

    res.json({imagePath});

    return res.redirect("/");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
*/