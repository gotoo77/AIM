SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema AIMdb
-- -----------------------------------------------------
-- Ceci represente la BDD du service AIM
DROP SCHEMA IF EXISTS `AIMdb` ;
CREATE SCHEMA IF NOT EXISTS `AIMdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
-- -----------------------------------------------------
-- Schema AIMdb_TEST
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `AIMdb_TEST` ;
CREATE SCHEMA IF NOT EXISTS `AIMdb_TEST` ;
USE `AIMdb` ;

-- -----------------------------------------------------
-- Table `AIMdb`.`MAP_FILE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`MAP_FILE` (
  `id_MAP_FILE` INT NOT NULL,
  `MF_Type` INT NULL,
  `MF_Path` VARCHAR(200) NULL,
  PRIMARY KEY (`id_MAP_FILE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`FLIGHT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`FLIGHT` (
  `idFlight` INT NOT NULL,
  `F_DepartureTime` DATETIME NOT NULL,
  `F_ArrivalTime` DATETIME NOT NULL,
  `F_ETA` TIME NULL,
  `F_DepartureAirport` VARCHAR(45) NOT NULL,
  `F_ArrivalAirport` VARCHAR(45) NOT NULL,
  `F_ArrivalAirportMap` INT NOT NULL,
  `F_TagName` VARCHAR(45) NOT NULL,
  `F_Plane` VARCHAR(45) NOT NULL,
  `F_TotalDistance` INT NOT NULL,
  `F_RemainingDistance` INT NOT NULL,
  `F_Altitude` INT NOT NULL,
  `F_Speed` INT NOT NULL,
  PRIMARY KEY (`idFlight`, `F_ArrivalAirportMap`),
  INDEX `fk_FLIGHT_MAP_FILE1_idx` (`F_ArrivalAirportMap` ASC),
  CONSTRAINT `fk_FLIGHT_MAP_FILE1`
    FOREIGN KEY (`F_ArrivalAirportMap`)
    REFERENCES `AIMdb`.`MAP_FILE` (`id_MAP_FILE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`TYPE_SERVICE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`TYPE_SERVICE` (
  `id_type_service` INT NOT NULL AUTO_INCREMENT,
  `S_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_type_service`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`SERVICES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`SERVICES` (
  `id_services` INT NOT NULL AUTO_INCREMENT,
  `Se_name` VARCHAR(100) NULL,
  `Se_description` VARCHAR(255) NULL,
  `Se_estimatedCost` FLOAT NULL,
  `Se_Contact` VARCHAR(45) NULL,
  `TYPE_SERVICE_id_type_service` INT NOT NULL,
  PRIMARY KEY (`id_services`, `TYPE_SERVICE_id_type_service`),
  INDEX `fk_SERVICES_TYPE_SERVICE1_idx` (`TYPE_SERVICE_id_type_service` ASC),
  CONSTRAINT `fk_SERVICES_TYPE_SERVICE1`
    FOREIGN KEY (`TYPE_SERVICE_id_type_service`)
    REFERENCES `AIMdb`.`TYPE_SERVICE` (`id_type_service`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`TYPE_ENSEIGNE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`TYPE_ENSEIGNE` (
  `id_type_enseigne` INT NOT NULL AUTO_INCREMENT,
  `Te_name` VARCHAR(100) NULL,
  PRIMARY KEY (`id_type_enseigne`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`ENSEIGNES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`ENSEIGNES` (
  `id_enseigne` INT NOT NULL,
  `E_name` VARCHAR(45) NULL,
  `E_description` VARCHAR(255) NULL,
  `POI_Coord_x_pos` INT NULL,
  `POI_Coord_y_pos` INT NULL,
  `POI_Coord_z_pos` INT NULL,
  `TYPE_ENSEIGNE_id_type_enseigne` INT NOT NULL,
  PRIMARY KEY (`id_enseigne`, `TYPE_ENSEIGNE_id_type_enseigne`),
  INDEX `fk_ENSEIGNES_TYPE_ENSEIGNE1_idx` (`TYPE_ENSEIGNE_id_type_enseigne` ASC),
  CONSTRAINT `fk_ENSEIGNES_TYPE_ENSEIGNE1`
    FOREIGN KEY (`TYPE_ENSEIGNE_id_type_enseigne`)
    REFERENCES `AIMdb`.`TYPE_ENSEIGNE` (`id_type_enseigne`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`POI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`POI` (
  `id_POI` INT NOT NULL,
  `POI_Type` INT NOT NULL,
  `POI_NOM` VARCHAR(50) NULL,
  `POI_Coord_x_pos` INT NULL,
  `POI_Coord_y_pos` INT NULL,
  `POI_Coord_z_pos` INT NULL,
  `SERVICES_id_services` INT NOT NULL,
  `SERVICES_TYPE_SERVICE_id_type_service` INT NOT NULL,
  `ENSEIGNES_id_enseigne` INT NOT NULL,
  `ENSEIGNES_TYPE_ENSEIGNE_id_type_enseigne` INT NOT NULL,
  PRIMARY KEY (`id_POI`, `POI_Type`, `SERVICES_id_services`, `SERVICES_TYPE_SERVICE_id_type_service`, `ENSEIGNES_id_enseigne`, `ENSEIGNES_TYPE_ENSEIGNE_id_type_enseigne`),
  INDEX `fk_POI_SERVICES1_idx` (`SERVICES_id_services` ASC, `SERVICES_TYPE_SERVICE_id_type_service` ASC),
  INDEX `fk_POI_ENSEIGNES1_idx` (`ENSEIGNES_id_enseigne` ASC, `ENSEIGNES_TYPE_ENSEIGNE_id_type_enseigne` ASC),
  CONSTRAINT `fk_POI_SERVICES1`
    FOREIGN KEY (`SERVICES_id_services` , `SERVICES_TYPE_SERVICE_id_type_service`)
    REFERENCES `AIMdb`.`SERVICES` (`id_services` , `TYPE_SERVICE_id_type_service`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_POI_ENSEIGNES1`
    FOREIGN KEY (`ENSEIGNES_id_enseigne` , `ENSEIGNES_TYPE_ENSEIGNE_id_type_enseigne`)
    REFERENCES `AIMdb`.`ENSEIGNES` (`id_enseigne` , `TYPE_ENSEIGNE_id_type_enseigne`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`MAP`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`MAP` (
  `id_MAP` INT NOT NULL,
  `POI_id_POI` INT NOT NULL,
  `POI_POI_Type` INT NOT NULL,
  `SERVICE_INFO_id_ServiceInfo` INT NOT NULL,
  `MAP_Name` VARCHAR(50) NULL,
  `MAP_id_MAP` INT NOT NULL,
  `MAP_POI_id_POI` INT NOT NULL,
  `MAP_POI_POI_Type` INT NOT NULL,
  `MAP_SERVICE_INFO_id_ServiceInfo` INT NOT NULL,
  PRIMARY KEY (`id_MAP`, `POI_id_POI`, `POI_POI_Type`, `SERVICE_INFO_id_ServiceInfo`, `MAP_id_MAP`, `MAP_POI_id_POI`, `MAP_POI_POI_Type`, `MAP_SERVICE_INFO_id_ServiceInfo`),
  INDEX `fk_MAP_POI1_idx` (`POI_id_POI` ASC, `POI_POI_Type` ASC),
  INDEX `fk_MAP_MAP1_idx` (`MAP_id_MAP` ASC, `MAP_POI_id_POI` ASC, `MAP_POI_POI_Type` ASC, `MAP_SERVICE_INFO_id_ServiceInfo` ASC),
  CONSTRAINT `fk_MAP_POI1`
    FOREIGN KEY (`POI_id_POI` , `POI_POI_Type`)
    REFERENCES `AIMdb`.`POI` (`id_POI` , `POI_Type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MAP_MAP1`
    FOREIGN KEY (`MAP_id_MAP` , `MAP_POI_id_POI` , `MAP_POI_POI_Type` , `MAP_SERVICE_INFO_id_ServiceInfo`)
    REFERENCES `AIMdb`.`MAP` (`id_MAP` , `POI_id_POI` , `POI_POI_Type` , `SERVICE_INFO_id_ServiceInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`AIRPORT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`AIRPORT` (
  `id_Airport` INT NOT NULL,
  `A_Description` VARCHAR(50) NULL,
  `MAP_id_MAP` INT NOT NULL,
  `A_Name` VARCHAR(50) NULL,
  `A_Country` VARCHAR(50) NULL,
  `A_Address` VARCHAR(50) NULL,
  PRIMARY KEY (`id_Airport`, `MAP_id_MAP`),
  INDEX `fk_AIRPORT_MAP1_idx` (`MAP_id_MAP` ASC),
  CONSTRAINT `fk_AIRPORT_MAP1`
    FOREIGN KEY (`MAP_id_MAP`)
    REFERENCES `AIMdb`.`MAP` (`id_MAP`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`RULES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb`.`RULES` (
  `id_Rule` INT NOT NULL,
  `HS_Name` VARCHAR(45) NULL,
  `HS_Description` TEXT NULL,
  PRIMARY KEY (`id_Rule`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AIMdb`.`wines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AIMdb_TEST`.`wines` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `year` VARCHAR(45) NULL,
  `grapes` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `region` VARCHAR(45) NULL,
  `description` VARCHAR(280) NULL,
  `picture` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `AIMdb_TEST`.`airports`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `AIMdb_TEST`.`airports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NULL,
  `description` VARCHAR(200) NULL,
  `picture` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

USE `AIMdb_TEST` ;
-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- INSERT VALUES in TABLE `AIMdb_TEST`.`airports`
-- -----------------------------------------------------
INSERT INTO airports (name,country,description,picture) VALUES (
"airport_CDG1",
"France",
"Plans de l’aéroport Paris-Charles de Gaulle -ETAGE 1
<a href='http://www.w3schools.com/'>Visit W3Schools</a>",
"CDG_T1_Level1.png"
);
INSERT INTO airports (name,country,description,picture) VALUES (
"airport_CDG2",
"France",
"Plans de l’aéroport Paris-Charles de Gaulle -ETAGE 2
<a href='http://www.w3schools.com/'>Visit W3Schools</a>",
"CDG_T1_Level2.png"
);
INSERT INTO airports (name,country,description,picture) VALUES (
"airport_CDG3",
"France",
"Plans de l’aéroport Paris-Charles de Gaulle -ETAGE 3
<a href='http://www.w3schools.com/'>Visit W3Schools</a>",
"CDG_T1_Level3.png"
);
INSERT INTO airports (name,country,description,picture) VALUES (
"airport_CDG4",
"France",
"Plans de l’aéroport Paris-Charles de Gaulle -ETAGE 4
<a href='http://www.w3schools.com/'>Visit W3Schools</a>",
"CDG_T1_Level4.png"
);

-- -----------------------------------------------------
-- INSERT VALUES in TABLE `AIMdb_TEST`.`wines`
-- ----------------------------------------------------
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"CHATEAU DE SAINT COSME","2009","Grenache / Syrah","France","Southern Rhone","The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.","saint_cosme.jpg");
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"LAN RIOJA CRIANZA",
"2006",
"Tempranillo",
"Spain",
"Rioja",
"A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.",
"lan_rioja.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"MARGERUM SYBARITE",
"2010",
"Sauvignon Blanc",
"USA",
"California Central Cosat",
"The cache of a fine Cabernet in ones wine cellar can now be replaced with a childishly playful wine bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
"margerum.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"OWEN ROE \"EX UMBRIS\"",
"2009",
"Syrah",
"USA",
"Washington",
"A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
"ex_umbris.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"REX HILL",
"2009",
"Pinot Noir",
"USA",
"Oregon",
"One cannot doubt that this will be the wine served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
"rex_hill.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
 "VITICCIO CLASSICO RISERVA",
 "2007",
 "Sangiovese Merlot",
 "Italy",
 "Tuscany",
 "Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
 "viticcio.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"CHATEAU LE DOYENNE",
"2005",
"Merlot",
"France",
"Bordeaux",
"Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
"le_doyenne.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"DOMAINE DU BOUSCAT",
"2009",
"Merlot",
"France",
"Bordeaux",
"The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
"bouscat.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"BLOCK NINE",
"2009",
"Pinot Noir",
"USA",
"California",
"With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.",
"block_nine.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"DOMAINE SERENE",
"2007",
"Pinot Noir",
"USA",
"Oregon",
"Though subtle in its complexities, this wine is sure to please a wide range of enthusiasts. Notes of pomegranate will delight as the nutty finish completes the picture of a fine sipping experience.",
"domaine_serene.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"BODEGA LURTON",
"2011",
"Pinot Gris",
"Argentina",
"Mendoza",
"Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
"bodega_lurton.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"LES MORIZOTTES",
"2009",
"Chardonnay",
"France",
"Burgundy",
"Breaking the mold of the classics, this offering will surprise and undoubtedly get tongues wagging with the hints of coffee and tobacco in perfect alignment with more traditional notes. Sure to please the late-night crowd with the slight jolt of adrenaline it brings.",
"morizottes.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"ARGIANO NON CONFUNDITUR",
"2009",
"Cabernet Sauvignon",
"Italy",
"Tuscany",
"Like a symphony, this cabernet has a wide range of notes that will delight the taste buds and linger in the mind.",
"argiano.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"DINASTIA VIVANCO ",
"2008",
"Tempranillo",
"Spain",
"Rioja",
"Whether enjoying a fine cigar or a nicotine patch, don't pass up a taste of this hearty Rioja, both smooth and robust.",
"dinastia.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"PETALOS BIERZO",
"2009",
"Mencia",
"Spain",
"Castilla y Leon",
"For the first time, a blend of grapes from two different regions have been combined in an outrageous explosion of flavor that cannot be missed.",
"petalos.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"SHAFER RED SHOULDER RANCH",
"2009",
"Chardonnay",
"USA",
"California",
"Keep an eye out for this winery in coming years, as their chardonnays have reached the peak of perfection.",
"shafer.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"PONZI",
"2010",
"Pinot Gris",
"USA",
"Oregon",
"For those who appreciate the simpler pleasures in life, this light pinot grigio will blend perfectly with a light meal or as an after dinner drink.",
"ponzi.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"HUGEL",
"2010",
"Pinot Gris",
"France",
"Alsace",
"Fresh as new buds on a spring vine, this dewy offering is the finest of the new generation of pinot grigios.  Enjoy it with a friend and a crown of flowers for the ultimate wine tasting experience.",
"hugel.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"FOUR VINES MAVERICK",
"2011",
"Zinfandel",
"USA",
"California",
"o yourself a favor and have a bottle (or two) of this fine zinfandel on hand for your next romantic outing.  The only thing that can make this fine choice better is the company you share it with.",
"fourvines.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"QUIVIRA DRY CREEK VALLEY",
"2009",
"Zinfandel",
"USA",
"California",
"Rarely do you find a zinfandel this oakey from the Sonoma region. The vintners have gone to extremes to duplicate the classic flavors that brought high praise in the early '90s.",
"quivira.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"CALERA 35TH ANNIVERSARY",
"2010",
"Pinot Noir",
"USA",
"California",
"Fruity and bouncy, with a hint of spice, this pinot noir is an excellent candidate for best newcomer from Napa this year.",
"calera.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"CHATEAU CARONNE STE GEMME",
"2010",
"Cabernet Sauvignon",
"France",
"Bordeaux",
"Find a sommelier with a taste for chocolate and he's guaranteed to have this cabernet on his must-have list.",
"caronne.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"MOMO MARLBOROUGH",
"2010",
"Sauvignon Blanc",
"New Zealand",
"South Island",
"Best served chilled with melon or a nice salty prosciutto, this sauvignon blanc is a staple in every Italian kitchen, if not on their wine list.  Request the best, and you just may get it.",
"momo.jpg"
);
INSERT INTO wines (`name`,  `year`,  `grapes`,  `country`,  `region`,  `description`,  `picture`) VALUES (
"WATERBROOK",
"2009",
"Merlot",
"USA",
"Washington",
"Legend has it the gods didn't share their ambrosia with mere mortals.  This merlot may be the closest we've ever come to a taste of heaven.",
"waterbrook.jpg"
);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
