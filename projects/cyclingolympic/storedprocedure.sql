-- Creating stored procedure
-- The stored procedure add_competitor adds a new competitor to competitor table

DROP PROCEDURE IF EXISTS add_competitor;

DELIMITER //
CREATE PROCEDURE add_competitor(
IN id VARCHAR(3),
IN first_name VARCHAR(20),
IN last_name VARCHAR(20),
IN nation_id  VARCHAR(30))
BEGIN 
INSERT INTO competitor(id, first_name, last_name, nation_id)
VALUES (id, first_name, last_name, nation_id);
END//
DELIMITER ;

DELETE FROM competitor 
WHERE
    id = 'c30';

-- Adding new competitor using stored procedure
CALL add_competitor ('c30', 'Jeffrey', 'Hoogland', 'n10');

-- Check if we have Jeffrey Hoogland in the competitor's list
SELECT 
    *
FROM
    competitor
WHERE
    last_name = 'Hoogland';

