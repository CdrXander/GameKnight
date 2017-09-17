SELECT g.id, g.bgg_game_id, g.name, g.description, g.time_short, g.time_long, g.min_players,
g.max_players, g.amazon_link, g.image_url,g.thumbnail_url,g.publish_year FROM game g
JOIN game_catalog_link gcl ON gcl.game_id = g.id
JOIN gk_catalog gc ON gcl.catalog_id = gc.id
WHERE gc.owner_id != 7
