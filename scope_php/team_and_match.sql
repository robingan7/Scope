CREATE TABLE teams(
teamnumber VARCHAR(4) NOT NULL,
weightunit VARCHAR(30),
heightunit VARCHAR(30),
weight2 INTEGER(10),
height INTEGER(10),
sensor VARCHAR(30),

autotype VARCHAR(20),
autoabilitycargo VARCHAR(20),
autoabilityhatch VARCHAR(20),
cargolevel VARCHAR(6),
hatchlevel VARCHAR(6),
speed INTEGER(10),
cargopickupspeed VARCHAR(10),
hatchpickupspeed VARCHAR(10),
climbability VARCHAR(6),
stra VARCHAR(50),
driver VARCHAR(50),
question VARCHAR(50),
answer VARCHAR(50),
notes TEXT,

totalcargo INT(5),
totalhatch INT(5),
cargolvl1 INT(5),
cargolvl2 INT(5),
cargolvl3 INT(5),
hatchlvl1 INT(5),
hatchlvl2 INT(5),
hatchlvl3 INT(5),
climbpoint INT(5),
cargoship INT(5),
hatchship INT(5),
autopoints INTEGER(10),
autohatch INT(5),
autocargo INT(11)
)
;

CREATE TABLE matchperformance ( 
    region VARCHAR(40),
    matchnumber INT(3) NOT NULL, 
    teamnumber VARCHAR(4) NOT NULL, 

    alliance VARCHAR(4), 
    exitplatform INT(5),
    totalautopoint INT(5), 
    autohatch INT(5),
    autocargo INT(11),

    cargolvl1 INT(5),
    cargolvl2 INT(5),
    cargolvl3 INT(5),
    hatchlvl1 INT(5),
    hatchlvl2 INT(5),
    hatchlvl3 INT(5),
    
    cargoship INT(5),
    hatchship INT(5),

    defensedrop INT(5),
    defenseblock INT(5),
    
    totalhatch INT(5), 
    totalcargo INT(5), 

    hatchdrop INT(5),
    cargodrop INT(5),
    
    climbpoint INT(5),
    fitness INT(5),
    question VARCHAR(50),
    answer VARCHAR(50),
    notes TEXT

);

CREATE TABLE mediadata
(
    name2 VARCHAR(60),
    teamnumber VARCHAR(5),
    title VARCHAR(255),
    image2 LONGBLOB


);

 CREATE TABLE users
(
    teamnumber VARCHAR(4) NOT NULL,
    password2 VARCHAR(30) NOT NULL
);


/*
INSERT INTO `teams`(`teamnumber`, `image`, `speed`, `weight`, `height`, `matchnumber`, `autopoints`, `teleboxes`, `pickupspeed`, `standing`, `notes`) VALUES (5805,null,12,12,12,121,2,12,12,12,"Very good");
UPDATE `teams` SET `teamnumber`='0000' WHERE teamnumber=0;*/