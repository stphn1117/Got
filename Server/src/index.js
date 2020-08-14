const express = require('express');
const app = express();
const DB = require("./DataBase.js").DataBase.Instance();
const commitAdmin = require("./Commit.js");
let commit = new commitAdmin.Commit()

app.use(express.json());
app.listen(3000, () => console.log('listening at 3000'));

app.post('/init', async (req, res) => {
    console.log(req.body)
    if (req.body.name) {
        DB.insertRepo(req.body.name)
            .then((id) => {
                res.status(200).json({
                    "status": "sucess",
                    "id": id
                });
            })
            .catch((err) => {
                res.status(400).json({
                    "status": "failed"
                })
            })

    } else {
        res.status(400).json({
            "status": "failed"
        })
    }


})
app.post('/commit/open', async (req, res) => {
    let id = req.body.repo_id;
    let mensaje = req.body.message;
    let prevCommit = req.body.previous_commit;
    if (id && mensaje && prevCommit) {
        if (commit.is_open()) { throw "unfinished commit in process" }
        let id = await commit.open(id, prevCommit, mensaje);
        req.status(200).json({
            "status": "sucess"
        })
    } else {
        res.status(400)
    }
})
app.post('/commit/add', async (req, res) => {
    if(!commit.is_open()){res.status(300).json({"status":"failed"})}
})
app.post('/commit/change', async (req, res) => {
    if(!commit.is_open()){res.status(300).json({"status":"failed"})}
})
app.get('/commit/close', async (req, res) => {
    let id = commit.close();
    if (commit.is_open()) {
        res.json({
            "commitId": id
        })
    }else{
        res.json({
            "status": "failed"
        })
    }
});