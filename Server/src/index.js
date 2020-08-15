const express = require('express');
const app = express();
const DB = require("./DataBase.js").DataBase.Instance();
const commitAdmin = require("./Commit.js");
const processChanges = require('./processChanges.js');
const e = require('express');
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
app.get('/sync', async (req, res) => {
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

/**
 * Este comando nos va a mostrar cuales archivos han sido cambiados, agregados o eliminados de acuerdo al
commit anterior. Si el usuario especifica <file>, muestra el historial de cambios, recuperando el historial de
cambios desde el server
 */
app.get('/status', async (req, res) => {
    let tracked = req.body.tracked;
    let commit_id = req.body.commit_id;
    let changed =[];
    tracked.forEach(file=>{
        let srvText = DB.getFileState(file.route,commit_id);
        if(srvText != file.contents){
            changed.push(file.route)
        }
    })
    if(changed.lenght ==0){
        res.json({
            status: "no changes"
        })
    }else{
        res.json({
            status: "changed",
            changes: changed
        })
    }

})

app.get('/status/file', async (req, res) => {
    let content = req.body.content;
    let route = req.body.route;
    if(!content || !route){res.status(400).json({statis: "failed"})}
    ////// LINE OPERATION CONTENT
})

