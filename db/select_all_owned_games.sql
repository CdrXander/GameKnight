SELECT * FROM game g
JOIN game_catalog_link gcl ON gcl.game_id = g.id
WHERE gcl.user_id != 7
