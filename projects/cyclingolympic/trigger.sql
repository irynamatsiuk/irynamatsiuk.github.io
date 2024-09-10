-- Creating a trigger
-- font consistency for inserted competitors first- and last- names

DROP TRIGGER IF EXISTS competitor_name_before_insert;

DELIMITER //
CREATE TRIGGER competitor_name_before_insert
BEFORE INSERT on competitor
FOR EACH ROW
BEGIN
SET NEW.first_name = CONCAT(UPPER(SUBSTRING(NEW.first_name,1,1)),
LOWER(SUBSTRING(NEW.first_name FROM 2)));
SET NEW.last_name = CONCAT(UPPER(SUBSTRING(NEW.last_name,1,1)),
LOWER(SUBSTRING(NEW.last_name FROM 2)));
END//
DELIMITER ;

-- Adding 2 new competiotors with font inconsistency
INSERT INTO competitor (
id, first_name, last_name, nation_id)
VALUES
('c31', 'jasoN', 'kEnny', 'n09'),
('c32', 'HARRIE', 'lavreysen', 'n10');

-- Ckecking if the trigger worked
SELECT 
    *
FROM
    competitor
WHERE
    id = 'c31' OR id = 'c32';

DELETE FROM competitor 
WHERE id = 'c31';
    
DELETE FROM competitor 
WHERE id = 'c32';

