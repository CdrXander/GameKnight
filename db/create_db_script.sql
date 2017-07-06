-- DELETE DATABASE  =   =   =   =   =   =   =   =   =   =   =
DROP TABLE IF EXISTS public.mechanic_game_link CASCADE;
DROP TABLE IF EXISTS public.game CASCADE;
DROP TABLE IF EXISTS public.mechanic CASCADE;
DROP TABLE IF EXISTS public.genre CASCADE;

DROP SEQUENCE IF EXISTS game_pk CASCADE;
DROP SEQUENCE IF EXISTS mechanic_pk CASCADE;
DROP SEQUENCE IF EXISTS genre_pk CASCADE;


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

-- TEST DATA

-- Genres
INSERT INTO public.genre VALUES (1,'Strategy', 'Games that require Strategic Thought');
INSERT INTO public.genre VALUES (2,'Card','Play with overpriced cardboard');

--  Games

INSERT INTO public.game VALUES (1,999,'Magic: the Gathering', 'A card game of spells and creatures',20,60,3,5,true,'','','',1993,2);
INSERT INTO public.game VALUES (2,998,'Chess','The Game of Kings',10,60,2,2,false,'','','',0,1);
INSERT INTO public.game VALUES (3,997,'Ticket to Ride','Make trains bub',40,60,3,5,true,'','','',2003,1);



