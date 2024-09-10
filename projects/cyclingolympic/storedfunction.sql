-- Creating store function 
-- The function 'which_place' depending on the class of received medal gives each competitor a result: 
-- '1st place' for gold, '2nd place' for silver and '3rd place' for bronze.

DROP FUNCTION IF EXISTS which_place;

DELIMITER // 
CREATE FUNCTION which_place (
class VARCHAR(20))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
DECLARE took_place VARCHAR(20);
IF class ='gold' THEN
SET took_place = '1st place';
ELSEIF class = 'silver' THEN
SET took_place = '2nd place';
ELSEIF class = 'bronze' THEN
SET took_place = '3rd place';
END IF;
RETURN (took_place);
END//
DELIMITER ;

-- Query that illustrates how stored function 'which_place' works
-- and returns information about winners, who took 3rd place
SELECT 
    c.last_name,
    c.first_name,
    e.name AS 'event_name',
    d.name AS 'discipline',
    WHICH_PLACE(class) AS result
FROM
    competitor AS c
        JOIN
    winner AS w ON w.competitor_id = c.id
        JOIN
    medal AS m ON w.medal_id = m.id
        JOIN
    event AS e ON w.event_id = e.id
        JOIN
    discipline AS d ON e.discipline_id = d.id
WHERE
    WHICH_PLACE(class) = '3rd place';
