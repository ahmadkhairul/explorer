--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-14 15:49:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16387)
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    parent_id integer,
    size integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    deleted_at timestamp without time zone,
    path text,
    user_id integer,
    CONSTRAINT files_type_check CHECK ((type = ANY (ARRAY['folder'::text, 'file'::text])))
);


ALTER TABLE public.files OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_seq OWNER TO postgres;

--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 218
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- TOC entry 220 (class 1259 OID 24591)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    username text,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24590)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4747 (class 2604 OID 16397)
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 24594)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4908 (class 0 OID 16387)
-- Dependencies: 217
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at, path, user_id) FROM stdin;
1	Root Folder	folder	\N	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
2	Documents	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
3	Images	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
4	Project.zip	file	2	2048	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/abc123_Project.zip	3
5	Resume.docx	file	2	512	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/def456_Resume.docx	3
6	Photo1.png	file	3	1024	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/ghi789_Photo1.png	3
7	Photo2.jpg	file	3	2048	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/jkl321_Photo2.jpg	3
8	Music	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
9	song1.mp3	file	8	4096	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/mno654_song1.mp3	3
10	song2.mp3	file	8	3000	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/pqr987_song2.mp3	3
11	Videos	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
12	movie1.mp4	file	11	10240	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/stu369_movie1.mp4	3
13	movie2.mp4	file	11	20480	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/vwx159_movie2.mp4	3
14	Work	folder	2	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
15	Notes.txt	file	14	128	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/yza753_Notes.txt	3
16	Tasks.md	file	14	64	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/bcd456_Tasks.md	3
17	Archive	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
18	old.zip	file	17	5000	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/efg789_old.zip	3
19	Personal	folder	2	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
20	diary.txt	file	19	256	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/hij123_diary.txt	3
21	Folder21	folder	1	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
22	File22.txt	file	21	111	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/aa22_File22.txt	3
23	Folder23	folder	21	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
24	File24.txt	file	23	222	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/bb24_File24.txt	3
25	Folder25	folder	23	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
26	File26.txt	file	25	333	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/cc26_File26.txt	3
27	Folder27	folder	25	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
28	File28.txt	file	27	444	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/dd28_File28.txt	3
29	Folder29	folder	27	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
30	File30.txt	file	29	555	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/ee30_File30.txt	3
31	Folder31	folder	29	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
32	File32.txt	file	31	666	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/ff32_File32.txt	3
33	Folder33	folder	31	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
34	File34.txt	file	33	777	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/gg34_File34.txt	3
35	Folder35	folder	33	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
36	File36.txt	file	35	888	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/hh36_File36.txt	3
37	Folder37	folder	35	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
38	File38.txt	file	37	999	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/ii38_File38.txt	3
39	Folder39	folder	37	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
40	File40.txt	file	39	1010	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/jj40_File40.txt	3
41	Folder41	folder	39	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
42	File42.txt	file	41	1111	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/kk42_File42.txt	3
43	Folder43	folder	41	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
44	File44.txt	file	43	1212	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/ll44_File44.txt	3
45	Folder45	folder	43	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
46	File46.txt	file	45	1313	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/mm46_File46.txt	3
47	Folder47	folder	45	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
48	File48.txt	file	47	1414	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/nn48_File48.txt	3
49	Folder49	folder	47	0	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	\N	3
50	File50.txt	file	49	1515	2025-04-13 18:40:19.254159	2025-04-13 18:40:19.254159	\N	./uploads/oo50_File50.txt	3
51	19 67	folder	19	0	2025-04-14 09:10:06.253089	2025-04-14 09:10:06.253089	\N	\N	3
52	Folder 100	folder	21	0	2025-04-14 09:16:11.119203	2025-04-14 09:16:11.119203	\N	\N	3
53	Folder 600	folder	21	0	2025-04-14 09:16:19.319946	2025-04-14 09:16:19.319946	\N	\N	3
57	Screenshot 2024-10-17 172649.png	file	25	54988	2025-04-14 11:31:37.716471	2025-04-14 11:31:37.716471	\N	./uploads/4UNb6Screenshot 2024-10-17 172649.png	3
54	Gambar	file	21	585098	2025-04-14 09:16:25.412596	2025-04-14 09:16:25.412596	2025-04-14 02:17:08.846	./uploads/t2v58Screenshot 2024-10-14 145511.png	3
55	Screenshot 2024-11-10 161611.png	file	17	358420	2025-04-14 11:29:23.142015	2025-04-14 11:29:23.142015	\N	./uploads/wbC4vScreenshot 2024-11-10 161611.png	3
56	Batagor	folder	17	0	2025-04-14 11:30:18.033857	2025-04-14 11:30:18.033857	\N	\N	3
\.


--
-- TOC entry 4911 (class 0 OID 24591)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at, username, updated_at, deleted_at, role) FROM stdin;
1	Dadang	dadang@example.com	$2b$10$nU0tnaAvtfLtuIaVqSkrwu9imc/DiOx1nm6H7vsTQP9MlcgYu/xNy	2025-04-10 19:18:58.931047	dadang_new	2025-04-10 19:18:58.931047	2025-04-10 19:18:58.931047	user
2	Khairul	khairul@example.com	$2b$10$YPzE9gS452LSab0NcRpNd.Vi1nuykoUxfjlCbx4uqJJ7rnxQqGHya	2025-04-10 19:22:28.780424	khairul	2025-04-10 19:22:28.780424	2025-04-10 19:22:28.780424	user
3	Super Admin	admin@example.com	$2b$10$G0pGnPIKGBMkxKczVgGj4.LidD.hvcAqAeAzUQ8dBf2JTEn689lv.	2025-04-10 20:25:35.842222	admin	2025-04-10 20:25:35.842222	2025-04-10 20:25:35.842222	admin
\.


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 218
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 57, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4757 (class 2606 OID 16399)
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- TOC entry 4759 (class 2606 OID 24601)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4761 (class 2606 OID 24599)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 16400)
-- Name: files files_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.files(id) ON DELETE CASCADE;


-- Completed on 2025-04-14 15:49:33

--
-- PostgreSQL database dump complete
--

