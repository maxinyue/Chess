    create table Piece (
        id varchar(255) not null,
        color varchar(255),
        obverse boolean,
        indexX integer,
        indexY integer,
        x decimal(19,2),
        y decimal(19,2),
        text varchar(255),
        value integer,
        primary key (id)
    );

INSERT INTO Piece(id,color,obverse,text,value) VALUES ('1','black',false,'将',6);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('2','black',false,'士',5);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('3','black',false,'士',5);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('4','black',false,'象',4);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('5','black',false,'象',4);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('6','black',false,'马',3);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('7','black',false,'马',3);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('8','black',false,'车',2);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('9','black',false,'车',2);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('10','black',false,'炮',1);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('11','black',false,'炮',1);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('12','black',false,'卒',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('13','black',false,'卒',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('14','black',false,'卒',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('15','black',false,'卒',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('16','black',false,'卒',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('17','red',false,'帅',6);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('18','red',false,'士',5);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('19','red',false,'士',5);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('20','red',false,'相',4);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('21','red',false,'相',4);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('22','red',false,'马',3);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('23','red',false,'马',3);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('24','red',false,'车',2);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('25','red',false,'车',2);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('26','red',false,'炮',1);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('27','red',false,'炮',1);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('28','red',false,'兵',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('29','red',false,'兵',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('30','red',false,'兵',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('31','red',false,'兵',0);
INSERT INTO Piece(id,color,obverse,text,value) VALUES ('32','red',false,'兵',0);
