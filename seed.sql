--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2020-07-23 23:51:31

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
-- TOC entry 205 (class 1259 OID 25584)
-- Name: chefs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text,
    avatar_url text,
    created_at timestamp without time zone
);


ALTER TABLE public.chefs OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 25582)
-- Name: chefs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chefs_id_seq OWNER TO postgres;

--
-- TOC entry 2836 (class 0 OID 0)
-- Dependencies: 204
-- Name: chefs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;


--
-- TOC entry 203 (class 1259 OID 25565)
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    image text,
    ingredients text[],
    preparation text[],
    information text,
    title text,
    chef_id integer,
    created_at timestamp without time zone
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 25563)
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO postgres;

--
-- TOC entry 2837 (class 0 OID 0)
-- Dependencies: 202
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- TOC entry 2696 (class 2604 OID 25587)
-- Name: chefs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);


--
-- TOC entry 2695 (class 2604 OID 25568)
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- TOC entry 2830 (class 0 OID 25584)
-- Dependencies: 205
-- Data for Name: chefs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chefs (id, name, avatar_url, created_at) FROM stdin;
1	Fabiano Melo	https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-18 00:35:55.745
2	Joseph Cipri	https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-21 21:45:47.68
3	Fizpas Tel	https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 20:47:15.543
4	Júlia Kinoto	https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 20:51:55.492
5	Isadora Caetano	https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 20:52:43.219
6	Hadu Ken	https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 20:53:45.412
7	José Serrano	https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 21:02:55.79
8	Erick Noah	https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=800&q=80	2020-07-22 21:10:48.2
\.


--
-- TOC entry 2828 (class 0 OID 25565)
-- Dependencies: 203
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, image, ingredients, preparation, information, title, chef_id, created_at) FROM stdin;
3	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/asinha.png	{"12 encontros de asinha de galinha, temperados a gosto","2 colheres de sopa de farinha de trigo","1/2 xícara (chá) de óleo","1 xícara de molho barbecue"}	{"Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.","Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.","Para servir fica bonito com salada, ou abuse da criatividade."}	Sem informações	Asinhas de frango ao barbecue	1	2020-07-17 22:20:10.262
4	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/lasanha.png	{"massa pronta de lasanha","400 g de presunto","400 g de mussarela ralada","2 copos de requeijão","150 g de mussarela para gratinar"}	{"Em uma panela, coloque a manteiga para derreter.","Acrescente a farinha de trigo e misture bem com auxílio de um fouet.","Adicione o leite e misture até formar um creme homogêneo.","Tempere com sal, pimenta e noz-moscada a gosto.","Desligue o fogo e acrescente o creme de leite; misture bem e reserve."}	Recheie a lasanha com o que preferir.	Lasanha mac n' cheese	1	2020-07-17 22:20:10.262
5	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/macarrao.png	{"1 pacote de macarrão 500 g (tipo do macarrão a gosto)","1 saquinho de alho granulado","1/2 tablete de manteiga (não use margarina)","1 colher (sopa) de azeite extra virgem","ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto)",sal,"1 dente de alho","gengibre em pó a gosto","1 folha de louro"}	{"Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.","Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.","Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.","O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.","Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas."}	Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. Coloque direto na frigideira.	Espaguete ao alho	4	2020-07-17 22:20:10.262
6	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/doce.png	{"1 kg de batata - doce","100 g de manteiga","3 ovos","1 pacote de coco seco ralado (100 g)","3 colheres (sopa) de açúcar 1 lata de Leite Moça","1 colher (sopa) de fermento em pó","manteiga para untar","açúcar de confeiteiro"}	{"Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.","Junte a manteiga,os ovos, o coco ralado,o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.","Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos. Depois de frio, polvilhe, com o açúcar de confeiteiro e corte em quadrados."}	Sem informações	Docinhos pão-do-céu	7	2020-07-17 22:20:10.262
2	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/pizza.png	{"1 xícara (chá) de leite","1 ovo","1 colher (chá) de sal","1 colher (chá) de açúcar","1 colher (sopa) de margarina","1 e 1/2 xícara (chá) de farinha de trigo","1 colher (sobremesa) de fermento em pó","1/2 lata de molho de tomate","250 g de mussarela ralada grossa","2 tomates fatiados","azeitona picada","orégano a gosto"}	{"No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.","Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.","Retire do forno e despeje o molho de tomate.","Cubra a massa com mussarela ralada, tomate e orégano a gosto.","Leve novamente ao forno até derreter a mussarela."}	Pizza de liquidificador é uma receita deliciosa e supersimples de preparar. Feita toda no liquidificador, ela é bem prática para o dia a dia. Aqui no TudoGostoso você também encontra diversas delícias práticas feitas no liquidificador: massa de panqueca, torta de frango de liquidificador, pão de queijo de liquidificador, bolo de banana, bolo de chocolate e muito mais!	Pizza 4 estações	3	2020-07-17 22:20:10.262
1	https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/burger.png	{"3 kg de carne moída (escolha uma carne magra e macia)","300 g de bacon moído","1 ovo","3 colheres (sopa) de farinha de trigo","3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador","30 ml de água gelada"}	{"Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.","Faça porções de 90 g a 100 g.","Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.","Faça um de cada vez e retire o aro logo em seguida.","Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).","Faça no máximo 4 camadas por forma e leve para congelar.","Retire do congelador, frite ou asse e está pronto."}	Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres! Você sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açogueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar o hambúrguer no meio do pão e adicionar outros ingredientes, como queijom tomates e alface.	Triplo bacon burger	1	2020-07-17 22:20:10.262
\.


--
-- TOC entry 2838 (class 0 OID 0)
-- Dependencies: 204
-- Name: chefs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chefs_id_seq', 9, true);


--
-- TOC entry 2839 (class 0 OID 0)
-- Dependencies: 202
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 16, true);


--
-- TOC entry 2700 (class 2606 OID 25589)
-- Name: chefs chefs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);


--
-- TOC entry 2698 (class 2606 OID 25570)
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


-- Completed on 2020-07-23 23:51:32

--
-- PostgreSQL database dump complete
--

