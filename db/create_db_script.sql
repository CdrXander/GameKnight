-- DELETE DATABASE  =   =   =   =   =   =   =   =   =   =   =
DROP TABLE IF EXISTS mechanic_game_link;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS mechanic;
DROP TABLE IF EXISTS genre;

-- CREATE DATABASE  =   =   =   =   =   =   =   =   =   =   =

-- Sequences

CREATE SEQUENCE public.genre_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.mechanic_pk
    INCREMENT BY 1
    START WITH 100
    MINVALUE 1
;

CREATE SEQUENCE public.game_pk
    INCREMENT 1
    START WITH 100
    MINVALUE 1
;

-- Tables

CREATE TABLE public.genre
(
    id integer NOT NULL DEFAULT nextval('genre_pk'),
    title text,
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE public.mechanic
(
    id integer NOT NULL DEFAULT nextval('mechanic_pk'),
    title text,
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE public.game
(
    id integer NOT NULL DEFAULT nextval('game_pk'),
    bgg_game_id integer,
    title text,
    description text,
    time_short integer,
    time_long integer,
    min_players integer,
    max_players integer,
    owned boolean,
    amazon_link text,
    image_url text,
    thumbnail_url text,
    publish_year integer,
    genre_id integer,
    PRIMARY KEY (id),
    FOREIGN KEY (genre_id) REFERENCES public.genre (id)
);

CREATE TABLE public.mechanic_game_link
(
    game_id integer,
    mechanic_id integer,
    PRIMARY KEY (game_id, mechanic_id),
    FOREIGN KEY (game_id) REFERENCES public.game (id),
    FOREIGN KEY (mechanic_id) REFERENCES public.mechanic (id)
);
