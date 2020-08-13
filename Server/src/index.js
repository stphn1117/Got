//const DataBase = new (require("./DataBase").DataBase)();
const bodyParser = require("body-parser");
const express = require('express');
const md5 = require("md5");
const app = express();
app.use(express.json());
app.listen(3000, () => console.log('listening at 3000'));

var num = -1
var n = "";

app.post('/api', (req, response) => {
    console.log(req.body);
    console.log("recibido");
    response.send("server post");
});

app.get('/api', (resquest, response) => {
    console.log(request.body);
    response.send("SERVER GET");
});

app.post('/api/repo/init', async (req, res) => {
    console.log(req.body);
    const { name } = req.body;

    if(name){
        //Create a new repository with the indicated name in the database, return repo_id...
        //const repo_id = DataBase.insertRepo(name);
        num++;
        n = num.toString();
        const object = {
            "message": "Repository " + name +  " created",
            "id": n
        };
        res.send(object);
    }
    else{
        const object = {
            "message": "The repository name has not been specified",
            "rep_id": -1 
        };
        res.status(400).send(object);
    }
});

app.post('/api/repo/:id/commit', async (req, res) => {
    console.log(req.body);
    const { repo_id, head, messageCommit, files} = req.body;

    //Validate the request from client
    if(repo_id && head && messageCommit){
        //const commit_id = DataBase.newCommit(repo_id, head, messageCommit, files);
        const object = {
            "message": "Commit done",
            "commit_id": 0
        };
        res.send(object);
    }
    else{
        const object = {
            "message": "commit could not be performed",
            "commit_id": -100 
        };
        res.status(400).send(object);
    }
});

