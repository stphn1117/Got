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
                    status: "sucess",
                    id: id
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "failed"
                })
            })

    } else {
        res.status(400).json({
            status: "failed"
        })
    }


})

app.post('/commit', async (req, res) => {
    let id = req.body.repo_id;
    let mensaje = req.body.message;
    let prevCommit = req.body.previous_commit;
    let changed = req.body.add_files;
    let addFiles = req.body.changed_files;
    if (!commit.checkIfLast(prevCommit)) {
        res.status(400).json({
            status: "outdated"
        })
    }
    if (id && mensaje && prevCommit) {
        if (commit.is_open()) { throw "unfinished commit in process" }
        let commit_id = await commit.open(id, prevCommit, mensaje);
        if (addFiles) {
            addFiles.forEach(file => {
                commit.insertArchivo(file.route, file.contents)
            });
        }
        if (changed) {
            changed.forEach(async (file) => {
                await commit.insertChange(file.route, file.contents);
            })
        }

        req.status(200).json({
            status: "sucess",
            commit_id: commit_id
        })
    } else { res.status(400).json({ "status": "failed" }) }
})


app.get('/rollback', async (req, res) => {
    let file = req.body.file_route;
    let commit_id = req.body.commit_id;
    let check = await DB.checkFileExists(file);
    if (!check) {
        res.status(400).json({
            status: "failed"
        })
    }
    let contents = await DB.getFileState(file, commit_id)
    res.json({
        route: file,
        content: contents
    })
})
app.get('/reset', async (req, res) => {
    let file = req.body.file_route;
    let check = await DB.checkFileExists(file);
    if (!check) {
        res.status(400).json({
            status: "failed"
        })
    }
    let contents = await DB.getFileState(file)
    res.json({
        route: file,
        content: contents
    })
})



app.get('/status', async (req, res) => {

})
