    create table ChessBoard (
        id varchar(255) not null,
        horizonNumber integer,
        verticalNumber integer,
        spacing integer,
        padding integer,
        x integer,
        y integer,
        primary key (id)
    );

INSERT INTO ChessBoard VALUES ('1',9,5,50,40,80,80);

