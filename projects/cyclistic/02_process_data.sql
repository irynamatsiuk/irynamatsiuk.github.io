-- Check if there are any duplicates
SELECT 
    ride_id, COUNT(ride_id) AS count
FROM
    trips
GROUP BY ride_id
HAVING (count > 1);
# 0 row(s) returned


-- Another way to get data without duplicates
SELECT DISTINCT
    *
FROM
    cyclistic.trips;	
# 5779444 row(s) returned that equals total number of rows in combined dataset


-- Count total rows, total rows with missing values, their difference and percentage  
SELECT 
    t.total_rows,
    t.total_missing,
    (t.total_rows - t.total_missing) AS difference,
    (t.total_missing / t.total_rows * 100) AS percent
FROM
    (SELECT 
        COUNT(*) AS total_rows,
            (SELECT 
                    COUNT(ride_id)
                FROM
                    trips
                WHERE
                    ride_id IS NULL 
						OR rideable_type IS NULL
                        OR started_at IS NULL
                        OR ended_at IS NULL
                        OR start_station_name IS NULL
                        OR start_station_id IS NULL
                        OR end_station_name IS NULL
                        OR end_station_id IS NULL
                        OR start_lat IS NULL
                        OR start_lng IS NULL
                        OR end_lat IS NULL
                        OR end_lng IS NULL
                        OR member_casual IS NULL) AS total_missing
    FROM
        trips) AS t;
# More than 23% of rows have missing values


-- Count total missing values per column
SELECT 
    COUNT(*) - COUNT(ride_id) AS ride_id,
    COUNT(*) - COUNT(rideable_type) AS rideable_type,
    COUNT(*) - COUNT(started_at) AS started_at,
    COUNT(*) - COUNT(ended_at) AS ended_at,
    COUNT(*) - COUNT(start_station_name) AS start_station_name,
    COUNT(*) - COUNT(start_station_id) AS start_station_id,
    COUNT(*) - COUNT(end_station_name) AS end_station_name,
    COUNT(*) - COUNT(end_station_id) AS end_station_id,
    COUNT(*) - COUNT(start_lat) AS start_lat,
    COUNT(*) - COUNT(start_lng) AS start_lng,
    COUNT(*) - COUNT(end_lat) AS end_lat,
    COUNT(*) - COUNT(end_lng) AS end_lat,
    COUNT(*) - COUNT(member_casual) AS member_casual
FROM
    trips;
# Missing values have 6 columns: start_station_name, start_station_id, end_station_name, end_station_id, end_lat, end_lat


-- Check if all dates are in the correct range of time
SELECT 
    *
FROM
    trips
WHERE
    started_at >= '2022-07-01 00:00:00'
        AND started_at <= '2023-06-30 23:59:59';
# 5779444 row(s) returned that equals total number of rows in combined dataset


-- How many trips are shorter than 1 minute
SELECT 
    COUNT(*) AS shorter_1_min
FROM
    trips
WHERE
    TIMESTAMPDIFF(MINUTE,
        started_at,
        ended_at) < 1;
# shorter_1_min = 149372


-- And longer than 48 hours (weekend)
SELECT 
    COUNT(*) AS longer_48_hour
FROM
    trips
WHERE
    TIMESTAMPDIFF(MINUTE,
        started_at,
        ended_at) > 2880;
# longer_48_hour = 1194


-- Create a view with extra columns: ride length in minutes, day of week, month 
-- and with exception of trips that have duration shorter than 1 minute and longer than 48 hours
CREATE VIEW vw_trips AS
    SELECT 
        *,
        TIMESTAMPDIFF(MINUTE,
            started_at,
            ended_at) AS ride_length_min,
        DAYNAME(started_at) AS day_of_week,
        MONTHNAME(started_at) AS month
    FROM
        trips
    WHERE
        TIMESTAMPDIFF(MINUTE,
            started_at,
            ended_at) > 1
            AND TIMESTAMPDIFF(MINUTE,
            started_at,
            ended_at) < 2880;