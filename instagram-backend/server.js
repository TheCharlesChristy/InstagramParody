// import express for running server, bodyparser to simplify handling requests, cors to allow cross-origin requests
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import DBhandler  from './fetchdb.js';
import Tofile from './topng.js';
import testworker from './poststresstest.js';



// create and configure server
const db = new DBhandler();
const tofile = new Tofile()
const app = express();
app.use(cors('*'));
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '75mb'}));
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
  let login = await db.login(username, password);
  if(login == true){
    res.status(210).send(JSON.stringify({ 'login': true, 'username': username }));
  }else{
    res.status(450).send({ 'login': false });
  }
});

app.post('/api/addPost', async (req, res) => {
  let postnumber = await db.getpostnumber();
  let outpath = await tofile.convert(req.body.photo, postnumber, "Postimgs");
  try{
    await db.addPost(req.body.username, outpath, req.body.caption);
    res.status(200).send();
  }catch{
    res.status(400).send();
  }
});

app.post('/api/userdata', async (req, res) => {
  try{
    let userdata = await db.getuserdata(req.body.username);
    let imgdata = await tofile.getimgdata(userdata.pfpurl);
    userdata.imgdata = imgdata;
    res.status(200).send(JSON.stringify(userdata));
  }catch{
    res.status(400).send();
  }
});

app.post('/api/changepfp', async (req, res) => {
  let outpath = await tofile.convert(req.body.rawFileData, req.body.username, "Pfpimgs");
  let imgdata = await tofile.getimgdata(outpath);
  try{
    await db.changepfp(req.body.username, outpath);
    res.status(200).send(JSON.stringify({ 'imgdata': imgdata }));
  }catch{
    res.status(400).send();
  }
});

app.post('/api/getuserposts', async (req, res) => {
  try{
    let posts = [];
    let postsdata = await db.getuserposts(req.body.username);
    for(let i = 0; i < postsdata.length; i++){
      let post = postsdata[i];
      let imgdata = await tofile.getimgdata(post.content);
      post.imgdata = imgdata;
      posts.push(post);
    }
    res.status(200).send(JSON.stringify(posts));
  }catch{
    res.status(400).send();
  }
});
app.post('/api/getrecommendedusers', async (req, res) => {
  let username = req.body.username;
  let following = await db.getfollowing(username);
  if(following.length == 0){
    //if the user is not following anyone, return a list randomly selected users
    let unfilteredusers = await db.getrandusers();
    let users = [];
    let usersdict = {};
    for(let i = 0; i < unfilteredusers.length; i++){
      let user = unfilteredusers[i];
      if(usersdict[user] == undefined&&user != username){
        users.push(user);
        usersdict[user] = 1;
      }
    }
    res.status(200).send(JSON.stringify(users));
  }else if(following.length < 6){
    //if the user is following less than 6 users, return a list of users that the users following are following
  }else{
    //if the user is following more than 6 users, randomly select 5 users that the user is following
    //and return a list of users that the users following are following
  }
});

const testworker1 = new testworker();
let postspersecond = 100;
let interval = (1/postspersecond)*1000;//ms
let runtime = 5;//minutes
//testworker1.doposttest(interval, runtime);



// tell server to listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
