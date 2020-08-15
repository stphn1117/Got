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
                console.log(err);
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
    let addFiles = req.body.add_files;
    let changed = req.body.changed_files;
    if (!commit.checkIfLast(prevCommit)) {
        res.status(400).json({
            status: "outdated"
        })
    }
    if (id && mensaje && prevCommit) {
        if (commit.is_open()) { throw "unfinished commit in process" }
        let commit_id = await commit.open(id, prevCommit, mensaje);
        if (addFiles) {
            if (addFiles.lenght != 0) {
                addFiles.forEach(async (file) => {
                    if (file.route != "./metadata.json") {
                        await commit.insertArchivo(file.route, file.contents)
                    }
                })
            }
        }
        if (changed) {
            if (changed.lenght != 0) {
                changed.forEach(async (file) => {
                    if (file.route != "./metadata.json") {
                        await commit.insertChange(file.route, file.contents);
                    }
                })
            }
        }
        commit.close()
        res.status(200).json({
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
    let changed = [];
    tracked.forEach(async (file) => {
        let srvText = await DB.getFileState(file.route, commit_id);
        if (srvText != file.contents) {
            changed.push(file.route)
        }
    })
    if (changed.lenght == 0) {
        res.json({
            status: "no changes"
        })
    } else {
        res.json({
            status: "changed",
            changes: changed
        })
    }

})

app.get('/status/file', async (req, res) => {
    let content = req.body.content;
    let route = req.body.route;
    let commit_id = req.body.commit_id;
    let check = await DB.checkFileExists(route);
    if (!content || !route || !check) {
        res.status(400).json({ status: "failed" })
    }
    let srvText = await DB.getFileState(route, commit_id);
    let changed = "false";
    if (content != srvText) {
        let changed = "true";
    }
    let changesWithFile = await DB.getFileDiffs(route, commit_id)
    let fileHistory = []
    let changes = changesWithFile.changes;
    changes.forEach(field => {
        diffres = JSON.parse(field.diff_output);
        let cambio = `Cambio: ${field.commit_id}::${diffres.line}::${diffres.operation}\nChange::${diffres.content}`
        fileHistory.push(cambio)
        console.log(cambio)
    })
    res.json({
        status: "success",
        isChanged: "true",
        history: fileHistory
    })

})

