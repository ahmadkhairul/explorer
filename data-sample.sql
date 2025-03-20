--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-15 12:26:07

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16390)
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
    CONSTRAINT files_type_check CHECK ((type = ANY (ARRAY['folder'::text, 'file'::text])))
);


ALTER TABLE public.files OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
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
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 217
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- TOC entry 4741 (class 2604 OID 16393)
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- TOC entry 4895 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (2, 'Downloads', 'folder', NULL, 0, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (3, 'Projects', 'folder', 1, 0, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (4, 'Personal', 'folder', 1, 0, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (5, 'resume.pdf', 'file', 1, 120000, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (6, 'notes.txt', 'file', 1, 5000, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (7, 'app.js', 'file', 3, 30000, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (8, 'index.html', 'file', 3, 20000, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (9, 'New Folder', 'folder', NULL, 0, '2025-03-13 19:39:37.267535', '2025-03-13 19:39:37.267535', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (10, 'New Document', 'folder', 1, 0, '2025-03-13 19:41:07.446874', '2025-03-13 19:41:07.446874', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (13, 'Folder Terbaru', 'folder', NULL, 0, '2025-03-13 19:49:03.562469', '2025-03-13 19:49:03.562469', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (14, 'Folder Rahasia', 'folder', NULL, 0, '2025-03-13 19:49:50.489907', '2025-03-13 19:49:50.489907', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (15, 'Folder Rahasia Nomor 3', 'folder', 14, 0, '2025-03-13 19:50:00.567267', '2025-03-13 19:50:00.567267', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (1, 'Dokumen', 'folder', NULL, 0, '2025-03-11 19:53:34.647006', '2025-03-11 19:53:34.647006', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (12, 'Folder Keramat', 'folder', NULL, 0, '2025-03-13 19:42:25.095285', '2025-03-13 19:42:25.095285', '2025-03-13 14:40:45.231');
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (11, 'Test', 'folder', 1, 0, '2025-03-13 19:41:29.94355', '2025-03-13 19:41:29.94355', '2025-03-13 14:40:49.292');
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (18, 'Good', 'folder', NULL, 0, '2025-03-13 21:54:30.856955', '2025-03-13 21:54:30.856955', NULL);
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (16, 'Batang', 'file', NULL, 183002824, '2025-03-13 20:02:22.298064', '2025-03-13 20:02:22.298064', '2025-03-13 14:55:10.428');
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (17, 'Screenshot 2025-02-21 155635.png', 'file', 2, 294414, '2025-03-13 20:02:35.070511', '2025-03-13 20:02:35.070511', '2025-03-13 14:55:14.02');
INSERT INTO public.files (id, name, type, parent_id, size, created_at, updated_at, deleted_at) VALUES (19, 'ahmad-khairul-anwar-2024-resume.pdf', 'file', NULL, 97137, '2025-03-15 04:42:57.347154', '2025-03-15 04:42:57.347154', NULL);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 217
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 19, true);


--
-- TOC entry 4747 (class 2606 OID 16401)
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- TOC entry 4748 (class 2606 OID 16402)
-- Name: files files_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.files(id) ON DELETE CASCADE;


-- Completed on 2025-03-15 12:26:07

--
-- PostgreSQL database dump complete
--

