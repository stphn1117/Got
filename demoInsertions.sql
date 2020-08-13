USE GOT;
INSERT INTO REPOSITORIO (nombre)
VALUES ('test');
INSERT INTO COMMITS (rep_id, parent_commit, autor, mensaje)
VALUES (
    1,
    0,
    'test autor',
    'mensaje de commit de test'
  );