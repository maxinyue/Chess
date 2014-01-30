    create table Piece (
        id varchar(255) not null,
        color varchar(255),
        obverse boolean,
        indexX integer,
        indexY integer,
        x decimal(19,2),
        y decimal(19,2),
        text varchar(255),
        value varchar(255),
        primary key (id)
    );

insert into Piece values ('1','red',false,1,1,1,1,'马',1);