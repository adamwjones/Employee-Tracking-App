-- MySQL Workbench Synchronization
-- Generated: 2020-09-22 11:22
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Adam
-- Used the Modeling wizard to set structure of DB

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER TABLE `employeeDB`.`departments` 
DROP COLUMN `id`,
ADD COLUMN `dept_id` INT(11) NOT NULL AUTO_INCREMENT FIRST,
CHANGE COLUMN `name` `name` VARCHAR(30) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`dept_id`);
;

CREATE TABLE IF NOT EXISTS `employeeDB`.`employee` (
    `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
    `role_id` INT(11) NOT NULL,
    `manager_id` INT(11) NULL DEFAULT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`employee_id`),
    INDEX `fk_employee_role1_idx` (`role_id` ASC) VISIBLE,
    CONSTRAINT `fk_employee_role1`
        FOREIGN KEY (`role_id`)
        REFERENCES `employeeDB`.`role` (`role_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `employeeDB`.`role` (
    `role_id` INT(11) NOT NULL AUTO_INCREMENT,
    `dept_id` INT(11) NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (`role_id`),
    INDEX `fk_role_departments1_idx` (`dept_id` ASC) VISIBLE,
    CONSTRAINT `fk_role_departments1`
        FOREIGN KEY (`dept_id`)
        REFERENCES `employeeDB`.`departments` (`dept_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
