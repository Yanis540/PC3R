--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Chat; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4troqx0000113lo5g6np5k', '2024-03-24 07:03:52', 'Paris (75000-75116) - Cité Universitaire (Paris)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4tros40002113l73s8gsh9', '2024-03-24 07:03:52', 'Cité Universitaire (Paris) - Massy - Palaiseau (Massy)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trosc0004113lsg56no06', '2024-03-24 07:17:42', 'Massy - Palaiseau (Massy) - Massy TGV (Massy)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trosk0006113lnhye4cep', '2024-03-24 07:25:30', 'Massy TGV (Massy) - Lyon Part Dieu (Lyon)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trosq0008113lpjqvd1ve', '2024-03-24 09:30:00', 'Lyon Part Dieu (Lyon) - Lyon', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trosw000a113lvkp98rfh', '2024-03-24 07:51:00', 'Paris (75000-75116) - Paris - Gare de Lyon - Hall 1 & 2 (Paris)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trot3000c113ld3xj7l65', '2024-03-24 07:51:00', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris) - Lyon Part Dieu (Lyon)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu4trot8000e113lh0q48lzb', '2024-03-24 09:49:00', 'Lyon Part Dieu (Lyon) - Lyon', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu64gib90000xlp8zin04s75', '2024-03-25 05:51:00', 'Paris (75000-75116) - Paris - Gare de Lyon - Hall 1 & 2 (Paris)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu64gis90002xlp88b283t23', '2024-03-25 05:51:00', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris) - Lyon Part Dieu (Lyon)', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('clu64gist0004xlp8jj0gcdth', '2024-03-25 07:56:00', 'Lyon Part Dieu (Lyon) - Lyon', 'https://github.com/shadcn.png', 'trip');
INSERT INTO public."Chat" (id, date, name, photo, type) VALUES ('cluovbpmz00006co2r3b3waik', '2024-04-07 01:51:58.858', 'cltuva3xs0000tn3vhv5oc13p-clu6a4men0006xlp8aapy1ydk', 'https://github.com/shadcn.png', 'duo');


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, name, email, "createdAt", "updatedAt", password, photo) VALUES ('clu6a4men0006xlp8aapy1ydk', 'yanis', 'yanis@gmail.com', '2024-03-25 01:38:44.974', '2024-03-25 01:38:44.974', 'yanis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png');
INSERT INTO public."User" (id, name, email, "createdAt", "updatedAt", password, photo) VALUES ('cltuva3xs0000tn3vhv5oc13p', 'Yanis', 'yanistabellout4@gmail.com', '2024-03-17 01:57:38.801', '2024-03-26 23:34:20.212', 'yanis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png');


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluh4h0j20000q7yjmq2jf3vd', 'Hi Mom', '2024-04-01 15:45:53.384', '2024-04-01 15:45:53.384', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj0pcon00001498epatrjxk', 'hi', '2024-04-02 23:35:56.28', '2024-04-02 23:35:56.28', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj2mg600000wntxqz0snt5g', 'hilaw', '2024-04-03 00:29:39.998', '2024-04-03 00:29:39.998', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj2p3310001wntxk2ceee1q', 'hi', '2024-04-03 00:31:43.07', '2024-04-03 00:31:43.07', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj2pxkw0002wntx0xe81smf', 'hiiiiii', '2024-04-03 00:32:22.592', '2024-04-03 00:32:22.592', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj2q1ak0003wntxuehzy691', 'x)', '2024-04-03 00:32:27.404', '2024-04-03 00:32:27.404', 'clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."Message" (id, content, created_at, updated_at, chat_id, user_id) VALUES ('cluj2ri9d0004wntxdvkhgy15', 'mdr', '2024-04-03 00:33:36.05', '2024-04-03 00:33:36.05', 'clu4troqx0000113lo5g6np5k', 'clu6a4men0006xlp8aapy1ydk');


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trora0001113lecqhhgqe', 'clu4troqx0000113lo5g6np5k', '2024-03-24 07:03:52', '2024-03-24 07:03:52', 'Paris (75000-75116)', 'Cité Universitaire (Paris)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4tros60003113l1ter9ynm', 'clu4tros40002113l73s8gsh9', '2024-03-24 07:03:52', '2024-03-24 07:17:42', 'Cité Universitaire (Paris)', 'Massy - Palaiseau (Massy)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trose0005113l45yjl9i4', 'clu4trosc0004113lsg56no06', '2024-03-24 07:17:42', '2024-03-24 07:20:19', 'Massy - Palaiseau (Massy)', 'Massy TGV (Massy)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trosl0007113lgbfm5lbz', 'clu4trosk0006113lnhye4cep', '2024-03-24 07:25:30', '2024-03-24 09:30:00', 'Massy TGV (Massy)', 'Lyon Part Dieu (Lyon)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trosr0009113lq3ec29g6', 'clu4trosq0008113lpjqvd1ve', '2024-03-24 09:30:00', '2024-03-24 09:30:00', 'Lyon Part Dieu (Lyon)', 'Lyon');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trosx000b113lxtqpzuqu', 'clu4trosw000a113lvkp98rfh', '2024-03-24 07:51:00', '2024-03-24 07:51:00', 'Paris (75000-75116)', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trot4000d113lxmpudu5u', 'clu4trot3000c113ld3xj7l65', '2024-03-24 07:51:00', '2024-03-24 09:49:00', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris)', 'Lyon Part Dieu (Lyon)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu4trot9000f113l0hqox9i2', 'clu4trot8000e113lh0q48lzb', '2024-03-24 09:49:00', '2024-03-24 09:49:00', 'Lyon Part Dieu (Lyon)', 'Lyon');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu64gimg0001xlp84o4pjyng', 'clu64gib90000xlp8zin04s75', '2024-03-25 05:51:00', '2024-03-25 05:51:00', 'Paris (75000-75116)', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu64gisg0003xlp80ps4zrlz', 'clu64gis90002xlp88b283t23', '2024-03-25 05:51:00', '2024-03-25 07:56:00', 'Paris - Gare de Lyon - Hall 1 & 2 (Paris)', 'Lyon Part Dieu (Lyon)');
INSERT INTO public."Trip" (id, chat_id, departure_time, estimated_arrival_time, "from", "to") VALUES ('clu64gisw0005xlp8vosfrxza', 'clu64gist0004xlp8jj0gcdth', '2024-03-25 07:56:00', '2024-03-25 07:56:00', 'Lyon Part Dieu (Lyon)', 'Lyon');


--
-- Data for Name: _ChatToUser; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."_ChatToUser" ("A", "B") VALUES ('clu4troqx0000113lo5g6np5k', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."_ChatToUser" ("A", "B") VALUES ('clu4troqx0000113lo5g6np5k', 'clu6a4men0006xlp8aapy1ydk');
INSERT INTO public."_ChatToUser" ("A", "B") VALUES ('cluovbpmz00006co2r3b3waik', 'cltuva3xs0000tn3vhv5oc13p');
INSERT INTO public."_ChatToUser" ("A", "B") VALUES ('cluovbpmz00006co2r3b3waik', 'clu6a4men0006xlp8aapy1ydk');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8506f423-3bce-4eac-b7ca-6d006a845b7e', '249a81e630a377f0bba865c5fd7b96c3896c5f2047cfca14f1506b67e15095f2', '2024-03-17 00:00:41.091809+01', '20240316230041_added_basic_chat_user', NULL, NULL, '2024-03-17 00:00:41.01385+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7ea6b05d-8f9d-49f1-9ae2-295295a4093e', '86e8ae55605d1fc41331cdcd396f5e04d1f15b0fc68538a746211c61c689764a', '2024-03-17 00:03:56.957621+01', '20240316230356_added_users', NULL, NULL, '2024-03-17 00:03:56.932701+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('0ea48f7d-a5e3-40cd-9e86-ad3180a70b7d', 'ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df', '2024-03-17 02:43:39.001668+01', '20240317014338_added_password', NULL, NULL, '2024-03-17 02:43:38.997039+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c220f3c0-62ac-4eaa-8d87-2bef675eec87', 'ec2d6163985ecdc9d60b66b4b009679057d69527083c9063a91baf87ffc5dbd5', '2024-03-17 15:06:51.552413+01', '20240317140651_add_trip', NULL, NULL, '2024-03-17 15:06:51.545774+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6942f52c-ed33-4588-a3ca-8706254a2c9a', 'aab2d5e010f38b4a76fdc266ea4994b0b0c6a0708327d0b2bf5ba0de1803c564', '2024-03-17 15:35:45.56321+01', '20240317143545_add_trip', NULL, NULL, '2024-03-17 15:35:45.555866+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('15f41209-2917-4066-8b56-695d939b46c4', '2cbf78dbba20dfeaf72e0be4f8d59842d0047948a54ffeaef366394405906dfc', '2024-03-17 16:00:20.137846+01', '20240317150020_removed_bug', NULL, NULL, '2024-03-17 16:00:20.13228+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9ba0c4fd-3b6d-4554-913a-2440189c55fc', '8cf587f4e04b04702ed0cca6752cb8284ab8d068a0f6f8ab062f772efd5f1863', '2024-03-26 14:31:02.318876+01', '20240326133102_added_photos', NULL, NULL, '2024-03-26 14:31:02.297525+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6f168e4f-6422-4d92-9833-1ce43a07f12b', '381c9d0ce460c37bb7fb07bc4ef9c6b7cb2f9afb182a9dadbbed4580a4efd65b', '2024-03-27 13:59:48.449989+01', '20240327125948_added_photo_to_chat', NULL, NULL, '2024-03-27 13:59:48.438034+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('df89fb9d-dbc3-46ee-a906-37d50e25f09b', '08dea797a046feab67248f2b9d3679d9dc3d9d458333dca30ffd1dc9e8c73f9c', '2024-04-06 00:58:47.209032+01', '20240405235847_adding_personnal_chat', NULL, NULL, '2024-04-06 00:58:47.166752+01', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8f0c3016-a8ae-48c7-bf06-fa865c0f2fc9', '168e356a5cc70c4d03a1303d649bf300652d17ae5250b3385aff06e7f03d1120', '2024-04-10 01:38:43.778294+01', '20240410003843_added_chat_type', NULL, NULL, '2024-04-10 01:38:43.746861+01', 1);


--
-- PostgreSQL database dump complete
--

