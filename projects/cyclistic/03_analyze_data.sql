-- Count how many trips were made by annual and casual members
SELECT 
    member_casual as membership, COUNT(member_casual) AS total_rides
FROM
    vw_trips
GROUP BY member_casual;


-- Customers bike preferences 
SELECT 
    rideable_type as type,
    COUNT(CASE
        WHEN member_casual = 'member' THEN ride_id
    END) AS member,
    COUNT(CASE
        WHEN member_casual = 'casual' THEN ride_id
    END) AS casual
FROM
    vw_trips
GROUP BY rideable_type;


-- Average trip duration in minutes 
SELECT 
    member_casual as membership,
    ROUND(AVG(ride_length_min), 1) AS duration
FROM
    vw_trips
GROUP BY member_casual;


-- Average trip duration in minutes per type of bike
SELECT 
    rideable_type,
    ROUND(AVG(CASE
                WHEN member_casual = 'member' THEN ride_length_min
            END),
            1) AS member,
    ROUND(AVG(CASE
                WHEN member_casual = 'casual' THEN ride_length_min
            END),
            1) AS casual
FROM
    vw_trips
GROUP BY rideable_type;


-- Number of trips per day of the week
SELECT 
    day_of_week as day,
    COUNT(CASE
        WHEN member_casual = 'member' THEN ride_id
    END) AS member,
    COUNT(CASE
        WHEN member_casual = 'casual' THEN ride_id
    END) AS casual
FROM
    vw_trips
GROUP BY day_of_week
ORDER BY FIELD(day_of_week,
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday');


-- Average trip duration per day of the week
SELECT 
    day_of_week as day,
    ROUND(AVG(CASE
                WHEN member_casual = 'member' THEN ride_length_min
            END),
            1) AS member,
    ROUND(AVG(CASE
                WHEN member_casual = 'casual' THEN ride_length_min
            END),
            1) AS casual
FROM
    vw_trips
GROUP BY day_of_week
ORDER BY FIELD(day_of_week,
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday');


-- Trips count per month
SELECT 
    month,
    COUNT(CASE
        WHEN member_casual = 'member' THEN ride_id
    END) AS member,
    COUNT(CASE
        WHEN member_casual = 'casual' THEN ride_id
    END) AS casual
FROM
    vw_trips
GROUP BY month
ORDER BY STR_TO_DATE(CONCAT('0001', month, '01'), '%Y %M %D');


-- Average trip duration per month
SELECT 
    month,
    ROUND(AVG(CASE
                WHEN member_casual = 'member' THEN ride_length_min
            END),
            1) AS member,
    ROUND(AVG(CASE
                WHEN member_casual = 'casual' THEN ride_length_min
            END),
            1) AS casual
FROM
    vw_trips
GROUP BY month
ORDER BY STR_TO_DATE(CONCAT('0001', month, '01'), '%Y %M %D');


-- Top 5 most populair start stations for members
SELECT 
    start_station_name AS station,
    COUNT(start_station_name) AS trips
FROM
    vw_trips
WHERE
    start_station_name IS NOT NULL
        AND member_casual = 'member'
GROUP BY start_station_name
ORDER BY COUNT(start_station_name) DESC
LIMIT 5;


-- Top 5 most populair start stations for casual
SELECT 
    start_station_name AS station,
    COUNT(start_station_name) AS trips
FROM
    vw_trips
WHERE
    start_station_name IS NOT NULL
        AND member_casual = 'casual'
GROUP BY start_station_name
ORDER BY COUNT(start_station_name) DESC
LIMIT 5;