--
-- PostgreSQL database dump
--

\restrict wFehrsrx8waVtzVy9YuY8qaHi729ko5M0ZpfRN9pX4ta30RPgI9P9TFxzFwqqY6

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-13 14:07:23

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
-- TOC entry 898 (class 1247 OID 16511)
-- Name: leave_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.leave_status AS ENUM (
    'Pending',
    'Approved',
    'Rejected'
);


ALTER TYPE public.leave_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16441)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    department_name character varying(100)
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16440)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 227
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 224 (class 1259 OID 16421)
-- Name: email_verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_verification (
    id integer NOT NULL,
    user_id integer,
    token text
);


ALTER TABLE public.email_verification OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16420)
-- Name: email_verification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.email_verification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.email_verification_id_seq OWNER TO postgres;

--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 223
-- Name: email_verification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.email_verification_id_seq OWNED BY public.email_verification.id;


--
-- TOC entry 232 (class 1259 OID 16470)
-- Name: employee_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_images (
    id integer NOT NULL,
    employee_id integer,
    image_url text
);


ALTER TABLE public.employee_images OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16469)
-- Name: employee_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_images_id_seq OWNER TO postgres;

--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 231
-- Name: employee_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_images_id_seq OWNED BY public.employee_images.id;


--
-- TOC entry 230 (class 1259 OID 16449)
-- Name: employee_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_profiles (
    id integer NOT NULL,
    department_id integer,
    phone character varying(20),
    address text,
    designation character varying(100),
    salary numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.employee_profiles OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16448)
-- Name: employee_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_profiles_id_seq OWNER TO postgres;

--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 229
-- Name: employee_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_profiles_id_seq OWNED BY public.employee_profiles.id;


--
-- TOC entry 236 (class 1259 OID 16493)
-- Name: employee_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_skills (
    id integer NOT NULL,
    user_id integer,
    skill_id integer
);


ALTER TABLE public.employee_skills OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16492)
-- Name: employee_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_skills_id_seq OWNER TO postgres;

--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 235
-- Name: employee_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_skills_id_seq OWNED BY public.employee_skills.id;


--
-- TOC entry 238 (class 1259 OID 16601)
-- Name: leave_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leave_requests (
    leave_id integer NOT NULL,
    employee_id integer NOT NULL,
    leave_type character varying(50),
    start_date date,
    end_date date,
    reason text,
    status character varying(30) DEFAULT 'Pending'::character varying,
    approved_by integer,
    approved_at timestamp without time zone,
    applied_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.leave_requests OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16600)
-- Name: leave_requests_leave_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leave_requests_leave_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leave_requests_leave_id_seq OWNER TO postgres;

--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 237
-- Name: leave_requests_leave_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leave_requests_leave_id_seq OWNED BY public.leave_requests.leave_id;


--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: password_reset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset (
    id integer NOT NULL,
    user_id integer,
    token text,
    expires_at timestamp without time zone
);


ALTER TABLE public.password_reset OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16409)
-- Name: password_reset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.password_reset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.password_reset_id_seq OWNER TO postgres;

--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 221
-- Name: password_reset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.password_reset_id_seq OWNED BY public.password_reset.id;


--
-- TOC entry 226 (class 1259 OID 16431)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    user_id integer,
    token text
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16430)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 225
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 234 (class 1259 OID 16485)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    id integer NOT NULL,
    skill_name character varying(100)
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16484)
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_id_seq OWNER TO postgres;

--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 233
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- TOC entry 220 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    password character varying(255),
    role character varying(20) DEFAULT 'user'::character varying,
    last_login timestamp without time zone,
    verified boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16398)
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
-- TOC entry 5126 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4910 (class 2604 OID 16444)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 4908 (class 2604 OID 16424)
-- Name: email_verification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_verification ALTER COLUMN id SET DEFAULT nextval('public.email_verification_id_seq'::regclass);


--
-- TOC entry 4913 (class 2604 OID 16473)
-- Name: employee_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_images ALTER COLUMN id SET DEFAULT nextval('public.employee_images_id_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 16452)
-- Name: employee_profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_profiles ALTER COLUMN id SET DEFAULT nextval('public.employee_profiles_id_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 16496)
-- Name: employee_skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills ALTER COLUMN id SET DEFAULT nextval('public.employee_skills_id_seq'::regclass);


--
-- TOC entry 4916 (class 2604 OID 16604)
-- Name: leave_requests leave_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_requests ALTER COLUMN leave_id SET DEFAULT nextval('public.leave_requests_leave_id_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 16413)
-- Name: password_reset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset ALTER COLUMN id SET DEFAULT nextval('public.password_reset_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16434)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4914 (class 2604 OID 16488)
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- TOC entry 4904 (class 2604 OID 16402)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5101 (class 0 OID 16441)
-- Dependencies: 228
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, department_name) FROM stdin;
1	IT
2	HR
3	Finance
4	Marketing
5	Audit
6	Software Development
7	Quality Assurance
8	Human Resources
9	Finance
10	Digital Marketing
11	Sales
12	Operations
13	Technical Support
\.


--
-- TOC entry 5097 (class 0 OID 16421)
-- Dependencies: 224
-- Data for Name: email_verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_verification (id, user_id, token) FROM stdin;
\.


--
-- TOC entry 5105 (class 0 OID 16470)
-- Dependencies: 232
-- Data for Name: employee_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_images (id, employee_id, image_url) FROM stdin;
1	1	1780561811105-images.jpg
2	2	1780564762083-kyojin-titan.jpg
\.


--
-- TOC entry 5103 (class 0 OID 16449)
-- Dependencies: 230
-- Data for Name: employee_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_profiles (id, department_id, phone, address, designation, salary, created_at) FROM stdin;
1	2	9478667232	paradise	Manager	800000.00	2026-06-04 14:00:11.019139
2	4	9876545688	Paradise	Manager	799998.00	2026-06-04 14:49:22.029097
13	1	9876543210	Indore	Director	150000.00	2026-06-04 17:05:45.734769
14	1	9876543211	Indore	Project Manager	85000.00	2026-06-04 17:05:45.734769
15	3	9876543212	Indore	HR Manager	70000.00	2026-06-04 17:05:45.734769
16	1	9876543213	Indore	React Developer	45000.00	2026-06-04 17:05:45.734769
17	1	9876543214	Indore	Node Developer	50000.00	2026-06-04 17:05:45.734769
18	2	9876543215	Indore	QA Engineer	40000.00	2026-06-04 17:05:45.734769
19	5	9876543216	Indore	Marketing Executive	35000.00	2026-06-04 17:05:45.734769
20	6	9876543217	Indore	Sales Executive	38000.00	2026-06-04 17:05:45.734769
21	8	9876543218	Indore	Support Engineer	32000.00	2026-06-04 17:05:45.734769
22	4	9876543219	Indore	Accountant	42000.00	2026-06-04 17:05:45.734769
\.


--
-- TOC entry 5109 (class 0 OID 16493)
-- Dependencies: 236
-- Data for Name: employee_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_skills (id, user_id, skill_id) FROM stdin;
1	1	6
2	2	7
\.


--
-- TOC entry 5111 (class 0 OID 16601)
-- Dependencies: 238
-- Data for Name: leave_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leave_requests (leave_id, employee_id, leave_type, start_date, end_date, reason, status, approved_by, approved_at, applied_at) FROM stdin;
\.


--
-- TOC entry 5095 (class 0 OID 16410)
-- Dependencies: 222
-- Data for Name: password_reset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset (id, user_id, token, expires_at) FROM stdin;
1	1	9be2d957-e24b-423c-ac8c-7325c2841535	2026-06-03 15:24:34.74
2	4	91cf7742-9239-4102-8d84-13ca86a3bc9d	2026-06-12 10:54:59.616
\.


--
-- TOC entry 5099 (class 0 OID 16431)
-- Dependencies: 226
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, token) FROM stdin;
1	1	261ecddc-2c3e-45c6-bf0b-0269b87000e4
2	1	343e312e-845f-4e24-a3c8-0f53b1ef81f6
3	1	dc822c91-458e-4435-a157-94cda15aa470
4	2	b33f71cb-17ee-40b8-8cff-df5d65b975ac
5	1	fcf75a48-f030-47f4-9915-d1f44e72ccd5
6	3	5859367a-66ed-47c6-8774-d9eaca324814
7	3	b0aecf8d-5b64-4aee-aa4f-3aef778a6130
8	3	113cde72-60e8-4ebf-a220-4a77fd2007e6
9	3	0e8a5de0-887a-4142-8d21-03134cfcda8c
10	4	353cfd74-eb75-432f-8e40-9091efe1673d
11	4	77f151eb-beea-4fd7-a269-3bd9311f8a3b
12	4	4061909f-d085-4a47-b3aa-ea6389f4d69e
13	4	27bbf529-a0ad-4b63-8bf0-5bab9c26c8f6
14	4	e222c55d-a44b-4296-8b4a-4696a06ee938
15	4	2b307c64-b2e9-41bf-af2c-ba381236f2ee
16	4	04589b83-a14f-489c-be14-e6be950d6adf
17	4	4b885e33-2837-4535-8ab0-b62757677eb7
18	4	d04501f6-b978-4816-a75d-21acacf66d70
19	4	c2b22850-4b27-44cc-ad6d-80c4a9980096
20	4	23a845e0-d939-4ce8-a789-bafdea0d6e84
21	4	ef131b99-b22a-4d83-981e-9d57cf73f361
22	4	3f5cc3a4-20ae-467f-af68-4a65d974a178
23	4	b52e6486-c7ba-4864-a7f4-f7a8499a8272
24	4	5a2d45fd-eabf-44d7-9061-91c4cb279f6a
25	15	20f29b2a-583b-4611-9d2f-46ee0790c438
26	4	0265146a-4d3c-4d07-abeb-11109edd4b5a
27	3	7e7db623-5b28-476f-b43b-2ef6a3c027db
28	15	953033c1-6918-4260-b84a-d8e526c62152
29	4	eac34701-a4aa-4e80-b220-6a22567fd92b
30	3	ee70bc8e-f725-428d-9983-e0000a356d96
31	3	e81e1937-5b4e-44af-9c06-152e40bb15d0
\.


--
-- TOC entry 5107 (class 0 OID 16485)
-- Dependencies: 234
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (id, skill_name) FROM stdin;
1	React
2	NodeJS
3	PostgreSQL
4	Python
5	Java
6	HR
7	management
8	JavaScript
9	HTML
10	CSS
11	MongoDB
12	Python
13	Testing
14	Salesforce
\.


--
-- TOC entry 5093 (class 0 OID 16399)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, last_login, verified) FROM stdin;
3	eren yeager	erenyeager@paradise.in	$2b$10$n8JPfiEbmOTmTd9D0HcucuSJCQyeqWwgwhG01cMuvipo81y7RIyeC	admin	2026-06-13 12:48:09.187245	f
5	Pranay Gupta	pranay@isoftzone.com	123456	admin	\N	f
6	Rahul Sharma	rahul@isoftzone.com	123456	manager	\N	f
7	Priya Verma	priya@isoftzone.com	123456	hr	\N	f
8	Amit Patel	amit@isoftzone.com	123456	employee	\N	f
9	Neha Jain	neha@isoftzone.com	123456	employee	\N	f
10	Rohit Singh	rohit@isoftzone.com	123456	employee	\N	f
11	Anjali Gupta	anjali@isoftzone.com	123456	employee	\N	f
12	Vikas Mehta	vikas@isoftzone.com	123456	employee	\N	f
13	Pooja Shah	pooja@isoftzone.com	123456	employee	\N	f
14	Sandeep Kumar	sandeep@isoftzone.com	123456	employee	\N	f
1	Sonali	sonashekhawat11@gmail.com	$2b$10$KhwMHvySNa6CiYNNMrREge2jmS2bNlOTaQQTtd0kIQlE1ovGPLdyK	Admin	2026-06-03 17:34:44.576946	f
2	hema kumawat	hemak19@social.com	$2b$10$MVWqlCa9PmciTBolb2lNNON2qVj4ZJJulp96D5B5VqCNT7UE7fZhm	HR Manager	2026-06-03 17:23:29.453688	f
15	ishita	ishita@gmail.com	$2b$10$KPjIOCGjRabPwHv./7Mu8uYhqaMqFz.AGwIHf7zsjr1CyXXa5S7Aq	user	2026-06-13 12:36:28.780078	f
4	Levi Akerman	levi@paradise.in	$2b$10$Hj.wO9X66FZsptBKOg6/oO60OmCdKjAkzA4LhAQklPvNJZZuCmNoO	user	2026-06-13 12:37:18.44091	f
\.


--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 227
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 13, true);


--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 223
-- Name: email_verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.email_verification_id_seq', 1, false);


--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 231
-- Name: employee_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_images_id_seq', 2, true);


--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 229
-- Name: employee_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_profiles_id_seq', 22, true);


--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 235
-- Name: employee_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_skills_id_seq', 26, true);


--
-- TOC entry 5132 (class 0 OID 0)
-- Dependencies: 237
-- Name: leave_requests_leave_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leave_requests_leave_id_seq', 1, false);


--
-- TOC entry 5133 (class 0 OID 0)
-- Dependencies: 221
-- Name: password_reset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.password_reset_id_seq', 2, true);


--
-- TOC entry 5134 (class 0 OID 0)
-- Dependencies: 225
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 31, true);


--
-- TOC entry 5135 (class 0 OID 0)
-- Dependencies: 233
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_id_seq', 14, true);


--
-- TOC entry 5136 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- TOC entry 4930 (class 2606 OID 16447)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 4926 (class 2606 OID 16429)
-- Name: email_verification email_verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_verification
    ADD CONSTRAINT email_verification_pkey PRIMARY KEY (id);


--
-- TOC entry 4934 (class 2606 OID 16478)
-- Name: employee_images employee_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_images
    ADD CONSTRAINT employee_images_pkey PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 16458)
-- Name: employee_profiles employee_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_profiles
    ADD CONSTRAINT employee_profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4938 (class 2606 OID 16499)
-- Name: employee_skills employee_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_pkey PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 16612)
-- Name: leave_requests leave_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_pkey PRIMARY KEY (leave_id);


--
-- TOC entry 4924 (class 2606 OID 16418)
-- Name: password_reset password_reset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset
    ADD CONSTRAINT password_reset_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 16439)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 16491)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- TOC entry 4920 (class 2606 OID 16407)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4922 (class 2606 OID 16405)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 16479)
-- Name: employee_images employee_images_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_images
    ADD CONSTRAINT employee_images_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employee_profiles(id);


--
-- TOC entry 4941 (class 2606 OID 16464)
-- Name: employee_profiles employee_profiles_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_profiles
    ADD CONSTRAINT employee_profiles_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- TOC entry 4943 (class 2606 OID 16500)
-- Name: employee_skills employee_skills_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_employee_id_fkey FOREIGN KEY (user_id) REFERENCES public.employee_profiles(id);


--
-- TOC entry 4944 (class 2606 OID 16505)
-- Name: employee_skills employee_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id);


-- Completed on 2026-06-13 14:07:24

--
-- PostgreSQL database dump complete
--

\unrestrict wFehrsrx8waVtzVy9YuY8qaHi729ko5M0ZpfRN9pX4ta30RPgI9P9TFxzFwqqY6

