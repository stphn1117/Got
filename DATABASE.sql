CREATE DATABASE GOT;
SELECT GOT;

CREATE TABLE REPOSITORIO(
ID INT NOT NULL PRIMARY  KEY,
NOMBRE VARCHAR NOT NULL
);

CREATE TABLE GOTIGNORE(
REPID INT NOT NULL,
FOREIGN KEY (REPID) REFERENCES REPOSITORIO(ID),
FILESTRING VARCHAR NOT NULL);

CREATE TABLE COMMMIT(
ID INT NOT NULL PRIMARY KEY,
REPID INT NOT NULL,
FOREIGN KEY (REPID) REFERENCES REPOSITORIO(ID),
AUTOR VARCHAR NOTNULL,
MENSAJE VARCHAR,
HORA TIME);