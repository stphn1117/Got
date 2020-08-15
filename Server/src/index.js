const express = require('express');
const app = express();
const DB = require("./DataBase.js").DataBase.Instance();
const commitAdmin = require("./Commit.js");
const processChanges = require('./processChanges.js')
let commit = new commitAdmin.Commit();

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

app.post('/commit', async (req, res) => {
    let id = req.body.repo_id;
    let mensaje = req.body.message;
    let prevCommit = req.body.previous_commit;
    let changed = req.body.add_files;
    let addFiles = req.body.changed_files;
    if (id && mensaje && prevCommit) {
        if (commit.is_open()) { throw "unfinished commit in process" }
        let id = await commit.open(id, prevCommit, mensaje);
        // needs review
        if (changes) {
            changes.forEach(file => {
                console.log(file);
                let patch = processChanges.getDiff(file.route, file.contents)
                await commit.insertChange();
            })
        }
        if (addFiles) {
            addFiles.forEach(element => {
                console.log(element)
            });
        }
        req.status(200).json({
            "status": "sucess",
            "commit_id": id
        })
    } else { res.status(400).json({ "status": "failed" }) }
})


app.get('/rollback', async (req, res) => {

})

app.get('/status', async (req, res) => {

})
