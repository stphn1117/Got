const bodyParser = require("body-parser");
const express = require('express');
const md5 = require("md5");
const app = express();
const DB = require("./DataBase.js").DataBase.Instance();
app.use(express.json());
app.listen(3000, () => console.log('listening at 3000'));

app.get('/api', (resquest, response) => {
    console.log(request.body);
    response.send("SERVER GEres.status(400).send(object);T");
});
app.post('/init', async (req, res)=>{
    console.log(req.body)
    if(req.body.name){
        DB.insertRepo(req.body.name)
        .then((id)=>{
            res.status(200).json({
                "status":"sucess",
                "id": id
            });
        })
        .catch((err)=>{
            res.status(400).json({
                "status":"failed"
            })
        })
        
    }else{
        res.status(400).json({
            "status":"failed"
        })
    }


})
app.post('/commit', (req, res) => {
    if(req.body){

    }else{
        res.sendStatus(400)
    }
})


/*
app.post('/api/repo/init', async (req, res) => {
    if(ereq.body.name){
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

*/