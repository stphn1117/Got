const Huffman = new (require("./Huffman").Huffman)();
const mysql = require("mysql");
const assert = require("assert");
const md5 = require("md5");
const diff = require("diff");


class DataBase {
    static instance;
    static inst=false;
    mysql;
    constructor(){
        if(DataBase.inst){throw "too many instances"}
        DataBase.inst=true;
        this.mysql = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'GOT',
            insecureAuth: true
        };
    }
    static Instance(){
        if(!this.instance){
            this.instance = new DataBase();
        }
        return this.instance;
    }

    insertRepo(name, callback) {
        let sql = `INSERT INTO REPOSITORIO (nombre) VALUES ("${name}")`;
        console.log(sql)
        let conn = mysql.createConnection(this.mysql);
        conn.query(sql, (err, result, fields)=>{
            callback(result.InsertId);
			conn.end();
        })
    }
    
    addCommit(repo_id, parent_id, commitMessage, file_list, callback) {
        //What do i need in DataBase for add a new commit

        /*
        CREATE TABLE IF NOT EXISTS REPOSITORY
        (
            repo_id INTEGER AUTO_INCREMENT NOT NULL, 
            repo_name TEXT NOT NULL, 
            head CHAR(32), //last commit
            PRIMARY KEY(id), 
            FOREIGN KEY(head) REFERENCES COMMITS(id)
        );

        CREATE TABLE IF NOT EXISTS COMMITS
        (
            commit_id CHAR(32) NOT NULL, 
            parent_id CHAR(32), //last commit id
            repo_id INTEGER NOT NULL,
            commitMessage VARCHAR(255) TEXT NOT NULL,
            PRIMARY KEY(commit_id), 
            FOREIGN KEY(parent_id) REFERENCES COMMITS(id)
        );

        CREATE TABLE IF NOT EXISTS FILES
        (
            id INTEGER NOT NULL, 
            path TEXT NOT NULL, 
            deleted_in CHAR(32), 
            from_section INTEGER NOT NULL, 
            to_section INTEGER NOT NULL, 
            FOREIGN KEY(id) REFERENCES REPOSITORY(repo_id), 
            FOREIGN KEY(deleted_in) REFERENCES COMMITS(commit_id), 
            FOREIGN KEY(from_section) REFERENCES CHANGES(change_id), 
            FOREIGN KEY(to_section) REFERENCES CHANGES(change_id)
        )`);

        CREATE TABLE IF NOT EXISTS CHANGES
        (
            change_id INTEGER AUTO_INCREMENT NOT NULL, 
            commit CHAR(32) NOT NULL, 
            parent INTEGER, 
            checksum CHAR(32) NOT NULL, 
            data MEDIUMBLOB NOT NULL, 
            padding INTEGER NOT NULL,
            huffman_tree JSON NOT NULL,
            PRIMARY KEY(change_id),
            FOREIGN KEY(commit) REFERENCES COMMITS(commit_id)
        );
        */

        let commit_id = md5(Date.now);
        
        //Insert in database
        /*
            INSERT INTO COMMITS (repo_id, parent_id, commit_id, commitMessage)
            VALUES (${repo_id}, ${parent_id}, ${commit_id} ${commitMessage});
        */
        
        for(let path in file_list){
            //If the file has been eliminated
            if(file_list[path] == null){

                //Update this in database
                /*
                    UPDATE FILES SET deleted_in = ? WHERE FILES.repo_id = ? AND FILES.path = ? AND FILES.deleted_in IS NULL)
                    VALUES (${commid_id}, ${repo_id}, ${path}); 
                */
            }

            //The file path may be in the database
            else{
                //To check if it is in the database 
                /*
                    const result = SELECT * FROM FILES WHERE FILES.repo_id = ? AND FILES.path = ? AND FILES.deleted_in IS NULL)
                    VALUES(${repo_id}, ${path});
                */

                //If the file path is stored in the database 
                if(result.length > 0){
                    let from_section = result[0].from_section; 
                    let to_section  = result[0].to_section;
                    let bodyFile = this.patch(from_section, to_section);

                    let patch = diff.createPatch(path, bodyFile, file_list[path]);
                    let encodePath = Huffman.encodeString(patch);
                    let compressPatch = Huffman.compress(encodePatch);
                    let checksum = md5(file_list[path]);

                    //Insert this in database
                    /*
                        const newSection = INSERT INTO CHANGES (commit, parent, checksum, data, huffman_tree, padding)
                        VALUES(${commit_id}, ${to_section}, ${checksum}, ${Buffer.from(compressedPatch.blob)}, 
                        ${JSON.stringify(compressedPatch.tree)}, ${compressedPatch.padding});
                    */

                    //Then 
                    /*
                        UPDATE FILES SET to_section = ? WHERE FILES.repo_id = ? AND FILES.path = ? AND FILES.deleted_in IS NULL
                        VALUES(${newSection.insertId}, ${repo_id}, ${path});
                    */
                }
            }

            //Finally
            /*
                UPDATE REPOSITORY SET head=? WHERE id=?"
                VALUES(${commid_id}, ${repo_id})
            */

            return commit_id;
        }
    }

    patch(from_section, to_section){
        let bodyFile = "";
        while(from_section < to_section){
            //This in database
            /*
                const result = SELECT * FROM CHANGES WHERE parent = ?
                VALUE(from_section);
            */
           let descompressData = Huffman.descompresss(result[0].hoffman_tree, result[0].data, result[0].padding);
           let decodeData = Huffman.decodeString(descompressData);
           bodyFile = diff.applyPatch(bodyFile, decodeData);
           from_section = result[0].change_id;
        }
        console.log(bodyFile);
        return bodyFile;
    }

    areHeadEquals(head, repo_id) {
        //Do this
        /*
            const result = SELECT head FROM REPOSITORY WHERE id = ?
            VALUES(${repo_id});
        */
    
        if(result.length == 0){
            return false;
        }
        return result[0].head == head;
    }
}


