--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shorten; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shorten (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    user_id integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shorten_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shorten_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shorten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shorten_id_seq OWNED BY public.shorten.id;


--
-- Name: token_validation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.token_validation (
    id integer NOT NULL,
    token text NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    user_id integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: token_validation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.token_validation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: token_validation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.token_validation_id_seq OWNED BY public.token_validation.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shorten id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorten ALTER COLUMN id SET DEFAULT nextval('public.shorten_id_seq'::regclass);


--
-- Name: token_validation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.token_validation ALTER COLUMN id SET DEFAULT nextval('public.token_validation_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shorten; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shorten VALUES (2, 'd0Y_iNhD0i5a5avkn39Ve', 'https://www.youtube.com/watch?v=ziX7ggM7WZ4', 2, 1, '2023-02-26 11:50:10.104385');
INSERT INTO public.shorten VALUES (3, 'YiPORS5cLFFUH69CecTck', 'data:image/jpeg;base64,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', 2, 1, '2023-02-26 12:10:32.881389');
INSERT INTO public.shorten VALUES (4, 'aktp3OR25BZKX7o6zJTDw', 'https://www.twitch.tv/baiano', 4, 1, '2023-02-26 12:11:03.969436');


--
-- Data for Name: token_validation; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.token_validation VALUES (1, '7fd76f70-47cc-45c8-b387-4b56a19b0de7', '2023-02-26 18:54:04.36', 1, '2023-02-26 23:24:56.652521');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'JUCATIGRE', '$2b$10$VKW22S8p4VxK/JV3otgpy.fafu4CQfCFC5L9kz7ar0W71K2sgRk6u', 'juca@gmail.com', '2023-02-25 23:24:39.879711');


--
-- Name: shorten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shorten_id_seq', 4, true);


--
-- Name: token_validation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.token_validation_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: shorten shorten_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorten
    ADD CONSTRAINT shorten_pkey PRIMARY KEY (id);


--
-- Name: token_validation token_validation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.token_validation
    ADD CONSTRAINT token_validation_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: shorten shorten_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorten
    ADD CONSTRAINT shorten_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: token_validation token_validation_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.token_validation
    ADD CONSTRAINT token_validation_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

