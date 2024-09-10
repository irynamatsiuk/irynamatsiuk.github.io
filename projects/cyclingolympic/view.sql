-- Creating a VIEW 
-- VIEW with full information about bronze medalist, ordered by nation
-- all 6 tables are joined 

DROP VIEW IF EXISTS bronze_medalists_info;

CREATE VIEW bronze_medalists_info AS
    SELECT 
        n.country AS 'nation',
        c.last_name,
        c.first_name,
        e.name AS 'event_name',
        d.name AS 'discipline'
    FROM
        nation AS n
            JOIN
        competitor AS c ON n.id = nation_id
            JOIN
        winner AS w ON w.competitor_id = c.id
            JOIN
        medal AS m ON w.medal_id = m.id
            JOIN
        event AS e ON w.event_id = e.id
            JOIN
        discipline AS d ON e.discipline_id = d.id
    WHERE
        m.class = 'bronze'
    ORDER BY n.country;

-- Query that returns all information about FEMALE bronze medalists from the view
SELECT 
    *
FROM
    bronze_medalists_info
WHERE
    event_name LIKE '%Women%'
ORDER BY discipline;
