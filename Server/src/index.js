//const DataBase = new (require("./DataBase").DataBase)();
const bodyParser = require("body-parser");
const express = require('express');
const md5 = require("md5");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.listen(3001, () => console.log('listening at 3001'));


var num = -1;
var n = "";

app.post('/api', (req, response) => {
    console.log(req.body);
    console.log("recibido");
    response.send("server post");
});

app.get('/api', (req, res) => {
    console.log(req.body);
    res.send("SERVER GET");
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
    const { repo_id, messageCommit, files} = req.body;

    //Validate the request from client
    if(repo_id && messageCommit && files){
        //verify that the client commit is up to date with the rest of the changes made by others
        //users.

        //const commit_id = DataBase.newCommit(repo_id, messageCommit, files);
        const object = {
            "message": "commit done",
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

app.get('/api/repo/:repo_id/:commit_id/:file/status', async (req, res) => {
    console.log(req.body);
    const { repo_id, commit_id, file} = req.body;
    if(repo_id && commit_id){
        //const changes_record = DataBase.status(repo_id, commit_id, file);
        res.send({"status": "changes_record"});
    }else{
        res.status(400).send("No works");
    }
});

app.get('/api/repo/:id/rollback', async (req, res) => {
    console.log(req.body);
    const { repo_id, commit_id, file } = req.body;
    if(repo_id && commit_id && file){
        //const comeback = DataBase.rollback(repo_id, commit_id, file);
        res.send({"rollback": "comeback"})
    }else{
        res.status(400).send({});
    }
});

app.get('/api/repo/:id/reset', async (req, res) =>{
    console.log(req.body);
    const { repo_id, commit_id, file } = req.body;
    if(repo_id && commit_id && file){
        //const resetFile = DataBase.reset(repo_id, commit_id, file);
        res.send({"reset": "resetFile"});
    }else{
        res.status(400).send({});
    }
});

app.get('/api/repo/:id/sync', async (req, res) => {
    console.log(req.body);
    const { repo_id, commit_id, file } = req.body;
    if(repo_id && commit_id && file){
        //const synchronized = DataBase.sync(repo_id, commit_id, file);
        res.send({"sync": "synchronized"});
    }else{
        res.status(400).send({});
    }
});