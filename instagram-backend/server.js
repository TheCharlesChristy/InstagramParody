// import express for running server, bodyparser to simplify handling requests, cors to allow cross-origin requests
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import DBhandler  from './fetchdb.js';
import Tofile from './topng.js';



// create and configure server
const db = new DBhandler();
const tofile = new Tofile()
const app = express();
app.use(cors('*'));
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(bodyParser.json());

// request handling goes here
app.get('/api/data', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.post('/api/addUser', (req, res) => {
  db.addUser(req.body.username, req.body.password);
  res.send({ message: 'User added successfully!' });
});

app.post('/api/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Attempting to login with username: " + username);
  let login = await db.login(username, password);
  console.log(login);
  if(login == true){
    res.status(210).send(JSON.stringify({ 'login': true, 'username': username }));
  }else{
    res.status(450).send({ 'login': false });
  }
});

app.post('/api/addPost', async (req, res) => {
  let postnumber = await db.getpostnumber();
  let outpath = await tofile.convert(req.body.photo, postnumber);
  try{
    await db.addPost(req.body.username, outpath, req.body.caption);
    res.status(200).send();
  }catch{
    res.status(400).send();
  }
});



// tell server to listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
