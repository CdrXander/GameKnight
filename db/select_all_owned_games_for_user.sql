SELECT * FROM game g
JOIN game_catalog_link gcl ON gcl.game_id = g.id
JOIN gk_catalog gc ON gcl.catalog_id = gc.id
WHERE gc.owner_id = $1