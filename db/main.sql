-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kreiDencial
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `kreiDencial` ;

-- -----------------------------------------------------
-- Schema kreiDencial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kreiDencial` DEFAULT CHARACTER SET utf8 ;
USE `kreiDencial` ;

-- -----------------------------------------------------
-- Table `kreiDencial`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kreiDencial`.`User` ;

CREATE TABLE IF NOT EXISTS `kreiDencial`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `matricula` VARCHAR(30) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kreiDencial`.`Evento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kreiDencial`.`Evento` ;

CREATE TABLE IF NOT EXISTS `kreiDencial`.`Evento` (
  `idEvento` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(45) NOT NULL,
  `eventCode` VARCHAR(45) NOT NULL,
  `isActive` TINYINT NOT NULL,
   `points` INT NOT NULL,
  PRIMARY KEY (`idEvento`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `kreiDencial`.`User_has_Evento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kreiDencial`.`User_has_Evento` ;

CREATE TABLE IF NOT EXISTS `kreiDencial`.`User_has_Evento` (
  `User_idUser` INT NOT NULL,
  `Evento_idEvento` INT NOT NULL,
  PRIMARY KEY (`User_idUser`, `Evento_idEvento`),
  INDEX `fk_User_has_Evento_Evento1_idx` (`Evento_idEvento` ASC),
  INDEX `fk_User_has_Evento_User_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Evento_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `kreiDencial`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Evento_Evento1`
    FOREIGN KEY (`Evento_idEvento`)
    REFERENCES `kreiDencial`.`Evento` (`idEvento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
