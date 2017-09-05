-- DROP TABLES
DROP TABLE IF EXISTS invite;
DROP TABLE IF EXISTS game_night;
DROP TABLE IF EXISTS game_gk_catalog_link;
DROP TABLE IF EXISTS gk_catalog;
DROP TABLE IF EXISTS game_genre_link;
DROP TABLE IF EXISTS game_mechanic_link;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS mechanic;
DROP TABLE IF EXISTS gk_user;
DROP TABLE IF EXISTS game;

-- DROP SEQUENCES

DROP SEQUENCE IF EXISTS game_night_pk;
DROP SEQUENCE IF EXISTS gk_catalog_pk;
DROP SEQUENCE IF EXISTS genre_pk;
DROP SEQUENCE IF EXISTS mechanic_pk;
DROP SEQUENCE IF EXISTS gk_user_pk;
DROP SEQUENCE IF EXISTS game_pk;

-- CREATE SEQUENCES
CREATE SEQUENCE public.game_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.gk_user_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.mechanic_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.genre_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.gk_catalog_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.game_night_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

-- CREATE TABLES

-- BUILD ORDER
-- game, user, mechanic, genre
-- game_mechanic_link, game_genre_link
-- gk_catalog
-- game_gk_catalog_link
-- game_night, invite

CREATE TABLE public.game
(
	id integer NOT NULL DEFAULT nextval('game_pk'),
	bgg_game_id integer,
	name text,
	description text,
	time_short integer,
	time_long integer,
	min_players integer,
	max_players integer,
	amazon_link text,
	image_url text,
	thumbnail_url text,
	publish_year integer,
	PRIMARY KEY (id)
);

CREATE TABLE public.gk_user
(
	id integer NOT NULL DEFAULT nextval('gk_user_pk'),
	fb_id text,
	display_name text,
	picture_url text,
	PRIMARY KEY (id)
);

CREATE TABLE public.mechanic
(
	id integer NOT NULL DEFAULT nextval('mechanic_pk'),
	name text,
	description text,
	PRIMARY KEY (id)
);

CREATE TABLE public.genre
(
	id integer,
	name text,
	description text,
	PRIMARY KEY (id)
);

CREATE TABLE public.game_mechanic_link
(
    game_id integer,
    mechanic_id integer,
    PRIMARY KEY (game_id, mechanic_id),
    FOREIGN KEY (game_id) REFERENCES public.game (id),
    FOREIGN KEY (mechanic_id) REFERENCES public.mechanic (id)
);


CREATE TABLE public.game_genre_link
(
    game_id integer,
    genre_id integer,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES public.game (id),
    FOREIGN KEY (genre_id) REFERENCES public.genre (id)
);

CREATE TABLE public.gk_catalog
(
	id integer NOT NULL DEFAULT nextval('gk_catalog_pk'),
	name text,
	description text,
	owner_id integer,
	PRIMARY KEY (id),
	FOREIGN KEY (owner_id) REFERENCES public.gk_user(id)
);

CREATE TABLE public.game_gk_catalog_link
(
    game_id integer,
    gk_catalog_id integer,
    PRIMARY KEY (game_id, gk_catalog_id),
    FOREIGN KEY (game_id) REFERENCES public.game (id),
    FOREIGN KEY (gk_catalog_id) REFERENCES public.gk_catalog (id)
);

CREATE TABLE public.game_night
(
	id integer NOT NULL DEFAULT nextval('game_night_pk'),
	address text,
	date_time timestamp,
	PRIMARY KEY (id)
);

CREATE TABLE public.invite
(
	game_night_id integer,
	user_id integer,
	attending boolean,
	host boolean,
	PRIMARY KEY (game_night_id, user_id),
	FOREIGN KEY (game_night_id) REFERENCES public.game_night(id),
	FOREIGN KEY (user_id) REFERENCES public.gk_user(id)
);

-- Create the dummy user for the "Wanted" catalog, and the wanted Catalog

INSERT INTO public.gk_user VALUES (7,0,'The Game Knight', '');
INSERT INTO public.gk_catalog VALUES(1,'Wanted Games', 7);