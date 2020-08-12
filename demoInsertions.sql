USE GOT;
INSERT INTO REPOSITORIO (nombre)
VALUES ('repo2');


INSERT INTO COMMITS (rep_id, autor, mensaje, hora)
VALUES (
    rep_id:int,
    'autor:varchar',
    'mensaje:varchar',
    'hora:time'
  );

INSERT INTO ARCHIVO (ruta, commit_id, huffman_code, huffman_tree)
VALUES (
    'ruta:varchar',
    commit_id:int,
    'huffman_code:mediumtext',
    'huffman_tree:mediumtext'
  );


INSERT INTO DIFF (commit_id, archivo, diff_output)
VALUES (
    commit_id:int,
    archivo:int,
    'diff_output:text'
  );