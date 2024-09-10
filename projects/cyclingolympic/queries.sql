-- A list of dutch cyclists at the 2020 Summer Olympics
-- Query with subquery
SELECT 
    c.first_name, c.last_name
FROM
    competitor AS c
WHERE
    c.nation_id IN (SELECT 
            n.id
        FROM
            nation AS n
        WHERE
            n.country = 'Netherlands');


-- Which countries have got 3 or more medals in total? 
-- Query with join, having, group by, order by
SELECT 
    n.country AS nation, COUNT(m.class) AS 'total_medals'
FROM
    nation AS n
        JOIN
    competitor AS c ON c.nation_id = n.id
        JOIN
    winner AS w ON c.id = w.competitor_id
        JOIN
    medal AS m ON w.medal_id = m.id
GROUP BY n.country
HAVING COUNT(m.class) >= 3
ORDER BY total_medals DESC;