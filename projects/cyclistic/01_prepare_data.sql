CREATE DATABASE cyclistic;


USE cyclistic;


CREATE TABLE trips (
    ride_id VARCHAR(100),
    rideable_type VARCHAR(100),
    started_at DATETIME,
    ended_at DATETIME,
    start_station_name VARCHAR(100),
    start_station_id VARCHAR(100),
    end_station_name VARCHAR(100),
    end_station_id VARCHAR(100),
    start_lat DECIMAL(18 , 16 ),
    start_lng DECIMAL(18 , 16 ),
    end_lat DECIMAL(18 , 16 ),
    end_lng DECIMAL(18 , 16 ),
    member_casual VARCHAR(100)
);
 
 
 -- Load 12 datasets into one table 
LOAD DATA local INFILE '/Users/imatsiuk/Downloads/GDA-cycling/CSV/202306-tripdata.csv' 
INTO TABLE trips
FIELDS OPTIONALLY ENCLOSED BY '"' TERMINATED BY ','
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
( @ride_id , @rideable_type , @started_at , @ended_at , @start_station_name , @start_station_id , @end_station_name , @end_station_id , @start_lat , @start_lng , @end_lat , @end_lng , @member_casual )
SET 
ride_id = NULLIF(@ride_id, ''),
rideable_type= NULLIF(@rideable_type, ''),
started_at= NULLIF(@started_at, ''),
ended_at= NULLIF(@ended_at , ''),
start_station_name= NULLIF(@start_station_name , ''),
start_station_id= NULLIF(@start_station_id , ''),
end_station_name= NULLIF(@end_station_name , ''),
end_station_id= NULLIF(@end_station_id , ''),
start_lat= NULLIF(@start_lat , ''),
start_lng= NULLIF(@start_lng , ''),
end_lat= NULLIF(@end_lat , ''),
end_lng= NULLIF(@end_lng , ''),
member_casual= NULLIF(@member_casual, '');


-- Check columns names and examples of data
SELECT 
    *
FROM
    trips
LIMIT 1;


-- Count total amount of rows 
SELECT 
    COUNT(*) AS total_rows
FROM
    trips;

