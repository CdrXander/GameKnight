INSERT INTO public.mechanic VALUES (1, 'Deck-building', '');
INSERT INTO public.mechanic VALUES (2, 'Cooperative', '');
INSERT INTO public.mechanic VALUES (3, 'Roleplaying', '');

INSERT INTO public.game VALUES (1,991,'Dominion','Let Abby win',40,60,2,4,'','','',2003);
INSERT INTO public.game VALUES (2,992,'Fiasco','The name fits',120,150,3,5,'','','',2013);
INSERT INTO public.game VALUES (3,993,'Mistborn: House War','Are we the baddies?',90,180,3,5,'','','',2017);

INSERT INTO public.game_mechanic_link VALUES (1,1);
INSERT INTO public.game_mechanic_link VALUES (2,2);
INSERT INTO public.game_mechanic_link VALUES (2,3);

--  Create a test user

INSERT INTO public.gk_user VALUES (1,17,'James Raynor', '');
INSERT INTO public.gk_catalog VALUES(2,'James Raynors Games','', 1);
INSERT INTO public.game_catalog_link VALUES (1,2);
INSERT INTO public.game_catalog_link VALUES (3,2);
INSERT INTO public.game_catalog_link VALUES (2,1);

