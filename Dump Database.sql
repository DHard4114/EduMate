--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course_materials; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.course_materials (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_id uuid,
    type text NOT NULL,
    content text NOT NULL,
    order_number integer,
    created_at timestamp without time zone DEFAULT now(),
    title text NOT NULL,
    CONSTRAINT course_materials_type_check CHECK ((type = ANY (ARRAY['text'::text, 'video'::text])))
);


ALTER TABLE public.course_materials OWNER TO neondb_owner;

--
-- Name: course_quizzes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.course_quizzes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_id uuid,
    question text NOT NULL,
    options text[] NOT NULL,
    correct_answer text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    quiz_image_url text
);


ALTER TABLE public.course_quizzes OWNER TO neondb_owner;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.courses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    level text NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT courses_level_check CHECK ((level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text])))
);


ALTER TABLE public.courses OWNER TO neondb_owner;

--
-- Name: group_comments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.group_comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    group_id uuid,
    user_id uuid,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.group_comments OWNER TO neondb_owner;

--
-- Name: group_members; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.group_members (
    user_id uuid NOT NULL,
    group_id uuid NOT NULL,
    joined_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.group_members OWNER TO neondb_owner;

--
-- Name: level_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.level_progress (
    user_id uuid NOT NULL,
    level text NOT NULL,
    completed_course_ids uuid[],
    last_updated timestamp without time zone DEFAULT now(),
    CONSTRAINT level_progress_level_check CHECK ((level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text])))
);


ALTER TABLE public.level_progress OWNER TO neondb_owner;

--
-- Name: pomodoro_sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pomodoro_sessions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    type text NOT NULL,
    duration_minutes integer NOT NULL,
    started_at timestamp without time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT pomodoro_sessions_type_check CHECK ((type = ANY (ARRAY['pomodoro'::text, 'short_break'::text, 'long_break'::text])))
);


ALTER TABLE public.pomodoro_sessions OWNER TO neondb_owner;

--
-- Name: quiz_answers; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.quiz_answers (
    user_id uuid NOT NULL,
    quiz_id uuid NOT NULL,
    selected_answer text NOT NULL,
    answered_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.quiz_answers OWNER TO neondb_owner;

--
-- Name: task_groups; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.task_groups (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    created_by uuid,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.task_groups OWNER TO neondb_owner;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.tasks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    group_id uuid,
    title text NOT NULL,
    description text,
    status text DEFAULT 'todo'::text,
    assigned_to uuid,
    created_at timestamp without time zone DEFAULT now(),
    severity text,
    CONSTRAINT tasks_status_check CHECK ((status = ANY (ARRAY['todo'::text, 'in_progress'::text, 'done'::text])))
);


ALTER TABLE public.tasks OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    level text DEFAULT 'beginner'::text,
    created_at timestamp without time zone DEFAULT now(),
    profile_picture_url text,
    CONSTRAINT users_level_check CHECK ((level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text]))),
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['student'::text, 'teacher'::text])))
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Data for Name: course_materials; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.course_materials (id, course_id, type, content, order_number, created_at, title) FROM stdin;
25c2f2d7-5cc0-4a05-a924-a65c62d5fc06	20e47076-cf90-4e9d-bdee-5660d6806a3f	text	Kalian sudah mempelajari angka, sekarang ayo belajar menjumlahkan mereka!	1	2025-05-18 04:23:59.348492	Penjumalahan
f28a8f86-0247-4c7f-b55b-58b737829953	20e47076-cf90-4e9d-bdee-5660d6806a3f	text	Tapi bagaimana bila barang kalian berkurang? Berapa sisa barang kalian?	2	2025-05-18 04:25:05.356686	Pengurangan
4dce4558-9c52-46ce-8a22-8ff01ff27c29	20e47076-cf90-4e9d-bdee-5660d6806a3f	text	Tambah dan kurang??	3	2025-05-18 04:27:24.475931	Aritmatika Campur
c31ad157-4575-4215-ae28-3689c28fb95b	20e47076-cf90-4e9d-bdee-5660d6806a3f	text	Kalau aku diberi permen tapi membaginya ke teman-temanku, berapa permen yang akhirnya kupunya?	4	2025-05-18 04:28:20.971859	Soal Cerita
8d3c1d6e-1c41-457c-8105-21244b179790	2d296012-6204-40fd-9b31-d1f72d48604c	text	Aku bisa menjumlahkan sekarang. Tapi apakah ada cara yang lebih cepat untuk menghitung jumlah permen di kotak?	1	2025-05-18 04:30:33.918086	Perkalian
80dabda9-470a-4fb5-b3f2-7a976326440a	2d296012-6204-40fd-9b31-d1f72d48604c	text	Aku ingin bisa memberikan jumlah permen yang sama untuk ketiga temanku..	2	2025-05-18 04:31:44.037507	Pembagian
84cc27ca-0e4c-40d8-9cb6-f9e985c8e06c	2d296012-6204-40fd-9b31-d1f72d48604c	text	Setelah mengalikan semua permen yang kupunya, aku harus membaginya lagi...?	3	2025-05-18 04:32:38.730438	Aritmatika Campur
5c5a7180-6bee-44ae-ab68-1d43b82e8381	2d296012-6204-40fd-9b31-d1f72d48604c	text	Apa kau bis menyelesaikan soal cerita ini?	4	2025-05-18 04:33:09.404641	Soal Cerita
3c946ea7-961e-45e6-9241-89cfa4939d18	f7935d16-1600-4770-91c4-c69a1ff53f23	text	X return. Who is this anomaly anyway??	1	2025-05-18 04:34:07.665643	Simbol dan Huruf
49dbadf5-ec78-4c7e-8431-88074ab5feec	f7935d16-1600-4770-91c4-c69a1ff53f23	text	Menyelesaikan bentuk sederhana: “□ + 3 = 5”	2	2025-05-18 04:35:02.204571	Mencari angka yang hilang
12a30890-14d6-4ef6-a8b1-fa2cf1c45c92	f7935d16-1600-4770-91c4-c69a1ff53f23	text	Mengisi nilai variabel (contoh: Jika A = 4, maka A + 2 = ?)	3	2025-05-18 04:35:46.211792	Angka dan Variabel
5486b44f-8460-4938-91bf-ef559aabbe89	f7935d16-1600-4770-91c4-c69a1ff53f23	text	...	4	2025-05-18 04:36:29.8549	Petualangan dengan Aljabar
5f3ef989-dc20-4a98-a7d0-ead134fa2bca	efcee295-d138-440f-8f6b-e6457ecbda4a	text	...	1	2025-05-18 04:36:57.538618	Pecahan
a39199b6-dff5-4249-bf51-878c45a5b3d7	efcee295-d138-440f-8f6b-e6457ecbda4a	text	...	2	2025-05-18 04:37:06.566789	Menulis dan Membaca Pecahan
8134450d-9590-4950-91c7-675d03e3aa38	efcee295-d138-440f-8f6b-e6457ecbda4a	text	...	3	2025-05-18 04:37:19.42804	Kue dan Pizza
a420d144-4fcb-49d7-b8e5-fe66865d0ebc	efcee295-d138-440f-8f6b-e6457ecbda4a	text	...	4	2025-05-18 04:37:32.307171	Pecahan Mana yang Lebih Besar?
a93add16-edd4-47b7-bbe5-d869708d93d6	399ac6b9-e8f0-4e3e-b360-eb874f2fd0a4	text	...	1	2025-05-18 04:38:02.243026	Bangun Datar
bfe4e234-5b31-4066-9e3e-8ba045274c37	399ac6b9-e8f0-4e3e-b360-eb874f2fd0a4	text	...	2	2025-05-18 04:38:10.755123	Apa itu Sisi dan Sudut?
6d384e50-7cd6-42ca-a93e-895a929c216f	399ac6b9-e8f0-4e3e-b360-eb874f2fd0a4	text	...	3	2025-05-18 04:38:38.027813	Ayo belajar jenis-jenis Bangun Datar
78942d41-643b-4350-be2d-a2698fc1f0bd	399ac6b9-e8f0-4e3e-b360-eb874f2fd0a4	text	...	4	2025-05-18 04:38:52.275626	Bangun Datar pada Objek Sekitar
683e7d6a-5711-4aac-a705-9b1c333c9cfc	a4c96d01-90e5-430d-aba4-36ebce75a117	text	...	1	2025-05-18 04:39:32.754717	Keliling
c87eb4fa-1ea1-4e5a-a20d-eeb23f5fb939	a4c96d01-90e5-430d-aba4-36ebce75a117	text	...	2	2025-05-18 04:39:45.555237	Luas
7c2ccf14-902d-4806-9a98-70ce2f7d77bd	a4c96d01-90e5-430d-aba4-36ebce75a117	text	...	3	2025-05-18 04:40:05.08903	Mencari Jarak
086cc78d-c585-434a-be77-c39a07233a26	a4c96d01-90e5-430d-aba4-36ebce75a117	text	...	4	2025-05-18 04:40:24.691295	Mana yang Lebih Besar?
392a2edf-a211-4501-aedf-321bb976690c	0d5cf7db-3cc7-4a0a-80b0-65c0c5299b6d	text	...	1	2025-05-18 04:40:50.903148	Sifat Komutatif
05f57da6-e05e-41e1-ae6f-80b0d3f4f72d	0d5cf7db-3cc7-4a0a-80b0-65c0c5299b6d	text	...	2	2025-05-18 04:41:01.142663	Sifat Asosiatif
6eb31f4b-cd95-48dd-b2a2-ed27da606a6b	0d5cf7db-3cc7-4a0a-80b0-65c0c5299b6d	text	...	3	2025-05-18 04:41:14.981963	Sifat Distributif
01bfb038-813a-4b98-9219-55096b5b9d0f	0d5cf7db-3cc7-4a0a-80b0-65c0c5299b6d	text	...	4	2025-05-18 04:41:30.737769	Pecahkan Masalahmu dengan Sifat hitung
b64361d4-1f8f-4988-ac8f-0ddabc08e5f6	d68d257a-19ed-4c08-adf1-4ff5bf135cc9	text	...	1	2025-05-18 04:42:12.591213	2D? 3D?
35e7cb31-8e45-49cc-8897-67a745dfd070	d68d257a-19ed-4c08-adf1-4ff5bf135cc9	text	...	2	2025-05-18 04:42:37.480025	Mengenal Bangun Ruang
283ab061-a8a3-496f-ad87-c301e97f7f23	d68d257a-19ed-4c08-adf1-4ff5bf135cc9	text	...	3	2025-05-18 04:42:46.874399	Sisi, Rusuk, Titik Sudut
20d273cb-df1a-404a-b3a9-9016b88fb8e6	d68d257a-19ed-4c08-adf1-4ff5bf135cc9	text	...	4	2025-05-18 04:43:02.448925	Jaring-jaring Ajaib
60446151-2a8f-48c4-9543-fe95cab77559	038ece0d-21dd-4034-91e5-25047b600e0d	text	...	1	2025-05-18 04:45:02.698624	Bangun Ruang di Dunia Nyata
924fe60c-ac92-4401-8bbb-899e10b4aa65	038ece0d-21dd-4034-91e5-25047b600e0d	text	...	2	2025-05-18 04:45:15.67734	Balok? Kubus? Yang Mana?
b784ee6a-28d5-4bca-b300-d2e555ffec03	038ece0d-21dd-4034-91e5-25047b600e0d	text	...	3	2025-05-18 04:45:24.51157	Air dalam Bak
e8e8a521-f473-4b00-b4e4-5e8f569b879f	038ece0d-21dd-4034-91e5-25047b600e0d	text	...	4	2025-05-18 04:45:38.863762	Cerita Bangun Ruang
3f2bda62-ca9a-47b4-aa97-6ec8d9f5dbf0	1ea1b58d-743b-4e9d-b14c-ae0577cf79eb	text	...	1	2025-05-18 04:45:59.151305	Apa itu Sudut?
1cb88783-d0d6-404f-86a7-62a04f36716d	1ea1b58d-743b-4e9d-b14c-ae0577cf79eb	text	...	2	2025-05-18 04:46:13.546622	Ayo Ukur Sudut!
519dc574-7b6b-4dc2-9830-3710b0b15bf0	1ea1b58d-743b-4e9d-b14c-ae0577cf79eb	text	...	3	2025-05-18 04:46:29.839953	Skala dan Peta
db66d7c0-9ac5-4b91-b5e7-7cc252ddf1b4	1ea1b58d-743b-4e9d-b14c-ae0577cf79eb	text	...	4	2025-05-18 04:46:43.354327	Menghitung Jarak
530b8b92-f9ee-488f-a995-48bb5f1bebaf	ecc4b926-9b9b-401c-ae44-4136a19373e0	text	Memahami tanda kurung, perkalian, pembagian, penjumlahan, dan pengurangan. – Contoh urutan: 2 + 3 × 4 = ? (jawaban bukan 20 ya!)	1	2025-05-18 04:50:07.828175	Urutan Operasi, Siapa Duluan?
9f5ffcf0-7b81-458a-866d-158875aec44c	ecc4b926-9b9b-401c-ae44-4136a19373e0	text	Menyisipkan tanda kurung agar hasil sesuai maksud soal. Soal-soal campuran: 12 − 4 + 3 × 2	2	2025-05-18 04:50:36.774495	Menghitung dengan Lebih dari Dua Operasi
c5176b42-384f-4bed-8271-68f5934f79c5	ecc4b926-9b9b-401c-ae44-4136a19373e0	text	Soal cerita: belanja di warung, membagi kue, dan hitung sisa uang.	3	2025-05-18 04:50:57.281394	Cerita Seru Operasi Campuran
6b9ee960-bfe1-473f-ab1a-c93147a72843	ecc4b926-9b9b-401c-ae44-4136a19373e0	text	Gabungkan bilangan bulat dengan pecahan 	4	2025-05-18 04:51:16.946282	Operasi Campuran dengan Pecahan
d5f667a3-f862-4b51-abfd-afd004df999c	e41c73df-4617-49a0-9bf3-148f84a0a9f8	text	Menulis dan membaca angka desimal. Mengenal desimal: 0,1 – 0,9	1	2025-05-18 04:52:08.624433	Desimal, Titik Koma Ajaib
ea1dce9f-f6c5-46ba-abd8-120d1b5127ae	e41c73df-4617-49a0-9bf3-148f84a0a9f8	text	Penjumlahan, pengurangan, perkalian, dan pembagian sederhana.	2	2025-05-18 04:52:45.381102	Operasi Hitung Bilangan Desimal
f51e7adc-8f95-4a49-8954-bd441da56e36	e41c73df-4617-49a0-9bf3-148f84a0a9f8	text	Apa itu persen? Hubungannya dengan 100 bagian. 50% artinya setengah, 25% artinya seperempat.	3	2025-05-18 04:53:14.468075	Yuk Kenalan dengan Persen (%)
f67eec3f-6837-4ff7-aa8f-a97f57fd9495	e41c73df-4617-49a0-9bf3-148f84a0a9f8	text	...	4	2025-05-18 04:53:30.929918	Mengubah dan Menghitung Desimal ↔ Persen ↔ Pecahan
34c04419-32da-4ab3-8e6b-2b7678b4fcff	1cc5e8f7-b1f5-4981-9bb2-1d6e92e65276	text	...	1	2025-05-18 04:53:56.614269	Kenalan dengan Volume Yuk!
86c6f830-89d0-48ed-8201-bf365464f314	1cc5e8f7-b1f5-4981-9bb2-1d6e92e65276	text	...	2	2025-05-18 04:54:05.571837	Volume Tabung Sederhana
611b3423-daa2-45dc-b832-93954c15f879	1cc5e8f7-b1f5-4981-9bb2-1d6e92e65276	text	...	3	2025-05-18 04:54:15.453203	Volume Bentuk-Bentuk Aneh
98a5a4d7-aa43-455e-8ccc-69ac5001829e	1cc5e8f7-b1f5-4981-9bb2-1d6e92e65276	text	...	4	2025-05-18 04:54:32.548709	Volume dalam Kehidupan Sehari-hari
c0f7230c-b2af-40de-b567-7c71ead48231	47092eea-11f8-4a67-9d2e-360d61b43774	text	...	1	2025-05-18 04:55:02.354989	Perbandingan? Pecahan?
661fccd5-eb4d-4643-913a-4b87d91f92b6	47092eea-11f8-4a67-9d2e-360d61b43774	text	...	2	2025-05-18 04:55:10.017069	Jarak dan Waktu
bead0405-dc69-424c-a8bd-bfd4b6476727	47092eea-11f8-4a67-9d2e-360d61b43774	text	...	3	2025-05-18 04:55:18.643977	Menghitung Kecepatan
a16bfb8b-729c-4649-9e42-4c535d6a0472	47092eea-11f8-4a67-9d2e-360d61b43774	text	...	4	2025-05-18 04:55:32.937161	Perbandingan Kecepatan
\.


--
-- Data for Name: course_quizzes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.course_quizzes (id, course_id, question, options, correct_answer, created_at, quiz_image_url) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.courses (id, level, title, description, created_at) FROM stdin;
20e47076-cf90-4e9d-bdee-5660d6806a3f	beginner	Aritmatika Dasar I	Yuk Belajar Hitug-hitung!	2025-05-18 03:21:16.322493
2d296012-6204-40fd-9b31-d1f72d48604c	beginner	Aritmatika Dasar II	Ada apa, ya, selain tambah dan kurang?	2025-05-18 03:21:55.131392
f7935d16-1600-4770-91c4-c69a1ff53f23	beginner	Aljabar Dasar	Huh? Kok ada huruf?	2025-05-18 03:22:34.498288
efcee295-d138-440f-8f6b-e6457ecbda4a	beginner	Pecahan	Sepotong kue ulang tahunmu hilang! Berapa sisanya?	2025-05-18 03:23:20.536314
a4c96d01-90e5-430d-aba4-36ebce75a117	beginner	Geometri Dasar II	Seberapa jauh kamu berlari mengelilingi lapangan?	2025-05-18 03:30:52.743683
399ac6b9-e8f0-4e3e-b360-eb874f2fd0a4	beginner	Geometri Dasar I	Apa bentuk rumahmu?	2025-05-18 03:31:15.884451
0d5cf7db-3cc7-4a0a-80b0-65c0c5299b6d	intermediate	Sifat Operasi	Matematika punya kepribadian? The more you know.	2025-05-18 03:32:08.278469
d68d257a-19ed-4c08-adf1-4ff5bf135cc9	intermediate	Bangun Ruang I	Bangun dasarku ada isinya!!	2025-05-18 03:32:53.679635
038ece0d-21dd-4034-91e5-25047b600e0d	intermediate	Bangun Ruang II	Kalau aku mengisi air di bak, berapa banyak air yang kubutuhkan?	2025-05-18 03:34:40.639604
1ea1b58d-743b-4e9d-b14c-ae0577cf79eb	intermediate	Sudut dan Skala	Tapi dunia lebih besar dari Peta!	2025-05-18 03:36:20.732491
ecc4b926-9b9b-401c-ae44-4136a19373e0	advanced	Operasi Bilangan Campurana	Mana yang lebih dulu? Tambah atau kali?	2025-05-18 03:37:37.228311
e41c73df-4617-49a0-9bf3-148f84a0a9f8	advanced	Desimal dan Persen	Hum.. Nilaiku 75%. Berapa soal yang kujawab benar?	2025-05-18 03:38:35.534364
1cc5e8f7-b1f5-4981-9bb2-1d6e92e65276	advanced	Bangun Ruang III	Dunia lebih dari kubus!	2025-05-18 03:39:19.248027
47092eea-11f8-4a67-9d2e-360d61b43774	advanced	Perbandingan dan Kecepatan	Aku berlari lebih cepat dari temanku!	2025-05-18 03:39:54.047366
\.


--
-- Data for Name: group_comments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.group_comments (id, group_id, user_id, content, created_at) FROM stdin;
41857eb5-e7cd-46c4-8d84-d901104ef4a6	32e859a2-835f-43f1-b326-35c076a393a5	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	gett, kmu frontend yaa	2025-05-14 14:50:36.431972
\.


--
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.group_members (user_id, group_id, joined_at) FROM stdin;
3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	32e859a2-835f-43f1-b326-35c076a393a5	2025-05-14 14:41:21.382746
bcc3aef4-2c8c-4625-9292-0e3910b4d2aa	32e859a2-835f-43f1-b326-35c076a393a5	2025-05-14 14:45:34.81441
3cb1bf79-d67f-4b68-9cec-71cf073dd3c6	9b243b37-1f20-4788-a4c5-57a873300568	2025-05-15 08:19:07.283046
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	7e3bb412-a03d-4d34-9b16-d166ec88e506	2025-05-20 07:42:28.69495
bcc3aef4-2c8c-4625-9292-0e3910b4d2aa	7e3bb412-a03d-4d34-9b16-d166ec88e506	2025-05-20 07:42:29.552716
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	f267aabe-28e1-4230-a79b-190116af3372	2025-05-20 07:44:09.395198
4b82627a-882c-4941-a324-fbbed118b326	f267aabe-28e1-4230-a79b-190116af3372	2025-05-20 07:44:10.239159
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	0dc34041-105e-4e6e-8971-10c9d9c8f223	2025-05-20 07:56:53.493857
e1376895-343d-4f85-a623-a9fba1139a54	0dc34041-105e-4e6e-8971-10c9d9c8f223	2025-05-20 07:56:54.359408
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	ca5de8e3-34bf-4b85-8b30-88854139d018	2025-05-20 07:57:01.449735
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	12d11719-d06e-4552-a1e2-9b9f5937d486	2025-05-20 07:57:14.362394
e5993fe5-2ceb-4825-b310-700cadb7afd2	12d11719-d06e-4552-a1e2-9b9f5937d486	2025-05-20 07:57:15.194464
\.


--
-- Data for Name: level_progress; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.level_progress (user_id, level, completed_course_ids, last_updated) FROM stdin;
\.


--
-- Data for Name: pomodoro_sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.pomodoro_sessions (id, user_id, type, duration_minutes, started_at, created_at) FROM stdin;
1182a239-c5ea-4042-b23a-727a7973c184	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	pomodoro	25	2025-05-14 14:17:22.313912	2025-05-14 14:17:22.313912
8764196b-c8b6-4210-92bf-693e638a905e	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	short_break	5	2025-05-14 14:17:57.99948	2025-05-14 14:17:57.99948
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.quiz_answers (user_id, quiz_id, selected_answer, answered_at) FROM stdin;
\.


--
-- Data for Name: task_groups; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.task_groups (id, name, created_by, created_at) FROM stdin;
a7c4f6af-266e-4f6b-8a34-152fb4f5dcfb	Group 1	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:13:23.189188
0bb75bb5-ec00-4064-9239-80be2e745132	Group 1	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:18:22.016118
31050861-5e5d-4a63-90fa-a328e6eeb4b5	Group 1	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:18:30.806059
101b48d6-d955-480d-b36d-aaa0cbb4b2ad	Group 1	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:18:57.451203
280a7f70-5524-4506-9f80-7a33d7ee8681	Group 1	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:19:12.739231
350d8acb-70fa-4f68-afda-658df6ab434e	test	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:20:06.533257
e6b22b02-80aa-4b2c-a8e7-0334be8ee573	test	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:21:21.949452
2e3e5819-c29b-45bc-b88b-3e4e649ddfb8	test	7ac56c96-ff62-4108-8391-3797f12c1d9e	2025-05-14 13:22:13.432001
2af42475-33c0-4b28-9394-35e9db5bbc3d	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:19:42.656633
9168ffab-216b-4b34-972a-600b3505b18f	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:20:29.418832
18b4059e-fd02-4b09-ae98-b3a6b6c3ef6f	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:21:30.646068
1495624a-becc-4d50-b771-7121ace2be6c	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:24:22.686868
0b4ddab2-5d6c-413e-95ac-c9bbcbd31d4e	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:25:41.613046
10b4e03b-99f4-496f-b227-06948c60d0c8	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:28:43.785891
b7be4246-93e7-42b0-b3fb-bb9cd6f25236	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:28:56.960555
06116cc9-ac9d-40bd-9438-5cafcb5791ea	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:30:32.027064
b22e1a4d-b8ae-4bb4-b0d8-061cef4570fb	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:31:39.473308
b31e485d-a617-4cc4-9938-4f5b845b1e4f	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:32:09.294279
3461d86f-bced-4e1d-a548-f3bece043bbe	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:32:47.14117
b20a3698-2afa-4bcb-aa56-8f2b0c65fb86	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:33:31.396633
5087c3d8-4b5a-4010-964b-4476392b0b64	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:34:10.431617
8f2bae2a-0277-488e-8a08-7f57c6650b45	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:38:57.626553
32e859a2-835f-43f1-b326-35c076a393a5	Finpro SBD	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:41:21.091047
9b243b37-1f20-4788-a4c5-57a873300568	testes	3cb1bf79-d67f-4b68-9cec-71cf073dd3c6	2025-05-15 08:19:06.251449
7e3bb412-a03d-4d34-9b16-d166ec88e506	Fisika Listrik	fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	2025-05-20 07:42:28.395738
f267aabe-28e1-4230-a79b-190116af3372	Fisika Listrik	fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	2025-05-20 07:44:09.13281
0dc34041-105e-4e6e-8971-10c9d9c8f223	Fisika 	fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	2025-05-20 07:56:53.214796
ca5de8e3-34bf-4b85-8b30-88854139d018	Fisika 	fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	2025-05-20 07:57:01.183498
12d11719-d06e-4552-a1e2-9b9f5937d486	Fisika 	fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	2025-05-20 07:57:14.10643
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.tasks (id, group_id, title, description, status, assigned_to, created_at, severity) FROM stdin;
98ded0c7-f19f-4286-81e5-95ee20de299f	32e859a2-835f-43f1-b326-35c076a393a5	Backend	Fitur task management	done	3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	2025-05-14 14:48:35.332381	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, name, username, email, password, role, level, created_at, profile_picture_url) FROM stdin;
4b82627a-882c-4941-a324-fbbed118b326	love	lovelak	love@example.com	$2b$10$Um3sdGM72nLApGVY/hYBZeaDrkpHginUwvNHCi6peus3jqIrP4u5S	student	beginner	2025-05-12 14:46:59.308397	\N
e5993fe5-2ceb-4825-b310-700cadb7afd2	John Doe	johndoe	john@example.com	$2b$10$oxedfDXFxHzHwg0RZwPCDuRMo88OfZd8QJY/.30XCC8Bvlnmvgp0S	student	beginner	2025-05-13 04:06:40.446889	\N
6b961a37-439b-48dc-b429-5bc550466456	try out 1	test1	test.username@gmail.com	$2b$10$8eZV..C8HZuVZfepUO.Vve1I5O0Yy8ZhjcFlpTA51ZZ1qPw6EHC2m	student	beginner	2025-05-13 04:24:41.693657	\N
7ac56c96-ff62-4108-8391-3797f12c1d9e	test subject 2	test2	test@testing.com	$2b$10$NgfARbqGOIx7KS505A7qB.pgXDHApN0qWbduvHBL52ybJqt2/DdLe	student	beginner	2025-05-14 13:09:51.508251	\N
3dfa8f13-dfd6-4c62-b4b3-57b9e3e8d6dd	natt	imyourdoctor	natt@example.com	$2b$10$6rYMWmfUAAzCG8Q4oir1D.XnrxkSAAmUJOVNibCULaWvliu1dex6i	student	\N	2025-05-14 14:13:17.334894	\N
bcc3aef4-2c8c-4625-9292-0e3910b4d2aa	grace	phiget	grace@example.com	$2b$10$rA6HC4lpKwywi.thq6Ey4OqBtLkQoz70T86K6ZxxgPruGb.VkgoF.	student	\N	2025-05-14 14:44:33.87921	\N
3cb1bf79-d67f-4b68-9cec-71cf073dd3c6	Mina	minariii	mina@example.com	$2b$10$p9t6x0o3VoikAYCgPqylvOufD8xJIDI96fAdSZNdzBHS70HdURQ4e	student	beginner	2025-05-15 06:52:26.933542	https://res.cloudinary.com/dr29vl50w/image/upload/v1747291946/profile_pictures/t7vihvcyyj1byk2yhmmp.png
46435a77-3f74-405c-a8bb-aea065808e94	test subject 4	test4	test@usernames.com	$2b$10$OU9jkkCHfgIe7iwbuoRWbuSCObEvn09N1WbqYIu3zAK1mNbxy/Lw.	student	advanced	2025-05-17 07:38:47.10277	\N
94087007-9e14-433d-b764-838bf625cdcb	Test subject 5	test5	tests.usernames@gmail.com	$2b$10$yiU0I6FWMj6AizUXGjItleay6APYSNAIGJyzc7kh/tUvazwVSpYMu	student	advanced	2025-05-17 07:39:29.835476	\N
c7e92f3a-5f11-4a23-ab66-47dbcb348d36	Nana	banananana	nana@anan.com	$2b$10$c6Qjwkv17bCulxIsw1lS9OJJPgObRSibkUAEIilI9d/ew.B64ajem	student	intermediate	2025-05-17 07:43:36.521336	\N
18d0f148-c13e-45c2-a9eb-5fc1e2575fdb	Test subject 4	testy4	tes@usernam.com	$2b$10$iyPpoLIf1.rr63SItlvSK.CEwbp7KDPrJEHrMduIwumIaKuIBcHF2	student	intermediate	2025-05-17 07:46:55.576949	\N
1bdceb3d-a5a9-42a4-9005-77118ecd227a	x xxxx xx	xmen	x@men.com	$2b$10$wyenINnAJagpQAhYl6122..ototjli1UDWYfECfzg1MJQ9HFrMIvW	student	intermediate	2025-05-17 07:57:15.021375	\N
4bb95a02-6728-4aef-8009-7042a3a7e3d8	yeay	yeay	yeay@yeay.com	$2b$10$z4gtgyntZGj8Lzkhl6BM4eqGQ9pLG/XTy7SFYIUgHq1ciqV0/BwAu	student	beginner	2025-05-17 07:58:09.498843	\N
e1376895-343d-4f85-a623-a9fba1139a54	last test	lasttest	last@test	$2b$10$CiZN4ZLQ9ObZtumPSHsxTOmnKCGpMFkpA.EDwxrIkc0N3AaecOz1m	student	intermediate	2025-05-17 08:00:06.653504	\N
4ec3c0b3-b78e-48a1-9559-7177f9099f94	Test Change Name	intermediate	int@test.com	$2b$10$y.mnGLdlOEHp1HDsOV4mRu7b1i0xEXf1fh31c8oNn1wWK8ibHjupa	student	intermediate	2025-05-15 16:55:13.108149	\N
fa9ed9c2-fe9b-4236-95e1-323d2098d3e6	Siti Amalia Nurfaidah	amelamel	siti.amalia31@ui.ac.id	$2b$10$OgseLG/s1kdLQAWQKNNxqOuILn9cES1WjyWhZV147bXEn5Sh0Soie	student	intermediate	2025-05-20 06:58:26.884058	\N
\.


--
-- Name: course_materials course_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_materials
    ADD CONSTRAINT course_materials_pkey PRIMARY KEY (id);


--
-- Name: course_quizzes course_quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_quizzes
    ADD CONSTRAINT course_quizzes_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: group_comments group_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_comments
    ADD CONSTRAINT group_comments_pkey PRIMARY KEY (id);


--
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (user_id, group_id);


--
-- Name: level_progress level_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_progress
    ADD CONSTRAINT level_progress_pkey PRIMARY KEY (user_id, level);


--
-- Name: pomodoro_sessions pomodoro_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pomodoro_sessions
    ADD CONSTRAINT pomodoro_sessions_pkey PRIMARY KEY (id);


--
-- Name: quiz_answers quiz_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_pkey PRIMARY KEY (user_id, quiz_id);


--
-- Name: task_groups task_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.task_groups
    ADD CONSTRAINT task_groups_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: course_materials course_materials_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_materials
    ADD CONSTRAINT course_materials_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: course_quizzes course_quizzes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_quizzes
    ADD CONSTRAINT course_quizzes_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: group_comments group_comments_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_comments
    ADD CONSTRAINT group_comments_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.task_groups(id) ON DELETE CASCADE;


--
-- Name: group_comments group_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_comments
    ADD CONSTRAINT group_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: group_members group_members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.task_groups(id) ON DELETE CASCADE;


--
-- Name: group_members group_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: level_progress level_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.level_progress
    ADD CONSTRAINT level_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: pomodoro_sessions pomodoro_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pomodoro_sessions
    ADD CONSTRAINT pomodoro_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: quiz_answers quiz_answers_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.course_quizzes(id) ON DELETE CASCADE;


--
-- Name: quiz_answers quiz_answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: task_groups task_groups_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.task_groups
    ADD CONSTRAINT task_groups_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: tasks tasks_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: tasks tasks_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.task_groups(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

