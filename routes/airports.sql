DROP TABLE IF EXISTS `airports` ;

-- -----------------------------------------------------
-- Table `aimdb`.`airports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aimdb`.`airports` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `picture` VARCHAR(45) NOT NULL,
  `zip_code` VARCHAR(200) NOT NULL,
  `phone_contact` VARCHAR(30) NULL,
  `nb_terminal` TINYINT NOT NULL,
  `terminals_id` INT(11) NULL,
  `flag_css_class` VARCHAR(30) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_airports_terminals1_idx` (`terminals_id` ASC),
  CONSTRAINT `fk_airports_terminals1`
    FOREIGN KEY (`terminals_id`)
    REFERENCES `aimdb`.`terminals` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- INSERT VALUES in TABLE `aimdb`.`airports`
-- -----------------------------------------------------
INSERT INTO `aimdb`.`airports` (name,country,city,description,picture, zip_code, phone_contact, nb_terminal,flag_css_class) VALUES (
"airport_CDG",
"France",
"Roissy-en-France",
"Aeroport Paris Charles de Gaulle",
"CDG_view.png",
"95700 ",
"01 70 36 39 50",
8,
"flag-fr"
);
INSERT INTO `aimdb`.`airports` (name,country,city,description,picture, zip_code,phone_contact, nb_terminal,flag_css_class) VALUES (
"airport_ORLY",
"France",
"Orly",
"Aeroport PAris Orly",
"ORLY_view.png",
"94390",
"0 892 56 39 50",
2,
"flag-fr"
);

INSERT INTO `aimdb`.`airports` (name,country,city,description,picture, zip_code, phone_contact,nb_terminal,flag_css_class) VALUES (
"airport_TLS_BLA",
"France",
"Toulouse",
"Aeroport Toulouse Blagnac",
"TLS_BLA_view.png",
"31703",
"0 825 38 00 00",
1,
"flag-fr"
);

INSERT INTO `aimdb`.`airports` (name,country,city,description,picture, zip_code, phone_contact, nb_terminal,flag_css_class) VALUES (
"Airport_Melbourne_VICTOIA ",
"Australia",
"Melbourne",
"Melbourne Airport Victoria",
"MEL_VIC_view.png",
"3045",
"+61 3 9297 1600",
4,
"flag-au"
);

SELECT * FROM `aimdb`.`airports`;