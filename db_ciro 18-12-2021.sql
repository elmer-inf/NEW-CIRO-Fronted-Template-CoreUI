--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2021-12-18 17:07:18

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
-- TOC entry 6 (class 2615 OID 16396)
-- Name: ciro; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ciro;


ALTER SCHEMA ciro OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 19341)
-- Name: tbl_archivo; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_archivo (
    arc_id bigint NOT NULL,
    arc_archivo character varying(200),
    arc_date_time_create timestamp without time zone,
    arc_delete boolean,
    arc_date_time_update timestamp without time zone,
    arc_usuario_id integer,
    arc_evento_id bigint
);


ALTER TABLE ciro.tbl_archivo OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 19340)
-- Name: tbl_archivo_arc_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_archivo_arc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_archivo_arc_id_seq OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 210
-- Name: tbl_archivo_arc_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_archivo_arc_id_seq OWNED BY ciro.tbl_archivo.arc_id;


--
-- TOC entry 213 (class 1259 OID 19348)
-- Name: tbl_evento_riesgo; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_evento_riesgo (
    eve_id bigint NOT NULL,
    eve_cobertura_seguro boolean,
    eve_codigo character varying(20),
    eve_codigo_inicial character varying(50),
    eve_comercio_afectado boolean,
    eve_date_time_create timestamp without time zone,
    eve_delete boolean,
    eve_descripcion character varying(500),
    eve_descripcion_completa character varying(1000),
    eve_detalle_estado character varying(1000),
    eve_detalle_evento_critico character varying(1000),
    eve_entidad_afectada boolean,
    eve_estado_evento character varying(30),
    eve_estado_registro character varying(30),
    eve_estado_reportado character varying(50),
    eve_evento_critico character varying(100),
    eve_fecha_desc date,
    eve_fecha_fin date,
    eve_fecha_ini date,
    eve_gasto_asociado real,
    eve_hora_desc time without time zone,
    eve_hora_fin time without time zone,
    eve_hora_ini time without time zone,
    eve_id_area_correlativo integer,
    eve_linea_negocio character varying(100),
    eve_monto_perdida real,
    eve_monto_perdida_riesgo real,
    eve_monto_recuperado real,
    eve_monto_recuperado_seguro real,
    eve_otros character varying(500),
    eve_perdida_mercado real,
    eve_recuperacion_activo character varying(500),
    eve_riesgo_relaciionado character varying(100),
    eve_tipo_evento character varying(10),
    eve_total_perdida real,
    eve_trimestre character varying(50),
    eve_date_time_update timestamp without time zone,
    des_usuario_id integer,
    eve_agencia_id bigint,
    eve_area_id bigint,
    eve_canal_asfi_id bigint,
    eve_cargo_id bigint,
    eve_ciudad_id bigint,
    eve_clase_evento_id bigint,
    eve_cumplimiento_id bigint,
    eve_desc_servicio_id bigint,
    eve_efecto_perdida_id bigint,
    eve_entidad_id bigint,
    eve_estrategico_id bigint,
    eve_factor_riesgo_id bigint,
    eve_fraude_id bigint,
    eve_fuente_inf_id bigint,
    eve_gobierno_id bigint,
    eve_impacto_id bigint,
    eve_legal_id bigint,
    eve_lgi_id bigint,
    eve_linea_asfi_id bigint,
    eve_liquidez_id bigint,
    eve_moneda_id bigint,
    eve_ope_pro_ser_id bigint,
    eve_operacion_id bigint,
    eve_operativo_id bigint,
    eve_poliza_seguro_id bigint,
    eve_procedimiento_id bigint,
    eve_proceso_id bigint,
    eve_reputacional_id bigint,
    eve_seguridad_id bigint,
    eve_sub_evento_id bigint,
    eve_subcategorizacion_id bigint,
    eve_tasa_cambio_id character varying(5),
    eve_tipo_evento_perdida_id bigint,
    eve_tipo_servicio_id bigint,
    eve_unidad_id bigint
);


ALTER TABLE ciro.tbl_evento_riesgo OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 19347)
-- Name: tbl_evento_riesgo_eve_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_evento_riesgo_eve_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_evento_riesgo_eve_id_seq OWNER TO postgres;

--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 212
-- Name: tbl_evento_riesgo_eve_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_evento_riesgo_eve_id_seq OWNED BY ciro.tbl_evento_riesgo.eve_id;


--
-- TOC entry 231 (class 1259 OID 28149)
-- Name: tbl_matriz_oportunidad; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_matriz_oportunidad (
    opo_id bigint NOT NULL,
    opo_causa character varying(500),
    opo_codigo character varying(20),
    opo_consecuencia character varying(500),
    opo_control_comentario character varying(1500),
    opo_controles text,
    opo_controles_tiene boolean,
    opo_date_time_create timestamp without time zone,
    opo_definicion character varying(500),
    opo_delete boolean,
    eve_estado_registro character varying(30),
    opo_factor character varying(255),
    opo_fecha_evaluacion date,
    opo_id_macro_correlativo integer,
    opo_planes_accion text,
    opo_date_time_update timestamp without time zone,
    opo_usuario_id integer,
    opo_area_id bigint,
    opo_dueno_cargo_id bigint,
    opo_foda_desc_id bigint,
    opo_foda_id bigint,
    opo_fortaleza_id bigint,
    opo_grupo_interes_id bigint,
    opo_impacto_opor_id bigint,
    opo_probabilidad_id bigint,
    opo_procedimiento_id bigint,
    opo_proceso_id bigint,
    opo_responsable_cargo_id bigint,
    opo_unidad_id bigint
);


ALTER TABLE ciro.tbl_matriz_oportunidad OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 28148)
-- Name: tbl_matriz_oportunidad_opo_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_matriz_oportunidad_opo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_matriz_oportunidad_opo_id_seq OWNER TO postgres;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 230
-- Name: tbl_matriz_oportunidad_opo_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_matriz_oportunidad_opo_id_seq OWNED BY ciro.tbl_matriz_oportunidad.opo_id;


--
-- TOC entry 225 (class 1259 OID 27973)
-- Name: tbl_matriz_riesgo; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_matriz_riesgo (
    rie_id bigint NOT NULL,
    rie_causa character varying(500),
    rie_codigo character varying(20),
    rie_consecuencia character varying(500),
    rie_control_comentario character varying(1500),
    rie_control_objetivo character varying(100),
    rie_controles text,
    rie_controles_tiene boolean,
    rie_date_time_create timestamp without time zone,
    rie_criterio_impacto character varying(255),
    rie_criterio_probabilidad character varying(255),
    rie_def_concatenado character varying(2000),
    rie_definicion character varying(500),
    rie_delete boolean,
    eve_estado_registro character varying(30),
    rie_fecha_evaluacion date,
    rie_id_unidad_correlativo integer,
    rie_identificado_otro character varying(255),
    rie_impacto_usd real,
    rie_monetario boolean,
    rie_planes_accion text,
    rie_seguimiento_comen character varying(255),
    rie_seguimiento_fecha date,
    rie_seguimiento_obs character varying(255),
    rie_date_time_update timestamp without time zone,
    rie_usuario_id integer,
    rie_area_id bigint,
    rie_control_id bigint,
    rie_dueno_cargo_id bigint,
    rie_efecto_perdida_id bigint,
    rie_factor_riesgo_id bigint,
    rie_identificado_id bigint,
    rie_impacto_id bigint,
    rie_perdida_asfi_id bigint,
    rie_probabilidad_id bigint,
    rie_procedimiento_id bigint,
    rie_proceso_id bigint,
    rie_responsable_cargo_id bigint,
    rie_unidad_id bigint
);


ALTER TABLE ciro.tbl_matriz_riesgo OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 27972)
-- Name: tbl_matriz_riesgo_rie_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_matriz_riesgo_rie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_matriz_riesgo_rie_id_seq OWNER TO postgres;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 224
-- Name: tbl_matriz_riesgo_rie_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_matriz_riesgo_rie_id_seq OWNED BY ciro.tbl_matriz_riesgo.rie_id;


--
-- TOC entry 223 (class 1259 OID 19655)
-- Name: tbl_observacion; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_observacion (
    obs_id bigint NOT NULL,
    obs_date_time_create timestamp without time zone,
    obs_delete boolean,
    obs_estado character varying(50),
    obs_lista_observacion character varying(500),
    obs_nota character varying(1000),
    obs_date_time_update timestamp without time zone,
    obs_usuario_id integer,
    obs_evento_id bigint,
    obs_matriz_riesgo_id bigint,
    obs_modulo character varying(50),
    obs_matriz_oportunidad_id bigint
);


ALTER TABLE ciro.tbl_observacion OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 19654)
-- Name: tbl_observacion_obs_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_observacion_obs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_observacion_obs_id_seq OWNER TO postgres;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 222
-- Name: tbl_observacion_obs_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_observacion_obs_id_seq OWNED BY ciro.tbl_observacion.obs_id;


--
-- TOC entry 215 (class 1259 OID 19366)
-- Name: tbl_tabla_descripcion; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_descripcion (
    des_id bigint NOT NULL,
    des_clave character varying(50),
    des_date_time_create timestamp without time zone,
    des_delete boolean,
    des_descripcion character varying(1000),
    des_nivel2_id integer,
    des_nivel3_id integer,
    des_nombre character varying(1000),
    des_date_time_update timestamp without time zone,
    des_usuario_id integer,
    des_tabla_id bigint,
    des_campo_a character varying(1000),
    des_campo_b character varying(1000),
    des_campo_c character varying(1000),
    des_campo_d character varying(1000)
);


ALTER TABLE ciro.tbl_tabla_descripcion OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 19365)
-- Name: tbl_tabla_descripcion_des_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_descripcion_des_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_descripcion_des_id_seq OWNER TO postgres;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 214
-- Name: tbl_tabla_descripcion_des_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_descripcion_des_id_seq OWNED BY ciro.tbl_tabla_descripcion.des_id;


--
-- TOC entry 227 (class 1259 OID 28052)
-- Name: tbl_tabla_descripcion_matriz_oportunidad; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_descripcion_matriz_oportunidad (
    des_id bigint NOT NULL,
    des_campo_a character varying(1000),
    des_campo_b character varying(1000),
    des_campo_c character varying(1000),
    des_campo_d character varying(1000),
    des_date_time_create timestamp without time zone,
    des_delete boolean,
    des_nombre character varying(1000),
    des_date_time_update timestamp without time zone,
    des_usuario_id integer,
    des_tabla_id bigint,
    des_nivel2_id integer
);


ALTER TABLE ciro.tbl_tabla_descripcion_matriz_oportunidad OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 28051)
-- Name: tbl_tabla_descripcion_matriz_oportunidad_des_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_descripcion_matriz_oportunidad_des_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_descripcion_matriz_oportunidad_des_id_seq OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 226
-- Name: tbl_tabla_descripcion_matriz_oportunidad_des_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_descripcion_matriz_oportunidad_des_id_seq OWNED BY ciro.tbl_tabla_descripcion_matriz_oportunidad.des_id;


--
-- TOC entry 219 (class 1259 OID 19574)
-- Name: tbl_tabla_descripcion_matriz_riesgo; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_descripcion_matriz_riesgo (
    des_id bigint NOT NULL,
    des_campo_a character varying(1000),
    des_campo_b character varying(1000),
    des_campo_c character varying(1000),
    des_campo_d character varying(1000),
    des_campo_e real,
    des_campo_f real,
    des_date_time_create timestamp without time zone,
    des_delete boolean,
    des_nombre character varying(1000),
    des_date_time_update timestamp without time zone,
    des_usuario_id integer,
    des_tabla_id bigint,
    des_campo_g character varying(1000)
);


ALTER TABLE ciro.tbl_tabla_descripcion_matriz_riesgo OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 19573)
-- Name: tbl_tabla_descripcion_matriz_riesgo_des_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_descripcion_matriz_riesgo_des_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_descripcion_matriz_riesgo_des_id_seq OWNER TO postgres;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 218
-- Name: tbl_tabla_descripcion_matriz_riesgo_des_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_descripcion_matriz_riesgo_des_id_seq OWNED BY ciro.tbl_tabla_descripcion_matriz_riesgo.des_id;


--
-- TOC entry 217 (class 1259 OID 19375)
-- Name: tbl_tabla_lista; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_lista (
    lis_id bigint NOT NULL,
    lis_date_time_create timestamp without time zone,
    lis_delete boolean,
    lis_nivel2 integer,
    lis_nivel3 integer,
    lis_nombre_tabla character varying(100),
    lis_date_time_update timestamp without time zone,
    lis_usuario_id integer
);


ALTER TABLE ciro.tbl_tabla_lista OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 19374)
-- Name: tbl_tabla_lista_lis_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_lista_lis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_lista_lis_id_seq OWNER TO postgres;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 216
-- Name: tbl_tabla_lista_lis_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_lista_lis_id_seq OWNED BY ciro.tbl_tabla_lista.lis_id;


--
-- TOC entry 229 (class 1259 OID 28061)
-- Name: tbl_tabla_lista_matriz_oportunidad; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_lista_matriz_oportunidad (
    lis_id bigint NOT NULL,
    lis_date_time_create timestamp without time zone,
    lis_delete boolean,
    lis_nombre_tabla character varying(100),
    lis_date_time_update timestamp without time zone,
    lis_usuario_id integer,
    lis_nivel2 integer
);


ALTER TABLE ciro.tbl_tabla_lista_matriz_oportunidad OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 28060)
-- Name: tbl_tabla_lista_matriz_oportunidad_lis_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_lista_matriz_oportunidad_lis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_lista_matriz_oportunidad_lis_id_seq OWNER TO postgres;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 228
-- Name: tbl_tabla_lista_matriz_oportunidad_lis_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_lista_matriz_oportunidad_lis_id_seq OWNED BY ciro.tbl_tabla_lista_matriz_oportunidad.lis_id;


--
-- TOC entry 221 (class 1259 OID 19583)
-- Name: tbl_tabla_lista_matriz_riesgo; Type: TABLE; Schema: ciro; Owner: postgres
--

CREATE TABLE ciro.tbl_tabla_lista_matriz_riesgo (
    lis_id bigint NOT NULL,
    lis_date_time_create timestamp without time zone,
    lis_delete boolean,
    lis_nombre_tabla character varying(100),
    lis_date_time_update timestamp without time zone,
    lis_usuario_id integer
);


ALTER TABLE ciro.tbl_tabla_lista_matriz_riesgo OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 19582)
-- Name: tbl_tabla_lista_matriz_riesgo_lis_id_seq; Type: SEQUENCE; Schema: ciro; Owner: postgres
--

CREATE SEQUENCE ciro.tbl_tabla_lista_matriz_riesgo_lis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ciro.tbl_tabla_lista_matriz_riesgo_lis_id_seq OWNER TO postgres;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 220
-- Name: tbl_tabla_lista_matriz_riesgo_lis_id_seq; Type: SEQUENCE OWNED BY; Schema: ciro; Owner: postgres
--

ALTER SEQUENCE ciro.tbl_tabla_lista_matriz_riesgo_lis_id_seq OWNED BY ciro.tbl_tabla_lista_matriz_riesgo.lis_id;


--
-- TOC entry 3215 (class 2604 OID 19344)
-- Name: tbl_archivo arc_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_archivo ALTER COLUMN arc_id SET DEFAULT nextval('ciro.tbl_archivo_arc_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 19351)
-- Name: tbl_evento_riesgo eve_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo ALTER COLUMN eve_id SET DEFAULT nextval('ciro.tbl_evento_riesgo_eve_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 28152)
-- Name: tbl_matriz_oportunidad opo_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad ALTER COLUMN opo_id SET DEFAULT nextval('ciro.tbl_matriz_oportunidad_opo_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 27976)
-- Name: tbl_matriz_riesgo rie_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo ALTER COLUMN rie_id SET DEFAULT nextval('ciro.tbl_matriz_riesgo_rie_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 19658)
-- Name: tbl_observacion obs_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_observacion ALTER COLUMN obs_id SET DEFAULT nextval('ciro.tbl_observacion_obs_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 19369)
-- Name: tbl_tabla_descripcion des_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion ALTER COLUMN des_id SET DEFAULT nextval('ciro.tbl_tabla_descripcion_des_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 28055)
-- Name: tbl_tabla_descripcion_matriz_oportunidad des_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_oportunidad ALTER COLUMN des_id SET DEFAULT nextval('ciro.tbl_tabla_descripcion_matriz_oportunidad_des_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 19577)
-- Name: tbl_tabla_descripcion_matriz_riesgo des_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_riesgo ALTER COLUMN des_id SET DEFAULT nextval('ciro.tbl_tabla_descripcion_matriz_riesgo_des_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 19378)
-- Name: tbl_tabla_lista lis_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista ALTER COLUMN lis_id SET DEFAULT nextval('ciro.tbl_tabla_lista_lis_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 28064)
-- Name: tbl_tabla_lista_matriz_oportunidad lis_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista_matriz_oportunidad ALTER COLUMN lis_id SET DEFAULT nextval('ciro.tbl_tabla_lista_matriz_oportunidad_lis_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 19586)
-- Name: tbl_tabla_lista_matriz_riesgo lis_id; Type: DEFAULT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista_matriz_riesgo ALTER COLUMN lis_id SET DEFAULT nextval('ciro.tbl_tabla_lista_matriz_riesgo_lis_id_seq'::regclass);


--
-- TOC entry 3454 (class 0 OID 19341)
-- Dependencies: 211
-- Data for Name: tbl_archivo; Type: TABLE DATA; Schema: ciro; Owner: postgres
--



--
-- TOC entry 3456 (class 0 OID 19348)
-- Dependencies: 213
-- Data for Name: tbl_evento_riesgo; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_evento_riesgo VALUES (1, true, 'AGLP-21-001', 'HTT20', true, '2021-11-03 13:08:56.795', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 1, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-03 13:10:00.504', 0, 20, 9, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (3, true, 'AGLP-21-002', 'HTT20', true, '2021-11-03 13:09:20.514', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 2, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-03 13:10:14.103', 0, 20, 9, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (15, NULL, 'GTIC-21-002', '', false, '2021-11-09 17:54:25.783', false, 'hbhb', 'bhbhb', '', NULL, false, NULL, 'Autorizado', NULL, NULL, '2021-11-10', NULL, '2021-11-03', NULL, '21:53:00', NULL, '17:56:00', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '2021-11-10 13:42:02.351', 0, NULL, 10, 21, NULL, NULL, NULL, NULL, NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, 52, NULL, NULL, 56, 52, 50, 45, 37, NULL, NULL, NULL, NULL, NULL, 52, NULL, 58, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (7, NULL, 'GTIC-21-004', '252gfgbgb', true, '2021-11-09 16:16:45.058', false, 'Descripción', 'Descripción comple', 'Detalle estado del evento', '52dv dvdfs', true, NULL, 'Autorizado', 'No reportado', 'No crítico', '2021-11-09', NULL, '2021-11-10', 252, NULL, NULL, NULL, 4, 'Línea de Negocio Emisor', 2525, 252, NULL, 141, NULL, 55, '4', 'Riesgo relacionado 2', NULL, 636363, '525dvf', '2021-11-10 13:44:29.541', 0, 2, 10, 22, 18, 5, 25, 51, 48, 40, 8, 51, 31, 52, 20, 52, 51, 51, 51, 56, 52, 50, 45, 37, 52, 54, 34, 32, 52, 52, 24, 58, NULL, 23, 46, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (13, true, 'GTIC-21-005', 'HTT20', true, '2021-11-09 17:25:08.139', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, NULL, NULL, NULL, 5, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-10 13:45:49.336', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (14, true, 'GTIC-21-006', 'HTT20', true, '2021-11-09 17:32:57.167', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 6, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-10 13:57:30.358', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (4, true, 'GTIC-21-007', 'HTT20', true, '2021-11-03 13:09:23.668', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 7, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-10 15:04:28.936', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (2, true, NULL, 'HTT20', true, '2021-11-03 13:09:17.397', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Pendiente', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-17 12:09:37.919', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (43, true, 'GTIC-21-021', 'HTT20', true, '2021-11-12 23:19:31.127', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 21, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-17 17:09:20.844', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (44, true, 'GTIC-21-022', 'HTT20', true, '2021-11-12 23:22:13.543', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 22, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-18 16:06:08.466', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (22, NULL, 'GTIC-21-001', 'DEF 445', true, '2021-11-10 09:53:54.729', false, 'Descripción Descripción Descripción', 'Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa', 'Detalle estado del evento Detalle estado del evento Detalle estado del evento', 'Detalle evento crítico Detalle evento crítico', true, NULL, 'Autorizado', 'No reportado', 'No crítico', '2021-11-25', NULL, '2021-10-31', 6, '12:50:00', NULL, '10:00:00', 1, 'Línea de Negocio Adquirente', 5, 3, 2525, 4, NULL, 5, '252', 'Riesgo relacionado 2', NULL, 5252, '01 2021', '2021-11-10 13:16:10.713', 0, 1, 10, 22, 18, NULL, 25, 51, 47, 40, 8, 51, 31, 52, 20, 52, 52, 51, 52, 56, 52, 50, 45, 37, 51, 54, 35, 32, 52, 51, 24, 58, NULL, 23, 46, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (21, NULL, 'GTIC-21-003', 'DEF 445', true, '2021-11-10 09:38:39.551', false, 'Descripción Descripción Descripción', 'Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa', 'Detalle estado del evento Detalle estado del evento Detalle estado del evento', 'Detalle evento crítico Detalle evento crítico', true, NULL, 'Autorizado', 'No reportado', 'No crítico', '2021-11-25', NULL, '2021-10-31', 6, '12:50:00', NULL, '10:00:00', 3, 'Línea de Negocio Adquirente', 5, 3, 2525, 4, NULL, 5, '252', 'Riesgo relacionado 2', NULL, 5252, '01 2021', '2021-11-10 13:42:37.756', 0, 1, 10, 22, 18, 4, 25, 51, 47, 40, 8, 51, 31, 52, 20, 52, 52, 51, 52, 56, 52, 50, 45, 37, 51, 54, 35, 32, 52, 51, 24, 58, NULL, 23, 46, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (23, true, NULL, 'HTT20', true, '2021-11-10 16:36:45.562', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Descartado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-10 16:37:12.075', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (38, true, 'GTIC-21-008', 'DDD 554', false, '2021-11-12 09:40:19.441', false, 'Descripción Descripción Descripción Descripción Descripción Descripción Descripción Descripción', 'Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa Descripción completa', 'Detalle estado del evento Detalle estado del evento Detalle estado del evento Detalle estado del evento Detalle estado del evento Detalle estado del evento', 'Detalle evento crítico Detalle evento crítico Detalle evento crítico', true, NULL, 'Autorizado', 'No reportado', 'No crítico', '2021-11-09', NULL, '2021-11-13', 1414, '10:20:00', NULL, '13:37:00', 8, 'Línea de Negocio Adquirente', 2020, NULL, 5252, 5252, NULL, 58888, '52521', 'Riesgo relacionado 2', NULL, 10000, '03 2021', '2021-11-12 13:00:30.506', 0, 2, 10, 22, 18, 6, 28, 51, 48, 40, 7, 52, 31, 51, 29, 52, 51, 51, 52, 56, 52, 49, 45, 38, 52, 54, 36, 33, 51, 52, 26, 58, NULL, 23, 46, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (39, true, 'GTIC-21-009', 'HTT20', true, '2021-11-12 12:21:26.963', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 9, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-12 13:01:59.342', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (40, true, 'GTIC-21-010', 'HTT20', true, '2021-11-12 13:02:46.316', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 10, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-12 13:05:40.205', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (41, true, 'GTIC-21-011', 'HTT20', true, '2021-11-12 13:10:19.388', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 11, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-12 14:50:10.909', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (42, true, NULL, 'HTT20', true, '2021-11-12 14:50:55.559', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Observado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-12 23:13:51.775', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (46, true, NULL, 'HTT20', true, '2021-11-12 23:26:45.462', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Observado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-12 23:29:25.434', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (50, true, NULL, 'HTT20', true, '2021-11-15 10:55:50.762', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Observado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 11:20:28.354', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (48, true, 'GTIC-21-012', 'HTT20', true, '2021-11-15 10:02:28.81', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 12, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 10:29:21.765', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (49, true, NULL, 'HTT20', true, '2021-11-15 10:30:11.453', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Descartado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 10:30:41.999', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (45, true, 'GTIC-21-013', 'HTT20', true, '2021-11-12 23:24:01.055', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 13, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 10:32:42.481', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (47, true, 'GTIC-21-014', 'HTT20', true, '2021-11-12 23:30:45.416', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 14, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 10:37:56.253', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (51, true, 'GTIC-21-015', 'HTT20', true, '2021-11-15 11:23:12.895', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 15, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 11:52:06.235', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (53, true, 'GTIC-21-016', 'HTT20', true, '2021-11-15 11:54:02.434', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 16, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 11:54:15.726', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (54, true, 'GTIC-21-017', 'HTT20', true, '2021-11-15 12:04:43.454', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 17, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-15 12:05:00.353', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (12, true, NULL, 'HTT20', true, '2021-11-09 17:23:50.294', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Observado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, NULL, NULL, NULL, 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-11-15 11:55:10.143', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (55, true, NULL, '445 DGD', true, '2021-11-15 17:51:53.405', false, 'Descripción', 'Descripción completa', 'Detalle estado del evento', 'Detalle evento crítico', true, NULL, 'Pendiente', 'Reportado', 'Crítico', '2021-11-12', NULL, '2021-11-02', 3333, '15:30:00', NULL, '10:00:00', 0, 'Línea de Negocio Adquirente', 252, 2222, 4444, 11, NULL, 4555, '111', 'Riesgo relacionado 2', NULL, 5, '02 2021', '2021-11-15 17:51:53.405', 0, 2, 10, 21, 18, 6, 25, 51, 48, 40, 7, 52, 30, 52, 20, 52, 51, 52, 52, 56, 52, 49, 45, 38, 51, 54, 36, 33, 52, 52, 24, 58, NULL, 23, 46, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (56, false, 'GTIC-21-018', 'fdfdf', true, '2021-11-15 18:21:25.802', false, 'gggg', 'fffff', 'fff', 'ffff', true, NULL, 'Autorizado', 'No reportado', 'No crítico', '2021-12-07', NULL, '2021-11-24', 114, '20:00:00', NULL, '22:00:00', 18, 'Línea de Negocio Adquirente', 14141, 141, 111, 111, NULL, 14141, '4141', 'Riesgo relacionado 2', NULL, 14141, '252', '2021-11-16 10:16:21.703', 0, 1, 10, 21, 18, 4, 25, 52, 47, 40, 7, 51, 30, 52, 20, 52, 51, 51, 52, 56, 52, 49, 45, 37, 52, 54, 34, 32, 52, 51, 24, 58, NULL, 23, 46, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (62, true, NULL, '444 JJHG', true, '2021-11-17 11:03:27.828', false, ' Descripción  evento', 'Descripción completa evento', '', ' Detalle evento crítico Detalle evento crítico', true, NULL, 'Observado', 'No reportado', 'No crítico', '2021-11-19', NULL, '2021-11-12', 52524, '13:52:00', NULL, '10:55:00', 0, 'Línea de Negocio Adquirente', 1425, 6, 5, 25242, NULL, 5254, '414252', 'Riesgo relacionado 2', 'A', 524252, '', '2021-11-17 11:07:26.535', 0, 1, 9, 22, 18, NULL, 25, NULL, 48, 40, 8, NULL, 31, NULL, NULL, 52, 52, NULL, NULL, 56, NULL, 50, 45, 38, 52, 54, NULL, 32, NULL, 52, 24, 58, NULL, 23, 46, 13);
INSERT INTO ciro.tbl_evento_riesgo VALUES (61, true, 'AGLP-21-003', '45 FFF', true, '2021-11-16 18:13:01.291', false, 'Descripción ', 'Descripción completa', 'Detalle estado del evento', 'Detalle evento crítico *', true, NULL, 'Autorizado', 'No reportado', 'Crítico', '2022-07-01', NULL, '2021-11-19', 555, '10:00:00', NULL, '10:20:00', 3, 'Línea de Negocio Adquirente', 22, 5252, 22, 88585, NULL, 5252, '5252', 'Riesgo relacionado 2', 'A', 5, '', '2021-11-17 12:06:04.556', 0, 1, 9, 21, 18, 4, 27, NULL, 47, 39, 8, NULL, 31, NULL, 19, 51, 51, 52, NULL, 55, NULL, 50, 45, 37, 52, 53, 34, 32, NULL, NULL, 26, 57, NULL, 23, 46, 13);
INSERT INTO ciro.tbl_evento_riesgo VALUES (58, true, NULL, 'gfg', false, '2021-11-16 12:08:43.426', false, 'ggg', 'ggg', 'gggg', 'fgfg', false, NULL, 'Descartado', 'No reportado', 'Crítico', '2021-11-16', NULL, '2021-11-11', 555, '12:10:00', NULL, '12:10:00', 0, 'Línea de Negocio Emisor', 555, 555, 555, 555, NULL, 555, '555', 'Riesgo relacionado 2', NULL, 555, 'fgfg', '2021-11-17 12:06:15.998', 0, 2, 10, 21, NULL, 6, 27, NULL, 44, 40, NULL, NULL, 31, NULL, 20, 52, 51, 52, 52, 56, 51, 50, 41, 38, 52, 54, 36, 33, 52, NULL, 26, 58, NULL, 23, 42, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (66, NULL, 'GTIC-21-019', '', false, '2021-11-17 12:09:22.473', false, ' b b b', '', '', 'b b b ', false, NULL, 'Autorizado', NULL, 'Crítico', '2021-11-12', NULL, '2021-11-12', 4141, '12:12:00', NULL, '12:12:00', 19, 'Línea de Negocio Adquirente', 411414, 414141, 414141, NULL, NULL, 4141, '4141', NULL, 'A', NULL, 'T4 / 2021', '2021-11-17 14:37:36.664', 0, NULL, 10, 22, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, 63, 63, NULL, NULL, 56, NULL, NULL, NULL, 38, NULL, NULL, NULL, 32, 52, NULL, NULL, NULL, NULL, 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (52, true, 'GTIC-21-020', 'HTT20', true, '2021-11-15 11:52:52.169', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 20, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-17 17:08:15.84', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '20', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (57, true, NULL, 'yhyhty', false, '2021-11-16 10:21:21.375', false, 'yyy', 'uuuu', '', 'hyhyh', false, NULL, 'Observado', 'No reportado', NULL, '2021-11-08', NULL, '2021-11-11', NULL, '10:22:00', NULL, '10:22:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14141', NULL, NULL, NULL, 'yhyh', '2021-11-17 17:11:13.682', 0, 2, 10, 21, NULL, 6, 25, NULL, NULL, 39, NULL, NULL, NULL, NULL, 20, 51, 52, 52, NULL, 55, NULL, 50, NULL, 38, NULL, 54, NULL, NULL, NULL, 52, 24, 58, NULL, 23, NULL, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (65, NULL, 'GTIC-21-023', '', true, '2021-11-17 11:20:58.31', false, 'hyththy', '', '', 'hyhyth', true, NULL, 'Autorizado', NULL, 'Crítico', '2021-11-17', NULL, '2021-11-12', NULL, '14:20:00', NULL, '15:20:00', 23, 'Línea de Negocio Emisor', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'B', NULL, 'T4 / 2021', '2021-11-22 14:58:46.17', 0, 1, 10, 22, 17, 4, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 38, NULL, NULL, NULL, 32, NULL, NULL, NULL, NULL, NULL, 23, NULL, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (64, NULL, NULL, '', false, '2021-11-17 11:11:25.576', false, 'kjmjhmhm', '', '', 'jyjyj', false, NULL, 'Descartado', NULL, 'Crítico', '2021-05-12', NULL, '2021-11-12', NULL, '11:11:00', NULL, '11:13:00', 0, 'Línea de Negocio Emisor', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'B', NULL, '', '2021-11-22 14:58:59.638', 0, NULL, 10, 21, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 38, NULL, NULL, NULL, 32, NULL, NULL, NULL, NULL, NULL, 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (67, true, NULL, '', true, '2021-11-22 14:57:49.299', false, 'fgfdgfdgfd gdf gfdgdfg', '', '', 'gfdgvfd gfg fd', true, NULL, 'Observado', 'No reportado', 'Crítico', '2021-11-09', NULL, '2021-11-06', 2525, '14:45:00', NULL, '16:43:00', 0, 'Línea de Negocio Adquirente', 53552, 25252, 5252, 25252, NULL, 5252, '52525', NULL, 'A', NULL, 'T4 / 2021', '2021-11-22 15:00:06.557', 0, 1, 9, 22, 18, 3, NULL, 51, NULL, NULL, 7, 52, 30, 52, 20, 52, 63, NULL, 52, 55, NULL, NULL, NULL, 37, 52, 54, NULL, 33, NULL, 52, NULL, NULL, NULL, 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (63, NULL, NULL, '', false, '2021-11-17 11:09:16.182', false, 'bgb gb ', '', '', 'bgfbgfb ', false, NULL, 'Descartado', NULL, 'Crítico', '2021-11-06', NULL, '2021-11-13', NULL, '11:11:00', NULL, '14:08:00', 0, 'Línea de Negocio Emisor', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'C', NULL, '', '2021-11-22 15:03:56.166', 0, NULL, 10, 22, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 38, NULL, NULL, NULL, 33, NULL, NULL, NULL, NULL, NULL, 61, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (60, true, 'GTIC-21-024', 'gtgrg65565', true, '2021-11-16 16:49:45.599', false, 'gtrgrtg ', 'gt  gt', 'vfvf', 'vfv', true, NULL, 'Autorizado', 'Reportado', 'Crítico', '2021-11-26', NULL, '2021-11-03', 555, '20:00:00', NULL, '10:20:00', 24, 'Línea de Negocio Adquirente', 555, 555, 55, 555, NULL, 555, '55', 'Riesgo relacionado 1', 'A', 5555, 'Trimestre', '2021-11-22 15:04:37.174', 0, 2, 10, 21, 18, 6, 25, 51, 43, 39, 7, NULL, 30, 52, 20, NULL, NULL, 52, 51, 56, 51, NULL, 41, 37, 52, 53, 36, 33, NULL, 52, 24, 57, NULL, 23, 42, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (68, true, NULL, '', false, '2021-11-23 16:04:55.546', false, ' h h bh h', '', '', 'bhgbhb hyh', true, NULL, 'Pendiente', NULL, 'No crítico', '2021-11-17', NULL, '2021-11-04', 252, '18:52:00', NULL, '10:20:00', 0, 'Línea de Negocio Adquirente', 25252, 252, 252, NULL, 'Otros prueba', 25252, '25252', NULL, 'A', NULL, 'T4 / 2021', '2021-11-23 16:04:55.546', 0, NULL, 9, 21, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, NULL, NULL, 63, 51, 52, NULL, 55, NULL, NULL, NULL, 37, 51, 54, NULL, 33, NULL, NULL, NULL, NULL, NULL, 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (69, NULL, NULL, '', false, '2021-11-23 17:46:45.994', false, 'jsbcvbs', '', '', 'sdfsd', false, NULL, 'Descartado', NULL, 'No crítico', '2021-11-15', NULL, '2021-11-18', 5252, '05:59:00', NULL, '21:40:00', 0, 'Línea de Negocio Adquirente', 525252, 5252, 5252, NULL, NULL, 5252, '5252', NULL, 'A', NULL, 'T4 / 2021', '2021-12-13 15:28:34.607', 0, NULL, 10, 21, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 37, NULL, NULL, NULL, 32, 51, NULL, NULL, NULL, NULL, 23, NULL, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (73, true, 'GTIC-21-034', 'HTT20', true, '2021-11-24 10:52:52.228', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 34, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-12-18 16:12:23.725', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '99.9', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (77, NULL, 'GTIC-21-033', '', false, '2021-11-24 11:54:42.372', false, 'tgdg', '', '', 'gfgfg', false, NULL, 'Autorizado', NULL, 'Crítico', '2021-11-11', NULL, '2021-11-13', 25252, '15:53:00', NULL, '11:56:00', 33, 'Línea de Negocio Adquirente', 525, 25252, 52525, NULL, NULL, 5252, '25252', NULL, 'A', NULL, 'T4 / 2021', '2021-12-18 16:10:40.795', 0, NULL, 10, 22, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 37, NULL, NULL, NULL, 32, NULL, NULL, NULL, NULL, '8.999', 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (75, NULL, 'GTIC-21-025', '', false, '2021-11-24 11:39:31.797', false, 'bbhb', '', '', 'bhbhb', false, NULL, 'Autorizado', NULL, 'No crítico', '2021-11-11', NULL, '2021-11-04', 25252, '11:40:00', NULL, '11:42:00', 25, 'Línea de Negocio Adquirente', 55, 22, 252, NULL, NULL, 252, '225', NULL, 'A', NULL, 'T4 / 2021', '2021-11-24 14:51:04.03', 0, NULL, 10, 21, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 37, NULL, NULL, NULL, 33, NULL, NULL, NULL, NULL, '9.999', 61, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (74, true, 'GTIC-21-026', 'HTT20', true, '2021-11-24 11:00:32.523', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 26, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-11-25 16:59:23.984', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '6.666', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (72, true, 'GTIC-21-027', 'HTT20', true, '2021-11-24 10:52:14.916', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 27, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-12-13 09:50:14.879', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '99.9', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (78, NULL, 'GTIC-21-028', '', false, '2021-11-24 12:08:45.98', false, 'vvfv', '', '', 'lbfv', false, NULL, 'Autorizado', NULL, 'Crítico', '2021-11-12', NULL, '2021-11-12', NULL, '12:11:00', NULL, '12:11:00', 28, 'Línea de Negocio Adquirente', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'C', NULL, 'T4 / 2021', '2021-12-13 09:50:25.468', 0, NULL, 10, 21, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, NULL, NULL, 52, NULL, NULL, NULL, 56, 52, NULL, NULL, 37, NULL, NULL, NULL, 33, NULL, NULL, NULL, NULL, NULL, 23, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (71, true, NULL, 'HTT20', true, '2021-11-24 10:24:11.184', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Observado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 0, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-12-13 11:54:49.981', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '67', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (70, true, 'GTIC-21-029', 'HTT20', true, '2021-11-24 10:22:27.678', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 29, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'D', 6000, '03-2021', '2021-12-13 15:10:14.966', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, 5, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, 5, 40, 30, '67', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (76, NULL, 'GTIC-21-030', '', false, '2021-11-24 11:41:15.964', false, 'bgbgb', '', '', '5252', false, NULL, 'Autorizado', NULL, 'No crítico', '2021-11-11', NULL, '2021-11-26', 25, '11:40:00', NULL, '11:43:00', 30, 'Línea de Negocio Adquirente', 5, 22, 2, NULL, NULL, 55, '55', NULL, 'A', NULL, 'T4 / 2021', '2021-12-14 10:24:49.894', 0, NULL, 10, 22, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 31, NULL, NULL, NULL, NULL, NULL, NULL, 56, NULL, NULL, NULL, 37, NULL, NULL, NULL, 32, 52, NULL, NULL, NULL, '6.777', 61, NULL, NULL);
INSERT INTO ciro.tbl_evento_riesgo VALUES (79, true, 'GTIC-21-032', 'HTT20', true, '2021-12-13 22:31:59.393', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 32, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-12-14 10:25:18.136', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, NULL, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, NULL, 40, 30, '6.666', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (80, true, 'GTIC-21-031', 'HTT20', true, '2021-12-13 22:32:00.826', false, 'descripcion evento', 'descripcion completa de evento', 'detalle estado', 'detalle de evento critico', true, NULL, 'Autorizado', 'No reportado', 'No critico', '2021-12-30', NULL, '2021-01-30', 500, '22:30:00', NULL, '10:30:00', 31, 'adquiriente', 5000, 1000, 1500, 3000, 'campo otros', 100, 'recuperacion de activo', 'Riesgo relacoinado X', 'A', 6000, '03-2021', '2021-12-14 10:24:57.081', 0, 20, 10, 25, 15, 2, 45, 5, 20, 20, 5, 5, 50, 5, 20, 5, 20, 5, NULL, 20, 5, 20, 20, 20, 5, 20, 20, 55, 5, NULL, 40, 30, '6.666', 35, 20, 4);
INSERT INTO ciro.tbl_evento_riesgo VALUES (59, true, NULL, 'dvdv', true, '2021-11-16 16:35:29.991', false, 'ddddddddddddddd', 'cccccccccccc', 'cdcdc', 'cdcd d d ', true, NULL, 'Descartado', 'No reportado', 'Crítico', '2021-11-02', NULL, '2021-11-04', 3, '19:29:00', NULL, '16:31:00', 0, 'Línea de Negocio Adquirente', 3, -4, 5, 25252, NULL, 2, '5252', 'Riesgo relacionado 2', NULL, 14, 'fvfv5252', '2021-12-18 16:11:06.358', 0, 2, 10, 22, 18, 6, 25, 52, 44, 40, 8, 52, 30, 51, 20, 52, 51, 52, 52, 56, 52, 50, 41, 37, 51, 54, 36, 33, 51, 52, 24, 57, NULL, 23, 42, 12);
INSERT INTO ciro.tbl_evento_riesgo VALUES (81, true, NULL, '1455', true, '2021-12-18 16:15:16.196', false, 'Descripción ', 'Descripción completa', 'Detalle estado del evento', 'fvfvf fvfv fvf ', true, NULL, 'Observado', 'No reportado', 'No crítico', '2021-12-09', NULL, '2021-12-08', 5210, '19:13:00', NULL, '19:13:00', 0, 'Línea de Negocio Emisor', 1020, 25252, 10052, 102, 'Otros (Clase evento - Basilea - ASFI)', 2522, '5252', 'Riesgo relacionado 2', 'A', 5252, 'T4 / 2021', '2021-12-18 16:16:22.025', 0, 2, 9, 22, 18, 6, 28, 76, 48, 40, 7, 77, 31, 80, 20, 78, 52, 75, NULL, 56, 82, 49, 45, 38, 83, 53, 34, 33, 73, NULL, 26, 58, '7', 23, 46, 11);


--
-- TOC entry 3474 (class 0 OID 28149)
-- Dependencies: 231
-- Data for Name: tbl_matriz_oportunidad; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_matriz_oportunidad VALUES (1, 'bbb', NULL, 'ccc', '', '[{"nroControl":1,"descripcion":"Descripción"},{"nroControl":2,"descripcion":"Descripción 2"},{"nroControl":3,"descripcion":"Descripción 3"}]', true, '2021-12-17 15:29:59.693', 'aaa ', false, 'Pendiente', '2. Externo', '2021-12-06', NULL, '[{"nroPlan":1,"estrategia":"3. Aprovechar y perseguir la Oportunidad,  Planes de Acción para su aprovechamiento","descripcion":"Establecer acciones de seguimiento al cumplimiento de la Estrategia Adquirente","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-05","fechaImpl":"2021-12-11","estado":"En proceso","fechaSeg":"2021-12-01","comenConcluido":"Comentarios: Tareas Concluidas 1","comenEnProceso":"Comentarios: Tareas en Proceso 1"},{"nroPlan":2,"estrategia":"3. Aprovechar y perseguir la Oportunidad,  Planes de Acción para su aprovechamiento","descripcion":"Establecer acciones de seguimiento al cumplimiento de la Estrategia Adquirente dddd","cargo":"Supervisor Legal","fechaAccion":"2021-12-05","fechaImpl":"2021-12-14","estado":"Concluido","fechaSeg":"2021-12-22","comenConcluido":"Comentarios: Tareas Concluidas 2","comenEnProceso":"Comentarios: Tareas en Proceso 2"}]', '2021-12-17 15:29:59.693', 0, 10, 18, 7, 2, 24, 12, 15, 5, 36, 32, 18, 13);
INSERT INTO ciro.tbl_matriz_oportunidad VALUES (2, 'Causa de la Oportunidad', NULL, 'Consecuencia o efecto positivo si es que ocurre la Oportunidad ', '', '[{"nroControl":1,"descripcion":"Control o Fortaleza 1 Control o Fortaleza 1"},{"nroControl":2,"descripcion":"Control o Fortaleza 2 Control o Fortaleza 2"}]', true, '2021-12-18 16:47:05.26', ' Definición de Oportunidad ', false, 'Pendiente', '1. Interno', '2021-11-30', NULL, '[{"nroPlan":1,"estrategia":"1. Desestimar la Oportunidad o no realizar tareas adicionales. Seguimiento de su estado.","descripcion":"Descripción de la Acción 1","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-10","fechaImpl":"2021-12-04","estado":"En proceso","fechaSeg":"2021-12-10","comenConcluido":"Comentarios: Tareas Concluidas","comenEnProceso":"Comentarios: Tareas en Proceso"},{"nroPlan":2,"estrategia":"2. Revisión  y Seguimiento de la Oportunidad. Planes de Acción para su aprovechamiento","descripcion":"Descripción de la Acción 2","cargo":"","fechaAccion":"","fechaImpl":"","estado":"Concluido","fechaSeg":"2021-12-17","comenConcluido":"Comentarios: Tareas Concluidas 2","comenEnProceso":"Comentarios: Tareas en Proceso 2"},{"nroPlan":3,"estrategia":"2. Revisión  y Seguimiento de la Oportunidad. Planes de Acción para su aprovechamiento","descripcion":"Descripción de la Acción 3","cargo":"Supervisor Legal","fechaAccion":"2021-12-02","fechaImpl":"2021-12-09","estado":"Concluido","fechaSeg":"2021-12-15","comenConcluido":"Comentarios: Tareas Concluidas 3","comenEnProceso":"Comentarios: Tareas en Proceso 3"}]', '2021-12-18 16:47:05.26', 0, 10, 18, 10, 3, 24, 12, 14, 5, 34, 33, 18, 13);


--
-- TOC entry 3468 (class 0 OID 27973)
-- Dependencies: 225
-- Data for Name: tbl_matriz_riesgo; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_matriz_riesgo VALUES (1, 'Causa del Riesgo o debilidad ', 'RO-PE-1-COM_001', 'Consecuencia si es que pasa el Riesgo Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Descripción Descripción Descripción Descripción","formalizado":"true","norma":"Política-GRI-003-SEGINF - Seguridad de la información\n","tipo":"Preventivo","nivel":"Automático"},{"nroControl":2,"descripcion":"Descripción Descripción Descripción Descripción","formalizado":"false","norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Correctivo","nivel":"Manual"},{"nroControl":3,"descripcion":"Descripción Descripción Descripción Descripción","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Preventivo","nivel":"Semiautomatico"}]', true, '2021-12-10 18:17:47.765', 'Criterio para la valoración de Impacto Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad Criterio de cálculo Probabilidad', 'Definición del Riesgo Definición del Riesgo Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo Definición del Riesgo Definición del Riesgo', false, 'Autorizado', '2021-12-10', 1, NULL, 85, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción Descripción de la Acción","cargo":"Supervisor Legal","fechaAccion":"2021-12-16","fechaImpl":"2021-12-22","estado":"Concluido"},{"nroPlan":2,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-24","fechaImpl":"2021-12-08","estado":"Concluido"},{"nroPlan":3,"estrategia":"Mitigar","descripcion":"Descripción de la Acción Descripción de la Acción Descripción de la Acción 3","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-13","fechaImpl":"2021-12-10","estado":"Concluido"},{"nroPlan":4,"estrategia":"Asumir","descripcion":"Descripción de la Acción Descripción de la Acción Descripción de la Acción 4","cargo":"Supervisor Legal","fechaAccion":"2021-12-15","fechaImpl":"2021-12-16","estado":"En proceso"}]', 'Comentarios tareas en Proceso Comentarios tareas en Proceso Comentarios tareas en Proceso Comentarios tareas en Proceso', '2021-12-07', 'Observaciones a tareas propuestas Observaciones a tareas propuestas Observaciones a tareas propuestas', '2021-12-13 11:36:53.888', 0, 10, 16, 18, 40, 31, 24, 6, 1, 5, 36, 32, 18, 13);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (4, 'bbbbb', 'RO-PE-1-COM_003', 'ccc', 'Comentario Comentario', 'Ambos', '[]', false, '2021-12-12 14:15:07.967', 'Criterio para la valoración de Impacto Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad Criterio de cálculo Probabilidad', 'aaaa DEBIDO A bbbbb PUEDE OCASIONAR ccc', 'aaaa', false, 'Autorizado', '2021-12-07', 3, 'Otros (Identificado por) Otros (Identificado por)', 50, true, '[]', 'Comentarios tareas en Proceso', '2021-11-29', 'Observaciones a tareas propuestas', '2021-12-13 11:37:47.833', 0, 10, 10, 17, 40, 31, NULL, 29, 1, 26, 36, 32, 18, 13);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (3, '', 'RO-PE-1-COM_005', 'bb', 'Comentario Comentario Comentario Comentario Comentario Comentario Comentario Comentario Comentario', 'Probabilidad', '[]', false, '2021-12-12 10:40:20.542', 'Criterio para la valoración de Impacto Criterio para la valoración de Impacto Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad Criterio de cálculo Probabilidad Criterio de cálculo Probabilidad', 'cc', 'aaa ', false, 'Autorizado', '2021-12-10', 5, NULL, 42, false, '[]', '', NULL, '', '2021-12-13 11:39:14.408', 0, 10, 40, 18, 39, 31, 24, 6, 12, 5, 35, 32, 18, 13);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (5, '', 'RO-PE-2-SIST_001', '', '', 'Impacto', '[]', false, '2021-12-13 11:34:22.334', '', '', '', '', false, 'Autorizado', NULL, 1, NULL, 41, false, '[]', '', NULL, '', '2021-12-13 11:39:40.992', 0, 10, 40, NULL, 39, NULL, NULL, 28, 1, 5, NULL, 33, NULL, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (6, '', 'RO-PE-1-SIST_002', '', '', 'Ambos', '[]', false, '2021-12-13 11:35:13.253', '', '', '', '', false, 'Autorizado', NULL, 2, NULL, 45, false, '[]', '', NULL, '', '2021-12-13 11:39:58.606', 0, 9, 10, NULL, 40, NULL, NULL, 6, 1, 13, NULL, 32, NULL, 11);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (10, 'fallas en la gestión y control de la existencia e integridad de los archivos digitales  y físicos correspondientes a los casos de reclamos, que puede ocasionar acciones regulatorias (multas y sanciones)', 'RO-PE-1-SIST_004', 'acciones regulatorias (multas y sanciones)', NULL, NULL, NULL, NULL, '2021-12-13 15:13:51.17', NULL, NULL, 'concatenado...', 'Riesgo de extravío o documentación incompleta física/digital de los casos de Reclamos atendidos , ', false, 'Autorizado', '2021-01-30', 4, NULL, NULL, false, NULL, NULL, NULL, NULL, '2021-12-13 15:57:53.454', 0, NULL, NULL, 17, 39, 30, 24, 6, 1, 5, 34, 32, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (2, 'Causa del Riesgo o debilidad', 'RO-PE-1-COM_002', 'Consecuencia si es que pasa el Riesgo', '', 'Probabilidad', '[{"nroControl":1,"descripcion":"Descripción 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Correctivo","nivel":"Automático"},{"nroControl":2,"descripcion":"Descripción 2","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":3,"descripcion":"Descripción 3","formalizado":"false","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Preventivo","nivel":""}]', true, '2021-12-12 10:38:24.476', 'Criterio para la valoración de Impact', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-13', 2, 'Otros (Identificado por)', 52, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-11","fechaImpl":"2021-12-07","estado":"Concluido"},{"nroPlan":2,"estrategia":"Transferir","descripcion":"Descripción de la Acción","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-10","fechaImpl":"2021-12-29","estado":"No iniciado"},{"nroPlan":3,"estrategia":"Asumir","descripcion":"Descripción de la Acción","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"2021-12-18","fechaImpl":"2021-12-29","estado":"Concluido"},{"nroPlan":4,"estrategia":"Asumir","descripcion":"Descripción de la Acción","cargo":"Supervisor Legal","fechaAccion":"2021-11-29","fechaImpl":"2021-12-07","estado":"No iniciado"},{"nroPlan":5,"estrategia":"Transferir","descripcion":"Descripción de la Acción","cargo":"Supervisor Legal","fechaAccion":"2022-01-04","fechaImpl":"2021-12-23","estado":"En proceso"}]', 'Comentarios tareas en Proceso Comentarios tareas en Proceso Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 11:37:20.33', 0, 10, 16, NULL, 40, 31, NULL, 28, 1, 5, 36, 32, 18, 13);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (7, '', 'RO-PE-2-COM_004', '', '', 'Impacto', '[]', false, '2021-12-13 11:38:41.747', '', '', '', '', false, 'Autorizado', NULL, 4, NULL, 4, false, '[]', '', NULL, '', '2021-12-13 11:38:53.877', 0, 10, 40, NULL, 40, NULL, NULL, 7, 12, 5, NULL, 33, NULL, 13);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (8, 'fallas en la gestión y control de la existencia e integridad de los archivos digitales  y físicos correspondientes a los casos de reclamos, que puede ocasionar acciones regulatorias (multas y sanciones)', 'RO-PE-1-SIST_003', 'acciones regulatorias (multas y sanciones)', NULL, NULL, NULL, NULL, '2021-12-13 15:13:28.221', NULL, NULL, 'concatenado...', 'Riesgo de extravío o documentación incompleta física/digital de los casos de Reclamos atendidos , ', false, 'Autorizado', '2021-01-30', 3, NULL, NULL, false, NULL, NULL, NULL, NULL, '2021-12-13 15:40:02.024', 0, NULL, NULL, 17, 39, 30, 24, 6, 1, 5, 34, 32, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (13, 'Causa del Riesgo o debilidad ', 'RO-PE-2-SIST_006', 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 15:57:35.824', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-04', 6, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 16:01:21.956', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (9, 'fallas en la gestión y control de la existencia e integridad de los archivos digitales  y físicos correspondientes a los casos de reclamos, que puede ocasionar acciones regulatorias (multas y sanciones)', 'RO-PE-1-SIST_005', 'acciones regulatorias (multas y sanciones)', NULL, NULL, NULL, NULL, '2021-12-13 15:13:49.756', NULL, NULL, 'concatenado...', 'Riesgo de extravío o documentación incompleta física/digital de los casos de Reclamos atendidos , ', false, 'Autorizado', '2021-01-30', 5, NULL, NULL, false, NULL, NULL, NULL, NULL, '2021-12-13 15:58:03.233', 0, NULL, NULL, 17, 39, 30, 24, 6, 1, 5, 34, 32, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (11, 'Causa del Riesgo o debilidad ', NULL, 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 15:46:46.17', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Descartado', '2021-12-04', NULL, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 16:00:43.961', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (12, 'Causa del Riesgo o debilidad ', NULL, 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 15:56:48.68', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Descartado', '2021-12-04', NULL, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 17:19:09.033', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (15, 'Causa del Riesgo o debilidad ', 'RO-PE-2-SIST_008', 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 16:01:39.755', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-04', 8, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 17:21:44.736', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (14, 'Causa del Riesgo o debilidad ', 'RO-PE-2-SIST_007', 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 16:01:38.687', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-04', 7, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 17:19:25.902', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (18, 'Causa del Riesgo o debilidad ', 'RO-PE-2-SIST_011', 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 17:23:17.467', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-04', 11, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-18 16:41:07.69', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (16, 'Causa del Riesgo o debilidad ', NULL, 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 16:01:41.061', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Descartado', '2021-12-04', NULL, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-13 17:22:00.777', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (19, 'Causa del Riesgo o debilidad ', NULL, 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-14 11:36:21.139', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Observado', '2021-12-04', NULL, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-14 12:28:25.579', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (17, 'Causa del Riesgo o debilidad ', NULL, 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-13 17:23:16.419', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Descartado', '2021-12-04', NULL, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-18 16:17:12.325', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (20, 'Causa del Riesgo o debilidad ', 'RO-PE-2-SIST_009', 'Consecuencia si es que pasa el Riesgo', '', 'Ambos', '[{"nroControl":1,"descripcion":"Control 1 Control 1 Control 1","formalizado":"true","norma":"Política-GA-030-AUDI - Selección y Contratación de Firmas de Auditoría Externa","tipo":"Detectivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2 Control 2 Control 2","formalizado":false,"norma":"Política-GTIC-013-SIST - Dirección y Administración Tecnológica","tipo":"Detectivo","nivel":"Automático"}]', true, '2021-12-14 11:36:22.249', 'Criterio para la valoración de Impacto', 'Criterio de cálculo Probabilidad', 'Definición del Riesgo DEBIDO A Causa del Riesgo o debilidad  PUEDE OCASIONAR Consecuencia si es que pasa el Riesgo', 'Definición del Riesgo', false, 'Autorizado', '2021-12-04', 9, NULL, 10, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción Descripción de la Acción 1","cargo":"Supervisor Legal","fechaAccion":"2021-12-10","fechaImpl":"2021-12-03","estado":"Concluido"},{"nroPlan":2,"estrategia":"Evitar","descripcion":"Descripción de la Acción Descripción de la Acción 2","cargo":"Supervisor Legal","fechaAccion":"2021-12-24","fechaImpl":"2021-12-23","estado":"Concluido"}]', 'Comentarios tareas en Proceso', '2021-12-02', 'Observaciones a tareas propuestas', '2021-12-18 16:17:05.552', 0, 10, 16, 17, 39, 30, 24, 6, 12, 5, 34, 33, 18, 12);
INSERT INTO ciro.tbl_matriz_riesgo VALUES (21, 'Causa ', 'RO-PE-1-SIST_010', 'Consecuencia ', '', 'Ambos', '[{"nroControl":1,"descripcion":"vControl 1","formalizado":"true","norma":"","tipo":"Correctivo","nivel":"Semiautomatico"},{"nroControl":2,"descripcion":"Control 2","formalizado":false,"norma":"Política-GRI-003-SEGINF - Seguridad de la información\n","tipo":"Correctivo","nivel":"Semiautomatico"}]', true, '2021-12-18 16:39:35.69', 'vfvf ', 'v f f  ', 'Definición  DEBIDO A Causa  PUEDE OCASIONAR Consecuencia ', 'Definición ', false, 'Autorizado', '2021-12-02', 10, NULL, 41, true, '[{"nroPlan":1,"estrategia":"Transferir","descripcion":"Descripción de la Acción ggg","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"","fechaImpl":"","estado":"No iniciado"},{"nroPlan":2,"estrategia":"Mitigar","descripcion":"Descripción de la Acción df ","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"","fechaImpl":"","estado":"Concluido"},{"nroPlan":3,"estrategia":"Mitigar","descripcion":"Descripción de la Acción dff ","cargo":"Supervisor de Soporte y Mantenimiento ","fechaAccion":"","fechaImpl":"2021-12-14","estado":"No iniciado"}]', 'fvfdv ', '2021-12-02', 'cvfdv', '2021-12-18 16:40:39.383', 0, 10, 40, 18, 40, 31, 24, 6, 12, 5, 36, 32, 18, 12);


--
-- TOC entry 3466 (class 0 OID 19655)
-- Dependencies: 223
-- Data for Name: tbl_observacion; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_observacion VALUES (1, '2021-11-25 16:59:47.983', false, '', 'Gastos asociados,Procedimiento,Evento crítico ASFI,Reputacional,Línea de negocio', 'gfbf gtg fg fg ', '2021-11-25 16:59:47.983', 0, 73, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (2, '2021-12-13 11:54:49.914', false, '', 'Reputacional,Recuperación activo,Línea de negocio ASFI,Comercio afectado', 'Corregir', '2021-12-13 11:54:49.914', 0, 71, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (3, '2021-12-13 13:15:54.759', false, '', 'Riesgo relacionado,Unidad', 'cdcdc', '2021-12-13 13:15:54.759', 0, 70, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (4, '2021-12-13 13:24:44.429', false, '', 'Riesgo relacionado,Evento crítico ASFI,Línea de negocio', '33333', '2021-12-13 13:24:44.429', 0, 70, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (5, '2021-12-13 13:26:36.543', false, '', 'Operación, producto o servicio afectado', '1111', '2021-12-13 13:26:36.543', 0, 70, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (6, '2021-12-13 13:30:55.049', false, '', 'Operación, producto o servicio afectado', '11', '2021-12-13 13:30:55.049', 0, 70, NULL, NULL, NULL);
INSERT INTO ciro.tbl_observacion VALUES (7, '2021-12-13 13:35:09.612', false, '', 'Operación, producto o servicio afectado', 'vfv', '2021-12-13 13:35:09.612', 0, 70, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (8, '2021-12-13 15:00:29.879', false, '', 'Efectos de pérdida', '111', '2021-12-13 15:00:29.879', 0, 70, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (9, '2021-12-13 15:01:15.711', false, '', 'Efectos de pérdida,Cargo persona afectada ASFI', 'dos', '2021-12-13 15:01:15.711', 0, 70, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (10, '2021-12-13 17:40:41.597', false, '', 'Área,Riesgo relacionado', 'dos ultimo', '2021-12-13 17:40:41.597', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (11, '2021-12-13 23:28:08.008', false, '', 'Línea de negocio ASFI,Póliza de seguro,Procedimiento,Sub evento - Basilea', '', '2021-12-13 23:28:08.008', 0, 80, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (12, '2021-12-14 09:15:52.936', false, '', 'Proceso,Impacto,Ciudad,Detalle evento crítico', 'ob 14', '2021-12-14 09:15:52.936', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (13, '2021-12-14 11:13:04.415', false, '', 'Proceso,Póliza de seguro,Procedimiento', 'tres', '2021-12-14 11:13:04.415', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (14, '2021-12-14 11:16:08.85', false, '', 'Proceso', 'bybyb', '2021-12-14 11:16:08.85', 0, NULL, 17, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (15, '2021-12-14 11:17:05.142', false, '', 'Tipo de Pérdida,Dueño proceso', 'b hbhbghbb', '2021-12-14 11:17:05.142', 0, NULL, 18, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (16, '2021-12-14 11:35:12.602', false, '', 'Detalle evento crítico,Fraude con medios de pago electrónico,Gastos asociados,Factor de riesgo operativo,Entidad afectada,Unidad', 'campos observados : Detalle evento crítico
Fraude con medios de pago electrónico
Gastos asociados
Factor de riesgo operativo
Entidad afectada
Unidad', '2021-12-14 11:35:12.602', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (17, '2021-12-14 11:37:22.611', false, '', 'Responsable Unidad a cargo,Criterio de cálculo Probabilidad,Planes de acción,Observaciones a tareas propuestas,Tipo de Pérdida,Proceso', 'Corregir: Responsable Unidad a cargo
Criterio de cálculo Probabilidad
Planes de acción
Observaciones a tareas propuestas
Tipo de Pérdida
Proceso', '2021-12-14 11:37:22.611', 0, NULL, 20, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (18, '2021-12-14 11:54:33.949', false, '', 'Estado,Efectos de pérdida,Evento crítico ASFI', 'observacion con if', '2021-12-14 11:54:33.949', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (19, '2021-12-14 12:24:02.767', false, '', 'Impacto,Área', 'dos observaciones corregidas', '2021-12-14 12:24:02.767', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (20, '2021-12-14 12:24:39.806', false, '', 'Riesgo (Inherente),Definición del Riesgo (concatenación),Identificado por', 'tres observaciones nuevas de riesgo', '2021-12-14 12:24:39.806', 0, NULL, 20, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (21, '2021-12-14 12:25:08.696', false, '', 'Estado', 'una observacion desde evento', '2021-12-14 12:25:08.696', 0, 77, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (22, '2021-12-14 12:28:25.57', false, '', 'Dueño proceso,Riesgo (Inherente),Definición del Riesgo (concatenación)', 'Riesgo observado 19', '2021-12-14 12:28:25.57', 0, NULL, 19, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (23, '2021-12-14 12:28:44.286', false, '', 'Riesgo (Residual),Observaciones a tareas propuestas', 'riesgo observado 19 ... 2', '2021-12-14 12:28:44.286', 0, NULL, 19, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (24, '2021-12-14 12:29:23.909', false, '', 'Procedimiento,Entidad', 'Evento observado 71 ...1', '2021-12-14 12:29:23.909', 0, 71, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (25, '2021-12-14 12:29:48.314', false, '', 'Detalle evento crítico,Proceso,Línea de negocio,Área,Póliza de seguro', 'Evento observado 71 ....2', '2021-12-14 12:29:48.314', 0, 71, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (26, '2021-12-18 16:11:50.626', false, '', 'Procedimiento,Línea de negocio', '2 campos observados con cambios con rutas', '2021-12-18 16:11:50.626', 0, 73, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (27, '2021-12-18 16:16:22.004', false, '', 'Línea de negocio,Impacto,Cobertura seguro,Operación, producto o servicio afectado,Factor de riesgo operativo,Riesgo relacionado,Proceso,Gastos asociados,LGI FT y/o DP,Entidad', 'vfvvfvfv', '2021-12-18 16:16:22.004', 0, 81, NULL, 'Evento', NULL);
INSERT INTO ciro.tbl_observacion VALUES (28, '2021-12-18 16:19:27.386', false, '', 'Clasificación Factores de Riesgo,Definición del Riesgo (concatenación),Responsable Unidad a cargo', 'evaluaciob de riesgo 19 con cambios en rutas', '2021-12-18 16:19:27.386', 0, NULL, 19, 'Riesgo', NULL);
INSERT INTO ciro.tbl_observacion VALUES (29, '2021-12-18 16:40:21.235', false, '', 'Monetario / No monetario,Riesgo (Inherente),Fecha evaluación', 'Observacion Opotuniad con cambios en ruta 21
', '2021-12-18 16:40:21.235', 0, NULL, 21, 'Riesgo', NULL);


--
-- TOC entry 3458 (class 0 OID 19366)
-- Dependencies: 215
-- Data for Name: tbl_tabla_descripcion; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_descripcion VALUES (1, '', '2021-11-03 12:08:34.822', false, '', 0, 0, 'La Paz', '2021-11-03 12:08:34.822', 0, 1, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (2, '', '2021-11-03 12:09:00.344', false, '', 0, 0, 'Santa Cruz', '2021-11-03 12:09:00.344', 0, 1, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (4, '', '2021-11-03 12:09:39.018', false, '', 1, 0, 'Beni', '2021-11-03 12:09:39.018', 0, 2, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (5, '', '2021-11-03 12:10:00.164', false, '', 2, 0, 'Pando', '2021-11-03 12:10:00.164', 0, 2, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (6, '', '2021-11-03 12:10:11.286', false, '', 2, 0, 'Tarija', '2021-11-03 12:10:11.286', 0, 2, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (8, 'BCR', '2021-11-03 12:11:05.176', false, '', 0, 0, 'Banco de Crédito de Bolivia S.A.', '2021-11-03 12:11:05.176', 0, 5, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (9, 'AGLP', '2021-11-03 12:11:39.569', false, '', 0, 0, 'Gerencia de Agencia La Paz', '2021-11-03 12:13:02.009', 0, 3, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (10, 'GTIC', '2021-11-03 12:13:33.417', false, '', 0, 0, 'Gerencia de Tecnología de Información y Comunicación', '2021-11-03 12:13:33.417', 0, 3, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (14, 'A', '2021-11-03 12:18:17.316', false, '', 0, 0, 'Eventos de riesgo operativo que generan pérdidas y afectan el Estado de Ganancias y Pérdidas', '2021-11-03 12:18:17.316', 0, 6, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (15, 'B', '2021-11-03 12:18:30.704', false, '', 0, 0, 'Eventos de riesgo operativo que generan pérdidas y no afectan el Estado de Ganancias y Pérdidas', '2021-11-03 12:18:30.704', 0, 6, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (16, 'C', '2021-11-03 12:18:43.218', false, '', 0, 0, 'Eventos de riesgo operativo que no generan pérdidas y no afectan el Estado de Ganancias y Pérdidas', '2021-11-03 12:18:43.218', 0, 6, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (17, '', '2021-11-03 12:19:59.262', false, '', 0, 0, 'Supervisor Legal', '2021-11-03 12:19:59.262', 0, 7, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (18, '', '2021-11-03 12:20:06.589', false, '', 0, 0, 'Supervisor de Soporte y Mantenimiento ', '2021-11-03 12:20:06.589', 0, 7, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (19, '', '2021-11-03 12:20:19.101', false, '', 0, 0, 'Reporte Eventos', '2021-11-03 12:20:19.101', 0, 8, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (20, '', '2021-11-03 12:20:38.076', false, '', 0, 0, 'Historico Gestiones Pasadas', '2021-11-03 12:20:38.076', 0, 8, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (21, '', '2021-11-03 12:20:53.381', false, '', 0, 0, 'Terminales de punto de venta-POS', '2021-11-03 12:20:53.381', 0, 9, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (22, '', '2021-11-03 12:21:04.613', false, '', 0, 0, 'Red de comunicación internet', '2021-11-03 12:21:04.613', 0, 9, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (23, '', '2021-11-03 12:27:28.687', false, 'Pérdidas derivadas de algún tipo de actuación encaminada a defraudar, apropiarse de bienes indebidamente o soslayar regulaciones, leyes o políticas empresariales (excluidos los eventos de diversidad/discriminación) en las que se encuentra implicada, al menos, una parte interna de la empresa.', 0, 0, 'Fraude Interno', '2021-11-03 12:27:28.687', 0, 11, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (24, '', '2021-11-03 12:28:29.097', false, '', 23, 0, 'Hurto y fraude', '2021-11-03 12:28:29.097', 0, 12, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (25, '', '2021-11-03 12:29:23.196', false, '', 24, 23, 'Fraude / fraude crediticio/ depósitos sin valor', '2021-11-03 12:29:23.196', 0, 13, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (26, '', '2021-11-03 12:30:19.319', false, '', 23, 0, 'Actividades no autorizadas', '2021-11-03 12:30:19.319', 0, 12, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (27, '', '2021-11-03 12:30:59.451', false, '', 26, 23, 'Operaciones no reveladas (intencionalmente)', '2021-11-03 12:30:59.451', 0, 13, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (28, '', '2021-11-03 12:31:42.067', false, '', 26, 23, 'Operaciones no autorizadas (con pérdidas pecuniarias)', '2021-11-03 12:31:42.067', 0, 13, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (29, '', '2021-11-03 12:32:18.675', false, '', 0, 0, 'Personas', '2021-11-03 12:32:18.675', 0, 8, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (37, '', '2021-11-03 12:39:47.844', false, '', 0, 0, 'Autorizar la afiliación de establecimientos comerciales que expenden bienes o prestan servicios, a una red para operar con las tarjetas electrónicas administradas por la entidad.', '2021-11-03 12:39:47.844', 0, 18, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (38, '', '2021-11-03 12:39:58.962', false, '', 0, 0, 'Procesar los consumos de los tarjetahabientes con el uso de tarjetas de crédito, débito, prepagadas y otras tarjetas de financiamiento o pago electrónico, emitidas por entidades de intermediación financiera.', '2021-11-03 12:39:58.962', 0, 18, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (53, '28000025', '2021-11-03 13:02:17.814', false, '', 0, 0, 'Póliza Banquera', '2021-11-03 13:02:17.814', 0, 25, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (30, '', '2021-11-03 12:32:30.643', false, '', 0, 0, 'Procesos', '2021-11-03 12:32:30.643', 0, 26, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (31, '', '2021-11-03 12:36:08.441', false, '', 0, 0, 'Personas', '2021-11-03 12:36:08.441', 0, 26, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (41, '', '2021-11-03 12:54:19.605', false, '', 0, 0, 'Operación', '2021-11-03 12:54:19.605', 0, 20, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (42, '', '2021-11-03 12:54:50.245', false, '', 41, 0, 'Operaciones Internas', '2021-11-03 12:54:50.245', 0, 21, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (43, '', '2021-11-03 12:55:13.407', false, '', 42, 41, 'Cierre ATM', '2021-11-03 12:55:13.407', 0, 22, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (44, '', '2021-11-03 12:55:36.399', false, '', 42, 41, 'Monitoreo EIF', '2021-11-03 12:55:36.399', 0, 22, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (45, '', '2021-11-03 12:57:50.641', false, '', 0, 0, 'Producto', '2021-11-03 12:57:50.641', 0, 20, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (46, '', '2021-11-03 12:58:13.628', false, '', 45, 0, 'Canales', '2021-11-03 12:58:13.628', 0, 21, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (47, '', '2021-11-03 12:58:43.853', false, '', 46, 45, 'Internet ', '2021-11-03 12:58:43.853', 0, 22, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (48, '', '2021-11-03 12:59:02.598', false, '', 46, 45, 'IVR (Interactive Voice Response)', '2021-11-03 12:59:02.598', 0, 22, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (49, 'USD', '2021-11-03 12:59:20.727', false, '', 0, 0, 'Dolar', '2021-11-03 12:59:20.727', 0, 23, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (50, 'Bs', '2021-11-03 12:59:35.133', false, '', 0, 0, 'Boliviano', '2021-11-03 12:59:35.133', 0, 23, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (51, '', '2021-11-03 13:00:28.426', false, 'Si el hecho llegara a presentarse, tendria alto impacto sobre la entidad', 0, 0, 'Alto', '2021-11-03 13:00:28.426', 0, 24, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (52, '', '2021-11-03 13:00:43.648', false, 'Si el hecho llegara a presentarse, tendria bajo impacto sobre la entidad', 0, 0, 'Bajo', '2021-11-03 13:00:43.648', 0, 24, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (54, '50003781', '2021-11-03 13:02:29.258', false, '', 0, 0, 'Póliza de Responsabilidad Civil de Directores y Ejecutivos', '2021-11-03 13:02:29.258', 0, 25, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (55, '', '2021-11-03 13:03:56.08', false, '', 0, 0, 'Servicios de pago', '2021-11-03 13:03:56.08', 0, 17, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (56, '', '2021-11-03 13:04:11.184', false, '', 0, 0, 'Entidades de Intermediación Financiera', '2021-11-03 13:04:11.184', 0, 17, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (57, '', '2021-11-04 09:41:11.681', false, '', 0, 0, 'Problemas en comunicaciones', '2021-11-04 09:41:11.681', 0, 10, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (58, '', '2021-11-04 09:41:23.702', false, '', 0, 0, 'Problemas en Sistemas para Contact Center y Monitoreo', '2021-11-04 09:41:23.702', 0, 10, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (59, '', '2021-11-04 09:41:37.917', false, '', 0, 0, 'Errores Operativos en Facturación/impuestos/Caja Bancaria.', '2021-11-04 09:41:37.917', 0, 10, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (7, 'BME', '2021-11-03 12:10:48.39', false, '', 0, 0, 'Banco Mercantil Santa Cruz S.A. editado', '2021-11-10 12:45:00.806', 0, 5, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (62, 'BB', '2021-11-16 10:13:51.243', false, '', 0, 0, 'Banco B', '2021-11-16 10:13:51.243', 0, 5, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (33, 'PE-2', '2021-11-03 12:38:02.321', false, '16
', 0, 0, 'Dirección de proyectos', '2021-11-27 15:13:44.782', 0, 15, 'Bajo', NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (32, 'PE-1', '2021-11-03 12:37:38.765', false, '32', 0, 0, 'Planificacion estrategica', '2021-11-27 15:13:22.5', 0, 15, 'Medio Bajo', NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (34, 'Política', '2021-11-03 12:38:17.95', false, 'Dirección y Administración Tecnológica', 33, 0, 'Política-GTIC-013-SIST', '2021-12-07 16:06:24.367', 0, 16, 'campo por completar 1', 'GTIC', NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (61, '', '2021-11-04 15:07:12.831', false, 'Pérdidas derivadas de algún tipo de actuación encaminada a defraudar apropiarse de bienes indebidamente o solslayar la legislación, por parte de un tercero', 0, 0, 'Fraude externo', '2021-11-22 12:17:45.104', 0, 11, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (11, 'SIST', '2021-11-03 12:13:55.524', false, '', 9, 0, 'Desarrollo de software', '2021-11-22 12:00:57.765', 0, 4, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (35, 'Política', '2021-11-03 12:38:28.853', false, 'Selección y Contratación de Firmas de Auditoría Externa', 32, 0, 'Política-GA-030-AUDI', '2021-12-07 16:08:15.574', 0, 16, 'Campo por completar 2', 'GA', NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (3, '', '2021-11-03 12:09:26.244', false, '', 0, 0, 'Oruro b', '2021-12-17 16:31:11.995', 0, 2, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (63, '', '2021-11-17 12:05:05.417', false, '', 0, 0, 'Medio', '2021-11-17 12:05:30.572', 0, 24, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (39, '', '2021-11-03 12:41:14.118', false, 'Reducción directa del valor de los activos debido a robo, fraude, actividad no autorizada, o pérdidas de mercado resultantes de eventos operativos', 0, 0, 'Disminución de recursos financieros', '2021-11-22 11:19:46.105', 0, 19, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (40, '', '2021-11-03 12:45:58.121', false, 'Reducción directa en el valor de los activos físicos debido a algún tipo de accidente (negligencia, accidente, fuego, terremoto, etc.).', 0, 0, 'Pérdida o daños de activos fijos o de información', '2021-11-22 11:20:02.561', 0, 19, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (64, '', '2021-11-22 14:37:59.953', false, '', 0, 0, 'FFFFFF', '2021-11-22 15:38:34.543', 0, 13, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (12, 'SIST', '2021-11-03 12:14:09.642', false, '', 10, 0, 'Infraestructura tecnologica y Produccion', '2021-11-22 12:01:12.949', 0, 4, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (13, 'COM', '2021-11-03 12:14:25.585', false, '', 10, 0, 'Servicio al Cliente', '2021-11-22 12:02:11.548', 0, 4, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (65, 'RR', '2021-11-23 11:15:18.537', false, '', 0, 0, 'Real', '2021-11-23 11:15:18.537', 0, 23, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (66, 'SS', '2021-11-23 11:21:13.811', false, '', 0, 0, 'Sol', '2021-11-23 11:21:13.811', 0, 23, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (84, '2', '2021-11-27 12:31:08.044', false, '10.000', 0, 0, 'Medio Bajo', '2021-11-27 12:31:08.044', 0, 33, '1%', '23.000', 'Fraude por comercio igual o mayor a Usd 10.000 y supere o sea igual al 1% del ratio fraude a Ventas del mes', '- Las Marcas realizaron la notificación de que los umbrales de fraude fueron superados, solicitan se realice un Plan de Acción para los comercios identificados y es posible se reciban penalidades o se produjo una pérdida para la empresa por importes entre USD 39.001 y USD 117.000.

- Los Volúmenes de Fraude registrados en la (s) Empresa Aceptante para la (s)  cual (es)  reportaron transacciones fraudulentas, superan los volúmenes de su comportamiento usual y superan los ratios recomendados.

- Se debe realizar la desafiliación de o los Comercios.

- Cumple con los criterios para ser reportado como Hecho Delictivo a la ASFI.
');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (85, 'gfdfg', '2021-12-01 17:20:09.099', false, '', 0, 0, 'bgf', '2021-12-01 17:20:09.099', 0, 23, '', '', '', '');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (36, 'Política', '2021-11-03 12:38:44.151', false, 'Seguridad de la información
', 32, 0, 'Política-GRI-003-SEGINF', '2021-12-07 16:09:12.101', 0, 16, 'Campo por completar 3', 'GRI', NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (67, NULL, '2021-11-23 16:39:07.957', false, NULL, 0, 0, '7', '2021-12-15 11:54:01.614', 0, 14, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (68, '', '2021-11-26 16:52:15.39', false, '', 30, 0, '01. Ausencia de políticas o procesos no documentados', '2021-11-26 16:52:15.39', 0, 27, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (69, '', '2021-11-26 16:53:01.061', false, '', 30, 0, '02. Ausencia de un plan de contingencia', '2021-11-26 16:53:01.061', 0, 27, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (70, '', '2021-11-26 16:53:20.815', false, '', 31, 0, '01. Accidente de trabajo', '2021-11-26 16:53:20.815', 0, 27, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (71, '', '2021-11-26 16:53:45.876', false, '', 31, 0, '02. Actividades no autorizadas', '2021-11-26 16:53:45.876', 0, 27, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (72, '5', '2021-11-27 11:25:47.238', false, 'Evento que es de conocimiento a nivel internacional y que genera impacto en las partes interesadas y atención apmplia de los medios nacionales e internacionales, con protesatas del público que tiene la capacidad de afectar la continuidad en la prestación de los servicios del negocio', 0, 0, 'Alto', '2021-11-27 11:25:47.238', 0, 28, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (73, '4', '2021-11-27 11:26:19.901', false, 'Evento que es de conocimiento a nivel nacional y que henera impacto en las partes interesadas, en otros proveedores de infraestructura, con atención amplia de los medios nacionales. Existe una incapacidad parcial de continuar prestando el servicio y una disminución en la capacidad de operar líneas de negocio y objeto principal, pero que no afectan a la entidad de manera sistémica. ', 0, 0, 'Medio Alto', '2021-11-27 11:26:19.901', 0, 28, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (74, '5', '2021-11-27 11:26:49.885', false, 'Intervención regulatoria formal, penalidades y/o sanciones, cierre o suspensión de actividades para la prestación de servicios', 0, 0, 'Alto', '2021-11-27 11:26:49.885', 0, 29, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (75, '4', '2021-11-27 11:27:07.091', false, 'Incio de investigaciones por parte del Ente Regulador, multas por incumplimiento.', 0, 0, 'Medio Alto', '2021-11-27 11:27:07.091', 0, 29, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (76, '5', '2021-11-27 11:27:40.742', false, 'Intervención regulatoria formal, penalidades y/o sanciones, cierre o suspensión de actividades para la prestación de servicios', 0, 0, 'Alto', '2021-11-27 11:27:40.742', 0, 30, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (77, '5', '2021-11-27 11:28:11.169', false, 'Pérdida de más de USD 800.000', 0, 0, 'Alto', '2021-11-27 11:28:11.169', 0, 31, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (78, '5', '2021-11-27 11:47:45.191', false, '1', 0, 0, 'Alto', '2021-11-27 11:47:45.191', 0, 32, 'Bajo (Pésimo)', 'Puntuación de 0 a 20%', NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (80, '4', '2021-11-27 12:18:17.259', false, '50.000', 0, 0, 'Medio Alto', '2021-11-27 12:18:17.259', 0, 33, '<=3%', '480.000', 'Fraude por comercio igual o mayor a Usd 50.000, supere o  iguale al 3% del ratio fraude a Ventas del mes y corresponda a un rubro considerado de alto riesgo, será categorizado como riesgo Alto.', '- Las Marcas realizaron la notificación de que los umbrales de fraude fueron superados, solicitan se realice un Plan de Acción para los comercios identificados y es posible se reciban penalidades o se produjo una pérdida para la empresa por importes entre USD 272.001 y USD 480.000.

- Los Volúmenes de Fraude registrados en la (s) Empresa Aceptante para la (s)  cual (es)  reportaron transacciones fraudulentas, superan los volúmenes de su comportamiento usual y superan los ratios recomendados.

- Se debe realizar la desafiliación de o los Comercios.

- Cumple con los criterios para ser reportado como Hecho Delictivo a la ASFI."');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (81, '3', '2021-11-27 12:19:42.026', false, '25.000', 0, 0, 'Medio', '2021-11-27 12:19:42.026', 0, 33, '<=2%', '224.000', 'Fraude por comercio igual o mayor a Usd 25.000 y supere o sea igual al 2% del ratio fraude a Ventas del mes.', '- Las Marcas realizaron la notificación de que los umbrales de fraude fueron superados, solicitan se realice un Plan de Acción para los comercios identificados y es posible se reciban penalidades o se produjo una pérdida para la empresa por importes entre USD 117,001 y USD 272.000.

- Los Volúmenes de Fraude registrados en la (s) Empresa Aceptante para la (s)  cual (es)  reportaron transacciones fraudulentas, superan los volúmenes de su comportamiento usual y superan los ratios recomendados.

- Se debe realizar la desafiliación de o los Comercios.

- Cumple con los criterios para ser reportado como Hecho Delictivo a la ASFI.
');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (82, '5', '2021-11-27 12:20:34.117', false, 'Intervención regulatoria formal, penalidades y/o sanciones, cierre o suspensión de actividades para la prestación de servicios', 0, 0, 'Alto', '2021-11-27 12:20:34.117', 0, 34, 'Activos Líquidos/Pasivos a Corto Plazo entre 0 - 0,1', 'Capital de Trabajo/1.5* Total gastos = entre 0 y 0,4', NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (83, '5', '2021-11-27 12:21:00.573', false, 'Pérdida  o  daño  significativo;  pérdida  importante  del  valor  de  las  acciones;  riesgo inaceptable; intervención regulatoria formal y multas; pérdida de clientes a gran escala; involucramiento directo de la alta gerencia o directorio.', 0, 0, 'Alto', '2021-11-27 12:21:00.573', 0, 35, NULL, NULL, NULL, NULL);
INSERT INTO ciro.tbl_tabla_descripcion VALUES (79, '5', '2021-11-27 12:03:20.13', false, '75.000', 0, 0, 'Alto', '2021-11-27 12:03:20.13', 0, 33, '<=5%', '800.000', 'Fraude por comercio igual o mayor a Usd 75.000, supere o sea igual el 5% del ratio fraude a ventas del mes y corresponda a un rubro considerado de alto riesgo, será categorizado como riesgo Alto.', '- Las Marcas realizaron la notificación de que los umbrales de fraude fueron superados, solicitan se realice un Plan de Acción para los comercios identificados y es posible se reciban penalidades o se produjo una pérdida para la empresa por importes entre USD 480.001 y USD 800.000');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (86, '', '2021-12-17 16:31:28.708', false, '', 1, 0, 'Ciudad', '2021-12-17 16:31:28.708', 0, 2, '', '', '', '');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (87, 'mon a', '2021-12-18 16:01:44.276', false, '', 0, 0, 'mon b', '2021-12-18 16:02:01.501', 0, 23, '', '', '', '');
INSERT INTO ciro.tbl_tabla_descripcion VALUES (88, '', '2021-12-18 16:02:50.612', false, '', 24, 23, 'Prueba', '2021-12-18 16:02:50.612', 0, 13, '', '', '', '');


--
-- TOC entry 3470 (class 0 OID 28052)
-- Dependencies: 227
-- Data for Name: tbl_tabla_descripcion_matriz_oportunidad; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (18, '5', 'Alto', 'Impacto positivo Alto;  impacto positivo en la percepción de clientes. Impacto alto en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. Puede alcanzarse una ventaja competitiva o mejora del posicionamiento de la marca.', 'Aprovechar y perseguir la Oportunidad,  Planes de Acción para su aprovechamiento', '2021-12-15 17:48:26.06', false, 'Cuadrante I', '2021-12-17 10:17:50.618', 0, 5, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (19, '4', 'Medio Alto', 'Impacto positivo Medio Alto;  impacto positivo en la percepción de clientes. Impacto medio alto en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. ', 'Aprovechar y perseguir la Oportunidad,  Planes de Acción para su aprovechamiento', '2021-12-15 17:48:48.767', false, 'Cuadrante II', '2021-12-17 10:17:59.412', 0, 5, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (1, NULL, NULL, NULL, NULL, '2021-12-14 17:23:52.544', false, 'Fortalezas', '2021-12-14 17:23:52.544', 0, 1, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (2, NULL, NULL, NULL, NULL, '2021-12-14 17:24:13.322', false, 'Debilidades', '2021-12-14 17:24:13.322', 0, 1, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (3, NULL, NULL, NULL, NULL, '2021-12-14 17:24:56.264', false, 'Oportunidades', '2021-12-14 17:24:56.264', 0, 1, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (4, NULL, NULL, NULL, NULL, '2021-12-14 17:25:04.573', false, 'Amenazas', '2021-12-14 17:40:55.384', 0, 1, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (6, 'D. 1', NULL, NULL, NULL, '2021-12-14 18:15:52.202', false, 'Asignación de eventos de perdida y autoevaluaciones', '2021-12-14 18:15:52.202', 0, 2, 2);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (7, 'D. 2', NULL, NULL, NULL, '2021-12-14 18:16:09.774', false, 'No se esta explotando las bases de datos con eventos de perdida', '2021-12-14 18:16:09.774', 0, 2, 2);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (8, 'D. 3', NULL, NULL, NULL, '2021-12-14 18:16:25.169', false, 'No se esta explotando la informacion de las matices de autoevaluación', '2021-12-14 18:16:25.169', 0, 2, 2);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (9, 'O. 1', NULL, NULL, NULL, '2021-12-14 18:27:41.716', false, 'Incluir dentro de las capacitaciones el tema de evento de perdida', '2021-12-14 18:27:41.716', 0, 2, 3);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (10, 'O. 2', NULL, NULL, NULL, '2021-12-14 18:28:58.256', false, 'Elaboracion de un procedimiento para el manejo de eventos de perdida', '2021-12-14 18:28:58.256', 0, 2, 3);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (11, '1. INTERNA', '', '', '', '2021-12-15 17:43:10.99', false, 'Colaboradores', '2021-12-15 17:43:10.99', 0, 3, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (12, '2. INTERNA', '', '', '', '2021-12-15 17:43:28.256', false, 'Accionistas', '2021-12-15 17:43:28.256', 0, 3, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (13, '5', 'Transformadora', 'Impacto positivo Alto;  impacto positivo en la percepción de clientes. Impacto alto en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. Puede alcanzarse una ventaja competitiva o mejora del posicionamiento de la marca.', '80', '2021-12-15 17:44:45.212', false, 'Alto', '2021-12-15 17:44:45.212', 0, 4, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (14, '4', 'Mayor', 'Impacto positivo Medio Alto;  impacto positivo en la percepción de clientes. Impacto medio alto en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. ', '60', '2021-12-15 17:45:09.65', false, 'Medio Alto', '2021-12-15 17:45:09.65', 0, 4, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (15, '3', 'Moderado', 'Impacto positivo moderado;  impacto positivo en la percepción de clientes. Impacto moderado en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. ', '40', '2021-12-15 17:45:58.285', false, 'Medio', '2021-12-15 17:45:58.285', 0, 4, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (16, '2', 'Menor', 'Impacto positivo menor; mejora del impacto positivo en la percepción de clientes. Pequeño crecimiento en ventas o ingresos, para el canal o servicio. ', '20', '2021-12-15 17:46:36.633', false, 'Medio Bajo', '2021-12-15 17:46:36.633', 0, 4, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (17, '1', 'Mínimo', 'Impacto positivo muy pequeño o insignificante; no hay una mejora o poco impacto positivo en la percepción de clientes. Muy pequeño o nulo crecimiento en ventas o ingresos para el canal o servicio.', '0', '2021-12-15 17:46:58.096', false, 'Bajo', '2021-12-15 17:46:58.096', 0, 4, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (23, '5', '', '', '', '2021-12-16 11:14:06.473', false, 'Se cuenta con herramientas/recursos/procedimientos y capacidades para alcanzar la oportunidad y aplicar acciones para poder alcanzarla. ', '2021-12-16 11:14:06.473', 0, 6, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (24, '4', '', '', '', '2021-12-16 11:14:19.828', false, 'Se cuenta con herramientas/recursos/procedimientos y capacidades para alcanzar la oportunidad, pero se deben realizar algunas modificaciones para poder explotar la oportunidad. ', '2021-12-16 11:14:19.828', 0, 6, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (25, '3', '', '', '', '2021-12-16 11:14:29.484', false, 'Se tiene conocimiento sobre la oportunidad, se cuenta con algunas  herramientas/recursos/procedimientos actuales, los mismos son aplicados, pero faltan tareas para poder implementarlas en su totalidad. ', '2021-12-16 11:14:29.484', 0, 6, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (26, '2', '', '', '', '2021-12-16 11:14:39.467', false, 'Se tiene conocimiento sobre la oportunidad, se cuenta con algunas  herramientas/recursos/procedimientos actuales para poder alcanzarla, pero en algunos casos no son aplicadas. ', '2021-12-16 11:14:39.467', 0, 6, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (27, '1', '', '', '', '2021-12-16 11:14:48.131', false, 'Se tiene conocimiento sobre la oportunidad, pero no se cuenta con herramientas/recursos/procedimientos actuales para poder alcanzarla.', '2021-12-16 11:14:48.131', 0, 6, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (20, '3', 'Medio', 'Impacto positivo moderado;  impacto positivo en la percepción de clientes. Impacto moderado en el crecimiento en ventas e ingresos; aumento en el uso del servicio/canal. ', 'Revisión  y Seguimiento de la Oportunidad. Planes de Acción para su aprovechamiento', '2021-12-15 18:09:06.852', false, 'Cuadrante III', '2021-12-17 10:18:06.465', 0, 5, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (21, '2', 'Medio Bajo', 'Impacto positivo menor; mejora del impacto positivo en la percepción de clientes. Pequeño crecimiento en ventas o ingresos, para el canal o servicio. ', 'Revisión  y Seguimiento de la Oportunidad. Planes de Acción para su aprovechamiento', '2021-12-15 18:09:47.675', false, 'Cuadrante IV', '2021-12-17 10:18:13.38', 0, 5, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (22, '1', 'Bajo', 'Impacto positivo muy pequeño o insignificante; no hay una mejora o poco impacto positivo en la percepción de clientes. Muy pequeño o nulo crecimiento en ventas o ingresos para el canal o servicio.', 'Desestimar la Oportunidad o no realizar tareas adicionales. Seguimiento de su estado.', '2021-12-15 18:10:09.811', false, 'Cuadrante IV', '2021-12-17 10:18:19.273', 0, 5, 0);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (5, 'F. 1', NULL, NULL, NULL, '2021-12-14 18:08:06.917', false, 'Contamos con data de eventos y documentación', '2021-12-16 11:35:04.648', 0, 2, 1);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (29, 'A2', '', '', '', '2021-12-18 16:07:56.905', false, 'amenaza 2', '2021-12-18 16:07:56.905', 0, 2, 4);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_oportunidad VALUES (28, 'A 1', '', '', '', '2021-12-18 16:04:52.773', false, 'Amenaza 1 edit', '2021-12-18 16:08:12.719', 0, 2, 0);


--
-- TOC entry 3462 (class 0 OID 19574)
-- Dependencies: 219
-- Data for Name: tbl_tabla_descripcion_matriz_riesgo; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (7, '4', 'Pérdida o daño mayor, riesgo inaceptable; cobertura de medios nacionales sostenida; pérdida importante de clientes; investigación formal del regulador; involucramiento de la alta gerencia.  Puede darse una sanción o amonestación del ente regulador.', 'Impacto Medio Alto .- el 5% del patrimonio promedio, como un impacto Medio Alto para la Empresa', '4. Medio Alto - Pérdida mayor, multas sanciones, intervención regulador, perdida de clientes. O posible pérdida hasta USD 480.000', 272.001, 480, '2021-11-22 10:59:08.845', false, 'Medio Alto', '2021-11-30 09:46:00.305', 0, 3, '80');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (12, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-23 11:05:43.55', false, 'D. Eventos de Riesgo Operativo que generan Ganancias', '2021-11-25 10:16:02.484', 0, 1, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (26, '2', 'Podría ocurrir en algún momento; cuando menos una vez cada dos años. Baja probabilidad de ocurrencia. Entre 21% y 40%.', 'Hasta 1 dia en 2 años', '2. Media Baja - Hasta 1 vez cada 2 años', 0.5, NULL, '2021-11-30 10:01:15.719', false, 'Media Baja', '2021-12-06 09:40:32.006', 0, 2, '20');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (23, '', '', '', '', NULL, NULL, '2021-11-29 11:41:27.775', false, 'Autoevaluación', '2021-11-30 15:51:58.485', 0, 8, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (2, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-19 16:43:13.728', false, 'B. Eventos que generan pérdidas y no afectan los Estados Financieros de la Empresa', '2021-11-19 16:43:13.728', 0, 1, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (3, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-19 17:02:22.282', false, 'C. Eventos que no generan pérdidas y no afectan los Estados Financieros de la Empresa', '2021-11-19 17:02:22.282', 0, 1, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (24, '', '', '', '', NULL, NULL, '2021-11-29 11:41:38.102', false, 'Base de Eventos', '2021-11-30 15:52:09.555', 0, 8, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (25, '', '', '', '', NULL, NULL, '2021-11-29 11:41:45.273', false, 'Reporte Área', '2021-11-30 15:52:21.707', 0, 8, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (11, '4', '4. Los Procedimientos y medidas de control están formailizados y siempre son utilizados, aplicados, medidos y monitoreados', '60', NULL, NULL, NULL, '2021-11-22 11:05:16.88', false, 'Los Procedimientos y medidas de control están formailizados y siempre son utilizados, aplicados, medidos y monitoreados', '2021-12-08 10:07:41.546', 0, 5, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (30, '5', 'Alto', 'Indica que el riesgo tiene   una gran probabilidad de ocurrencia y un impacto crítico para la institución en caso de materializarse.', '800.000', NULL, NULL, '2021-11-30 23:54:29.898', false, 'Cuadrante I', '2021-11-30 23:54:29.898', 0, 9, 'EVITAR, MITIGAR O TRANSFERIR DE ACUERDO AL ANÁLISIS DE CADA RIESGO');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (31, '4', 'Medio Alto', 'Indica que el riesgo tiene una alta probabilidad de ocurrencia y un fuerte impacto para la institución en caso de materializarse.', '480.000', NULL, NULL, '2021-11-30 23:56:18.461', false, 'Cuadrante II', '2021-11-30 23:56:18.461', 0, 9, 'EVITAR, MITIGAR O TRANSFERIR DE ACUERDO AL ANÁLISIS DE CADA RIESGO');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (32, '3', 'Medio', 'Indica que el riesgo tiene una probabilidad de ocurrencia media e impacto significativo para la institución en caso de materializarse.', '272.000', NULL, NULL, '2021-11-30 23:56:58.925', false, 'Cuadrante III', '2021-11-30 23:56:58.925', 0, 9, 'EVITAR, MITIGAR, TRANSFERIR O ASUMIR DE ACUERDO AL ANÁLISIS DE CADA RIESGO');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (5, '4', 'Probablemente ocurrirá en la mayoría de las circunstancias; cuando menos una vez al mes. Significativa probabilidad de Ocurrencia. Entre 61% y  80%.', 'Hasta 1 día al mes', '4. Medio Alta - Hasta 1 vez en 1 mes', 12, NULL, '2021-11-19 17:53:19.954', false, 'Media Alta', '2021-12-06 09:40:01.32', 0, 2, '80');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (13, '3', 'Puede ocurrir en algún momento; cuando menos una vez al año. Mediana probabilidad de ocurrencia. Entre 41% y 60%.', 'Hasta 1 dia en 1 años', '3. Media - Hasta 1 vez en 1 años', 1, NULL, '2021-11-23 11:06:41.375', false, 'Media', '2021-12-06 09:40:16.995', 0, 2, '60');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (17, '', '', '', '', NULL, NULL, '2021-11-27 11:01:00.184', false, 'Automático', '2021-11-27 11:01:00.184', 0, 7, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (18, '', '', '', '', NULL, NULL, '2021-11-27 11:01:18.27', false, 'Semiautomatico', '2021-11-27 11:01:18.27', 0, 7, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (19, '', '', '', '', NULL, NULL, '2021-11-27 11:01:25.795', false, 'Manual', '2021-11-27 11:01:25.795', 0, 7, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (20, '', '', '', '', NULL, NULL, '2021-11-27 11:03:32.437', false, 'Preventivo', '2021-11-27 11:03:32.437', 0, 6, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (21, '', '', '', '', NULL, NULL, '2021-11-27 11:03:42.498', false, 'Detectivo', '2021-11-27 11:03:42.498', 0, 6, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (22, '', '', '', '', NULL, NULL, '2021-11-27 11:03:52.685', false, 'Correctivo', '2021-11-27 11:03:52.685', 0, 6, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (27, '1', 'Puede ocurrir en circunstancias excepcionales; dos veces cada cinco años. Muy baja probabilidad de ocurrencia. Entre 1% y 20%.', 'Hasta 1 dia en 5 años', '1. Baja - Hasta 1 vez cada 5 años', 0.2, NULL, '2021-11-30 10:01:52.651', false, 'Baja', '2021-12-06 09:40:43.781', 0, 2, '20');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (28, '2', 'Pérdida menor, cobertura de medios local; aumento en los reclamos de los clientes con algún daño a la reputación; riesgo aceptable; no hay impacto negativo en el valor de las acciones. ', 'Impacto Medio Bajo.-  el 1,7 % del patrimonio promedio, como un impacto Medio Bajo para la empresa.', '2. Medio Bajo - Pérdida menor, algunos reclamos de clientes, 
O posible pérdida hasta USD 117.000', 39.001, 117, '2021-11-30 10:05:42.252', false, 'Medio Bajo', '2021-11-30 10:05:42.252', 0, 3, '40');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (6, '5', 'Pérdida o daño significativo; pérdida importante del valor de las acciones; riesgo inaceptable; intervención regulatoria formal y multas; pérdida de clientes a gran escala; involucramiento directo de la alta gerencia o directorio.', 'Impacto Alto.- mayor o igual al 7% del patrimonio promedio, debido a que un valor mayor determinaría un impacto muy grande para la organización.', '5. Alto - Pérdida significativa, multas sanciones, intervención regulador, perdida de clientes. O posible pérdida hasta USD 800.000 o mayor', 480.001, 800, '2021-11-22 10:57:05.464', false, 'Alto', '2021-11-30 09:45:05.994', 0, 3, '100');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, '2021-11-19 16:40:18.305', false, 'A. Eventos que generan pérdidas y afectan los Estados Financieros de la Empresa ---edit', '2021-12-17 17:42:17.44', 0, 1, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (33, '2', 'Medio Bajo', 'Indica que el riesgo tiene cierta probabilidad de ocurrencia e impacto considerable para la institución en caso de materializarse.', '117.000', NULL, NULL, '2021-11-30 23:57:52.191', false, 'Cuadrante IV', '2021-11-30 23:57:52.191', 0, 9, 'MITIGAR O ASUMIR DE ACUERDO AL ANÁLISIS DE CADA RIESGO');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (34, '1', 'Bajo edi', 'Indica que el riesgo tiene una mínima probabilidad de ocurrencia e impacto menor para ATC S.A. en caso de materializarse.', '39.000', NULL, NULL, '2021-11-30 23:58:32.328', false, 'Cuadrante IV', '2021-12-01 11:09:20.636', 0, 9, 'MITIGAR O ASUMIR DE ACUERDO AL ANÁLISIS DE CADA RIESGO');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (40, '2', '2. Los procedimientos o medidas de control no están formalizados y no siempre son utilizados o aplicados', '15', '', NULL, NULL, '2021-12-08 10:07:17.965', false, 'Los procedimientos o medidas de control no están formalizados y no siempre son utilizados o aplicados, o son efectuados y realizados, pero no se encuentran formalizados. 
', '2021-12-08 10:07:17.965', 0, 5, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (10, '5', '5. Los procedimientos y medidas de control están formalizados y siempre son utilizados, aplicados, medidos y monitoreados. Además de ser optimizados periodicamente', '80', NULL, NULL, NULL, '2021-11-22 11:04:51.925', false, 'Los procedimientos y medidas de control están formalizados y siempre son utilizados, aplicados, medidos y monitoreados. Además de ser optimizados periodicamente', '2021-12-08 10:07:31.421', 0, 5, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (16, '3', '3. Los procedimientos y medidas de control están formalizados y siempre son utilizados y aplicados', '50', NULL, NULL, NULL, '2021-11-23 11:09:29.093', false, 'Los procedimientos y medidas de control están formalizados y siempre son utilizados y aplicados', '2021-12-08 10:07:52.637', 0, 5, NULL);
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (41, '1', '1. Se tiene conciencia sobre la necesidad de contar con procedimientos o medidas de control', '0', '', NULL, NULL, '2021-12-08 10:08:30.979', false, 'Se tiene conciencia sobre la necesidad de contar con procedimientos o medidas de control', '2021-12-08 10:08:30.979', 0, 5, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (29, '1', 'Pérdida Insignificante; riesgo aceptable en el sector; no hay daño a la reputación, no hay cobertura en los medios, no aumentan las quejas de los clientes. ', 'Impacto Bajo .-  el 0,50 % del patrimonio promedio,  a fin de establecer un límite mínimo', '1. Bajo - Pérdida menor, algunos reclamos de clientes, 
O posible pérdida hasta USD 39.000', 0, 39, '2021-11-30 10:06:35.956', false, 'Bajo', '2021-11-30 10:06:35.956', 0, 3, '20');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (14, '3', 'Pérdida moderada; riesgo inusual; cobertura de medios nacionales limitada; reclamos de clientes a gran escala; pérdida de algunos clientes; indagaciones informales del regulador; posible involucramiento de la alta gerencia. Puede darse una sanción o amonestación del ente regulador. ', 'Impacto Medio.- el 3,0% del patrimonio promedio, como un impacto Medio para la Empresa.', '3. Medio - Pérdida moderada, reclamos de clientes, perdida de algunos clientes.
O posible pérdida hasta USD 272.000
O Sanción Regulador"', 117.001, 272, '2021-11-23 11:08:10.51', false, 'Medio', '2021-11-30 12:05:45.226', 0, 3, '60');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (35, '', '', '', '', NULL, NULL, '2021-12-04 12:56:11.663', false, 'Asumir', '2021-12-04 12:56:11.663', 0, 4, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (36, '', '', '', '', NULL, NULL, '2021-12-04 12:56:26.902', false, 'Transferir', '2021-12-04 12:56:26.902', 0, 4, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (37, '', '', '', '', NULL, NULL, '2021-12-04 12:56:35.854', false, 'Mitigar', '2021-12-04 12:56:35.854', 0, 4, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (38, '', '', '', '', NULL, NULL, '2021-12-04 12:56:51.429', false, 'Evitar', '2021-12-04 12:56:51.429', 0, 4, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (39, '', '', '', '', NULL, NULL, '2021-12-04 12:57:08.242', false, 'NA', '2021-12-04 12:57:08.242', 0, 4, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (4, '5', 'Ocurrirá en la mayoría de las circunstancias; todos los días o varias veces al mes. Casi con certeza se espera la ocurrencia del evento. Entre 81% y 100%.', 'Hasta todos los dias en el año', '5. Alta - Hasta todos los dias en el año', 365, NULL, '2021-11-19 17:52:56.568', false, 'Alta', '2021-12-16 17:59:20.859', 0, 2, '100');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (42, '', '', '', '', NULL, NULL, '2021-12-17 17:42:34.78', false, 'aaaa', '2021-12-17 17:42:34.78', 0, 8, '');
INSERT INTO ciro.tbl_tabla_descripcion_matriz_riesgo VALUES (43, '', '', '', '', NULL, NULL, '2021-12-18 16:04:03.485', false, 'hhhhhh edi', '2021-12-18 16:04:28.379', 0, 8, '');


--
-- TOC entry 3460 (class 0 OID 19375)
-- Dependencies: 217
-- Data for Name: tbl_tabla_lista; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_lista VALUES (1, NULL, false, 0, 0, 'Agencia', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (2, NULL, false, 1, 0, 'Ciudad', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (3, NULL, false, 0, 0, 'Área', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (4, NULL, false, 3, 0, 'Unidad', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (5, NULL, false, 0, 0, 'Entidad', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (6, NULL, false, 0, 0, 'Tipo de evento', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (7, NULL, false, 0, 0, 'Cargo', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (8, NULL, false, 0, 0, 'Fuente de información', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (9, NULL, false, 0, 0, 'Canal ASFI', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (10, NULL, false, 0, 0, 'Subcategorización', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (11, NULL, false, 0, 0, 'Categoria de tipo de Evento', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (12, NULL, false, 11, 0, 'Sub evento - Basilea', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (13, NULL, false, 12, 11, 'Clase Evento - Basilea', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (15, NULL, false, 0, 0, 'Proceso', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (16, NULL, false, 15, 0, 'Procedimiento', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (19, NULL, false, 0, 0, 'Efecto de pérdida', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (20, NULL, false, 0, 0, 'Operaciones, productos, servicios', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (21, NULL, false, 20, 0, 'Tipo de servicio', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (22, NULL, false, 21, 20, 'Descripción de servicio', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (23, NULL, false, 0, 0, 'Moneda', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (24, NULL, false, 0, 0, 'Impacto', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (25, NULL, false, 0, 0, 'Póliza ATC', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (17, NULL, false, 0, 0, 'Línea de negocio ASFI', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (18, NULL, false, 0, 0, 'Operaciones ASFI', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (14, NULL, false, 0, 0, 'Tasa de cambio', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (26, NULL, false, 0, 0, 'Factor de riesgo', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (27, NULL, false, 26, 0, 'Sub factor de riesgo', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (28, NULL, false, 0, 0, 'Reputacional', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (29, NULL, false, 0, 0, 'Legal', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (30, NULL, false, 0, 0, 'Cumplimiento', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (31, NULL, false, 0, 0, 'Estratégico', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (32, NULL, false, 0, 0, 'Gobierno', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (33, NULL, false, 0, 0, 'Fraude', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (34, NULL, false, 0, 0, 'Liquidez', NULL, 0);
INSERT INTO ciro.tbl_tabla_lista VALUES (35, NULL, false, 0, 0, 'Operativo', NULL, 0);


--
-- TOC entry 3472 (class 0 OID 28061)
-- Dependencies: 229
-- Data for Name: tbl_tabla_lista_matriz_oportunidad; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (1, '2021-12-14 17:17:01.103', false, 'Matriz FODA', '2021-12-14 17:17:01.103', 0, 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (2, '2021-12-14 17:17:45.382', false, 'Matriz FODA - Listado', '2021-12-14 17:17:45.382', 0, 1);
INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (3, '2021-12-14 17:18:28.838', false, 'Grupos de interés', '2021-12-14 17:18:28.838', 0, 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (4, '2021-12-14 17:18:58.138', false, 'Impacto de oportunidad', '2021-12-14 17:18:58.138', 0, 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (5, '2021-12-14 17:19:26.268', false, 'Tratamiento - oportunidad', '2021-12-14 17:19:26.268', 0, 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_oportunidad VALUES (6, '2021-12-14 17:19:43.943', false, 'Fortaleza - oportunidad', '2021-12-14 17:19:43.943', 0, 0);


--
-- TOC entry 3464 (class 0 OID 19583)
-- Dependencies: 221
-- Data for Name: tbl_tabla_lista_matriz_riesgo; Type: TABLE DATA; Schema: ciro; Owner: postgres
--

INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (1, '2021-11-19 15:53:15.005', false, 'Pérdida ASFI', '2021-11-19 15:53:15.005', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (2, '2021-11-19 15:55:55.676', false, 'Probabilidad', '2021-11-19 15:55:55.676', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (3, '2021-11-19 16:01:08.135', false, 'Impacto de Riesgo', '2021-11-19 16:01:08.135', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (5, '2021-11-22 10:31:30.875', false, 'Controles', '2021-11-22 10:31:30.875', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (6, '2021-11-27 10:56:36.333', false, 'Tipo de control', '2021-11-27 10:56:36.333', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (7, '2021-11-27 10:57:14.896', false, 'Nivel de automatización', '2021-11-27 10:57:14.896', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (8, '2021-11-29 11:38:16.402', false, 'Identificado por', '2021-11-29 11:38:16.402', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (9, '2021-11-30 23:28:13.702', false, 'Nivel de riesgo inherente', '2021-11-30 23:28:13.702', 0);
INSERT INTO ciro.tbl_tabla_lista_matriz_riesgo VALUES (4, '2021-11-19 16:01:55.375', false, 'Estrategia para administrar el riesgo', '2021-11-19 16:01:55.375', 0);


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 210
-- Name: tbl_archivo_arc_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_archivo_arc_id_seq', 1, false);


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 212
-- Name: tbl_evento_riesgo_eve_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_evento_riesgo_eve_id_seq', 81, true);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 230
-- Name: tbl_matriz_oportunidad_opo_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_matriz_oportunidad_opo_id_seq', 2, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 224
-- Name: tbl_matriz_riesgo_rie_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_matriz_riesgo_rie_id_seq', 21, true);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 222
-- Name: tbl_observacion_obs_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_observacion_obs_id_seq', 29, true);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 214
-- Name: tbl_tabla_descripcion_des_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_descripcion_des_id_seq', 88, true);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 226
-- Name: tbl_tabla_descripcion_matriz_oportunidad_des_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_descripcion_matriz_oportunidad_des_id_seq', 29, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 218
-- Name: tbl_tabla_descripcion_matriz_riesgo_des_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_descripcion_matriz_riesgo_des_id_seq', 43, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 216
-- Name: tbl_tabla_lista_lis_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_lista_lis_id_seq', 35, true);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 228
-- Name: tbl_tabla_lista_matriz_oportunidad_lis_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_lista_matriz_oportunidad_lis_id_seq', 6, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 220
-- Name: tbl_tabla_lista_matriz_riesgo_lis_id_seq; Type: SEQUENCE SET; Schema: ciro; Owner: postgres
--

SELECT pg_catalog.setval('ciro.tbl_tabla_lista_matriz_riesgo_lis_id_seq', 11, true);


--
-- TOC entry 3227 (class 2606 OID 19346)
-- Name: tbl_archivo tbl_archivo_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_archivo
    ADD CONSTRAINT tbl_archivo_pkey PRIMARY KEY (arc_id);


--
-- TOC entry 3229 (class 2606 OID 19355)
-- Name: tbl_evento_riesgo tbl_evento_riesgo_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT tbl_evento_riesgo_pkey PRIMARY KEY (eve_id);


--
-- TOC entry 3247 (class 2606 OID 28156)
-- Name: tbl_matriz_oportunidad tbl_matriz_oportunidad_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT tbl_matriz_oportunidad_pkey PRIMARY KEY (opo_id);


--
-- TOC entry 3241 (class 2606 OID 27980)
-- Name: tbl_matriz_riesgo tbl_matriz_riesgo_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT tbl_matriz_riesgo_pkey PRIMARY KEY (rie_id);


--
-- TOC entry 3239 (class 2606 OID 19662)
-- Name: tbl_observacion tbl_observacion_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_observacion
    ADD CONSTRAINT tbl_observacion_pkey PRIMARY KEY (obs_id);


--
-- TOC entry 3243 (class 2606 OID 28059)
-- Name: tbl_tabla_descripcion_matriz_oportunidad tbl_tabla_descripcion_matriz_oportunidad_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_oportunidad
    ADD CONSTRAINT tbl_tabla_descripcion_matriz_oportunidad_pkey PRIMARY KEY (des_id);


--
-- TOC entry 3235 (class 2606 OID 19581)
-- Name: tbl_tabla_descripcion_matriz_riesgo tbl_tabla_descripcion_matriz_riesgo_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_riesgo
    ADD CONSTRAINT tbl_tabla_descripcion_matriz_riesgo_pkey PRIMARY KEY (des_id);


--
-- TOC entry 3231 (class 2606 OID 19373)
-- Name: tbl_tabla_descripcion tbl_tabla_descripcion_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion
    ADD CONSTRAINT tbl_tabla_descripcion_pkey PRIMARY KEY (des_id);


--
-- TOC entry 3245 (class 2606 OID 28066)
-- Name: tbl_tabla_lista_matriz_oportunidad tbl_tabla_lista_matriz_oportunidad_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista_matriz_oportunidad
    ADD CONSTRAINT tbl_tabla_lista_matriz_oportunidad_pkey PRIMARY KEY (lis_id);


--
-- TOC entry 3237 (class 2606 OID 19588)
-- Name: tbl_tabla_lista_matriz_riesgo tbl_tabla_lista_matriz_riesgo_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista_matriz_riesgo
    ADD CONSTRAINT tbl_tabla_lista_matriz_riesgo_pkey PRIMARY KEY (lis_id);


--
-- TOC entry 3233 (class 2606 OID 19380)
-- Name: tbl_tabla_lista tbl_tabla_lista_pkey; Type: CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_lista
    ADD CONSTRAINT tbl_tabla_lista_pkey PRIMARY KEY (lis_id);


--
-- TOC entry 3271 (class 2606 OID 19496)
-- Name: tbl_evento_riesgo fk12w0goi9gtmw35g6k07nqmaxt; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk12w0goi9gtmw35g6k07nqmaxt FOREIGN KEY (eve_operacion_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3277 (class 2606 OID 19526)
-- Name: tbl_evento_riesgo fk16nno652f0lakx6qsndg2a1i8; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk16nno652f0lakx6qsndg2a1i8 FOREIGN KEY (eve_seguridad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3283 (class 2606 OID 19566)
-- Name: tbl_tabla_descripcion fk1e9cn10loq6vfibruy5h98yd; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion
    ADD CONSTRAINT fk1e9cn10loq6vfibruy5h98yd FOREIGN KEY (des_tabla_id) REFERENCES ciro.tbl_tabla_lista(lis_id);


--
-- TOC entry 3302 (class 2606 OID 28162)
-- Name: tbl_matriz_oportunidad fk1sif95enpcpr8y1ehfwgitgww; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk1sif95enpcpr8y1ehfwgitgww FOREIGN KEY (opo_dueno_cargo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3290 (class 2606 OID 27991)
-- Name: tbl_matriz_riesgo fk1ujr48qlf0gd7s8egpnncv3fb; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk1ujr48qlf0gd7s8egpnncv3fb FOREIGN KEY (rie_dueno_cargo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3300 (class 2606 OID 28041)
-- Name: tbl_matriz_riesgo fk1ut6pluqghfpd2stv5igky9lp; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk1ut6pluqghfpd2stv5igky9lp FOREIGN KEY (rie_unidad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3284 (class 2606 OID 19589)
-- Name: tbl_tabla_descripcion_matriz_riesgo fk2b6o330bhge9dug9sqowvon7m; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_riesgo
    ADD CONSTRAINT fk2b6o330bhge9dug9sqowvon7m FOREIGN KEY (des_tabla_id) REFERENCES ciro.tbl_tabla_lista_matriz_riesgo(lis_id);


--
-- TOC entry 3303 (class 2606 OID 28157)
-- Name: tbl_matriz_oportunidad fk2f0i0mskcvidijk6e87o1svnt; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk2f0i0mskcvidijk6e87o1svnt FOREIGN KEY (opo_area_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3253 (class 2606 OID 19406)
-- Name: tbl_evento_riesgo fk42fo3thtayg542pjsbo8hbs1h; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk42fo3thtayg542pjsbo8hbs1h FOREIGN KEY (eve_ciudad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3268 (class 2606 OID 19481)
-- Name: tbl_evento_riesgo fk4pcgjluvseluj1tvtibp9ikf8; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk4pcgjluvseluj1tvtibp9ikf8 FOREIGN KEY (eve_liquidez_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3304 (class 2606 OID 28167)
-- Name: tbl_matriz_oportunidad fk4ubq5wmw6r5f3cfrj0qnvmtg3; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk4ubq5wmw6r5f3cfrj0qnvmtg3 FOREIGN KEY (opo_foda_desc_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_oportunidad(des_id);


--
-- TOC entry 3292 (class 2606 OID 28001)
-- Name: tbl_matriz_riesgo fk4w54y9uh4dlt6df1x2m8n163b; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk4w54y9uh4dlt6df1x2m8n163b FOREIGN KEY (rie_factor_riesgo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3299 (class 2606 OID 28036)
-- Name: tbl_matriz_riesgo fk4x34kbk69bebc3l7ym2s5tkam; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk4x34kbk69bebc3l7ym2s5tkam FOREIGN KEY (rie_responsable_cargo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3305 (class 2606 OID 28197)
-- Name: tbl_matriz_oportunidad fk5egsp3dsywyibse5ixupf0g7l; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk5egsp3dsywyibse5ixupf0g7l FOREIGN KEY (opo_procedimiento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3297 (class 2606 OID 28026)
-- Name: tbl_matriz_riesgo fk63469q9wth99y4jwb63s1wt90; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk63469q9wth99y4jwb63s1wt90 FOREIGN KEY (rie_procedimiento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3294 (class 2606 OID 28011)
-- Name: tbl_matriz_riesgo fk64y80n1mwnifdnqupggw7v490; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fk64y80n1mwnifdnqupggw7v490 FOREIGN KEY (rie_impacto_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3266 (class 2606 OID 19471)
-- Name: tbl_evento_riesgo fk66x6l0hka9x1w3lbyk4s93x6a; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk66x6l0hka9x1w3lbyk4s93x6a FOREIGN KEY (eve_lgi_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3306 (class 2606 OID 28207)
-- Name: tbl_matriz_oportunidad fk6hd8qa7e9p3uvl559lmalared; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk6hd8qa7e9p3uvl559lmalared FOREIGN KEY (opo_responsable_cargo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3307 (class 2606 OID 28187)
-- Name: tbl_matriz_oportunidad fk6iuhiojnubmt38b3v1522x05m; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fk6iuhiojnubmt38b3v1522x05m FOREIGN KEY (opo_impacto_opor_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_oportunidad(des_id);


--
-- TOC entry 3258 (class 2606 OID 19431)
-- Name: tbl_evento_riesgo fk6x2bwi53333cf4ys60vydm02c; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk6x2bwi53333cf4ys60vydm02c FOREIGN KEY (eve_entidad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3263 (class 2606 OID 19456)
-- Name: tbl_evento_riesgo fk7growi0ieni1vlmoosi0psg8f; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk7growi0ieni1vlmoosi0psg8f FOREIGN KEY (eve_gobierno_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3286 (class 2606 OID 28046)
-- Name: tbl_observacion fk7qth4ovpk9gpxk77bd3vbswou; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_observacion
    ADD CONSTRAINT fk7qth4ovpk9gpxk77bd3vbswou FOREIGN KEY (obs_matriz_riesgo_id) REFERENCES ciro.tbl_matriz_riesgo(rie_id);


--
-- TOC entry 3281 (class 2606 OID 19551)
-- Name: tbl_evento_riesgo fk84s1katn3qc9ormvjag3ywoyt; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk84s1katn3qc9ormvjag3ywoyt FOREIGN KEY (eve_tipo_servicio_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3256 (class 2606 OID 19421)
-- Name: tbl_evento_riesgo fk9bb4sykdjrydstygcu13i8bvh; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fk9bb4sykdjrydstygcu13i8bvh FOREIGN KEY (eve_desc_servicio_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3265 (class 2606 OID 19466)
-- Name: tbl_evento_riesgo fka3jy5sbf3hnqry1tae1in1ro9; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fka3jy5sbf3hnqry1tae1in1ro9 FOREIGN KEY (eve_legal_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3287 (class 2606 OID 28217)
-- Name: tbl_observacion fkakdglyt4njplc0rglx37fh96x; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_observacion
    ADD CONSTRAINT fkakdglyt4njplc0rglx37fh96x FOREIGN KEY (obs_matriz_oportunidad_id) REFERENCES ciro.tbl_matriz_oportunidad(opo_id);


--
-- TOC entry 3252 (class 2606 OID 19401)
-- Name: tbl_evento_riesgo fkaq1asf6ta57w3e97xmua2b6le; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkaq1asf6ta57w3e97xmua2b6le FOREIGN KEY (eve_cargo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3264 (class 2606 OID 19461)
-- Name: tbl_evento_riesgo fkb5vc3rhe4d8qkn6ym1affbjhe; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkb5vc3rhe4d8qkn6ym1affbjhe FOREIGN KEY (eve_impacto_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3260 (class 2606 OID 19441)
-- Name: tbl_evento_riesgo fkbfy7c6dcnv6u81sofkr1ijq8d; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkbfy7c6dcnv6u81sofkr1ijq8d FOREIGN KEY (eve_factor_riesgo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3262 (class 2606 OID 19451)
-- Name: tbl_evento_riesgo fkcadep4ca9y5wa77mmv66r13me; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkcadep4ca9y5wa77mmv66r13me FOREIGN KEY (eve_fuente_inf_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3282 (class 2606 OID 19556)
-- Name: tbl_evento_riesgo fkd936bomogb9tyjmjdttjl3xwj; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkd936bomogb9tyjmjdttjl3xwj FOREIGN KEY (eve_unidad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3270 (class 2606 OID 19491)
-- Name: tbl_evento_riesgo fkdcp92wmtmoboqu28u32rl8vig; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkdcp92wmtmoboqu28u32rl8vig FOREIGN KEY (eve_ope_pro_ser_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3285 (class 2606 OID 19663)
-- Name: tbl_observacion fkdnnvfyulebv8qahp5ef33t5ce; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_observacion
    ADD CONSTRAINT fkdnnvfyulebv8qahp5ef33t5ce FOREIGN KEY (obs_evento_id) REFERENCES ciro.tbl_evento_riesgo(eve_id);


--
-- TOC entry 3257 (class 2606 OID 19426)
-- Name: tbl_evento_riesgo fkdsw3ejwlmne85pi6li2b9b34g; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkdsw3ejwlmne85pi6li2b9b34g FOREIGN KEY (eve_efecto_perdida_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3269 (class 2606 OID 19486)
-- Name: tbl_evento_riesgo fkeaf59xkm4dwm6fqpx6uu6kyo6; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkeaf59xkm4dwm6fqpx6uu6kyo6 FOREIGN KEY (eve_moneda_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3295 (class 2606 OID 28016)
-- Name: tbl_matriz_riesgo fkelse5n5bkf3i5il4onwml1ouh; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkelse5n5bkf3i5il4onwml1ouh FOREIGN KEY (rie_perdida_asfi_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3273 (class 2606 OID 19506)
-- Name: tbl_evento_riesgo fkfg0onvx0wqodyr9te715asf8q; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkfg0onvx0wqodyr9te715asf8q FOREIGN KEY (eve_poliza_seguro_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3280 (class 2606 OID 19546)
-- Name: tbl_evento_riesgo fkfxlah17g0x076x37cipw0my5j; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkfxlah17g0x076x37cipw0my5j FOREIGN KEY (eve_tipo_evento_perdida_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3274 (class 2606 OID 19511)
-- Name: tbl_evento_riesgo fkfyu6nkn5y6kmd5mkqa2xrxon4; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkfyu6nkn5y6kmd5mkqa2xrxon4 FOREIGN KEY (eve_procedimiento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3308 (class 2606 OID 28192)
-- Name: tbl_matriz_oportunidad fkgb5girltaqcchc4pcoc0is4bc; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkgb5girltaqcchc4pcoc0is4bc FOREIGN KEY (opo_probabilidad_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3309 (class 2606 OID 28212)
-- Name: tbl_matriz_oportunidad fkgr3ny7q7kn8h9s4863t7fxws7; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkgr3ny7q7kn8h9s4863t7fxws7 FOREIGN KEY (opo_unidad_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3267 (class 2606 OID 19476)
-- Name: tbl_evento_riesgo fkgxpobfn6k4vwqsukvwvifrjnr; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkgxpobfn6k4vwqsukvwvifrjnr FOREIGN KEY (eve_linea_asfi_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3298 (class 2606 OID 28031)
-- Name: tbl_matriz_riesgo fkharoo3c6fpov3b6kafdg3dd1k; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkharoo3c6fpov3b6kafdg3dd1k FOREIGN KEY (rie_proceso_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3291 (class 2606 OID 27996)
-- Name: tbl_matriz_riesgo fkhcfiur4a8vls3r6ermw1a660y; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkhcfiur4a8vls3r6ermw1a660y FOREIGN KEY (rie_efecto_perdida_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3276 (class 2606 OID 19521)
-- Name: tbl_evento_riesgo fkhtv53t6a16i78byqdscb8p0hw; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkhtv53t6a16i78byqdscb8p0hw FOREIGN KEY (eve_reputacional_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3310 (class 2606 OID 28172)
-- Name: tbl_matriz_oportunidad fkidm8jrj82sahtxjdtfumw3py3; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkidm8jrj82sahtxjdtfumw3py3 FOREIGN KEY (opo_foda_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_oportunidad(des_id);


--
-- TOC entry 3296 (class 2606 OID 28021)
-- Name: tbl_matriz_riesgo fkidt5n7bdp4go75dktprp5mfow; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkidt5n7bdp4go75dktprp5mfow FOREIGN KEY (rie_probabilidad_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3254 (class 2606 OID 19411)
-- Name: tbl_evento_riesgo fkj6b1ai65b9v731s45vofwvwix; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkj6b1ai65b9v731s45vofwvwix FOREIGN KEY (eve_clase_evento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3249 (class 2606 OID 19386)
-- Name: tbl_evento_riesgo fkj9i28e53cl0orvor2k1et3lrx; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkj9i28e53cl0orvor2k1et3lrx FOREIGN KEY (eve_agencia_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3311 (class 2606 OID 28182)
-- Name: tbl_matriz_oportunidad fkj9jvw67ltclm3fxgjn88qscx4; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkj9jvw67ltclm3fxgjn88qscx4 FOREIGN KEY (opo_grupo_interes_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_oportunidad(des_id);


--
-- TOC entry 3279 (class 2606 OID 19536)
-- Name: tbl_evento_riesgo fkkli2cey2x1bvpi7pgxa49kyen; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkkli2cey2x1bvpi7pgxa49kyen FOREIGN KEY (eve_subcategorizacion_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3272 (class 2606 OID 19501)
-- Name: tbl_evento_riesgo fkl6ayqnms8fgdh2or9qab30qmd; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkl6ayqnms8fgdh2or9qab30qmd FOREIGN KEY (eve_operativo_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3312 (class 2606 OID 28177)
-- Name: tbl_matriz_oportunidad fkmmoi0ww81xr8vfknacc6r3496; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkmmoi0ww81xr8vfknacc6r3496 FOREIGN KEY (opo_fortaleza_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_oportunidad(des_id);


--
-- TOC entry 3288 (class 2606 OID 27981)
-- Name: tbl_matriz_riesgo fknjjldgqewxa0m0ks4i6gyc5qo; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fknjjldgqewxa0m0ks4i6gyc5qo FOREIGN KEY (rie_area_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3261 (class 2606 OID 19446)
-- Name: tbl_evento_riesgo fknwm7t6nsd07agt4v0qa07sghm; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fknwm7t6nsd07agt4v0qa07sghm FOREIGN KEY (eve_fraude_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3248 (class 2606 OID 19381)
-- Name: tbl_archivo fko2xg70h9e0w5hnmt49vysv9h9; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_archivo
    ADD CONSTRAINT fko2xg70h9e0w5hnmt49vysv9h9 FOREIGN KEY (arc_evento_id) REFERENCES ciro.tbl_evento_riesgo(eve_id);


--
-- TOC entry 3289 (class 2606 OID 27986)
-- Name: tbl_matriz_riesgo fkp81eilrr2lpk0mq9ocsxdaq32; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkp81eilrr2lpk0mq9ocsxdaq32 FOREIGN KEY (rie_control_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3275 (class 2606 OID 19516)
-- Name: tbl_evento_riesgo fkpsl268e3c8g3y9jjujjq0766f; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkpsl268e3c8g3y9jjujjq0766f FOREIGN KEY (eve_proceso_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3255 (class 2606 OID 19416)
-- Name: tbl_evento_riesgo fkr0s1myad2ve9cnewtuve7aboa; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkr0s1myad2ve9cnewtuve7aboa FOREIGN KEY (eve_cumplimiento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3251 (class 2606 OID 19396)
-- Name: tbl_evento_riesgo fkr6lnb23bvy879b02cwjmw1i7e; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkr6lnb23bvy879b02cwjmw1i7e FOREIGN KEY (eve_canal_asfi_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3313 (class 2606 OID 28202)
-- Name: tbl_matriz_oportunidad fkryevfqcww1lx795m853mvkqq2; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_oportunidad
    ADD CONSTRAINT fkryevfqcww1lx795m853mvkqq2 FOREIGN KEY (opo_proceso_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3301 (class 2606 OID 28067)
-- Name: tbl_tabla_descripcion_matriz_oportunidad fkse9mdydrut2d7tmro5g0adgbh; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_tabla_descripcion_matriz_oportunidad
    ADD CONSTRAINT fkse9mdydrut2d7tmro5g0adgbh FOREIGN KEY (des_tabla_id) REFERENCES ciro.tbl_tabla_lista_matriz_oportunidad(lis_id);


--
-- TOC entry 3250 (class 2606 OID 19391)
-- Name: tbl_evento_riesgo fksgk3rftla9x7jdwlu5m3xwx3i; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fksgk3rftla9x7jdwlu5m3xwx3i FOREIGN KEY (eve_area_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3259 (class 2606 OID 19436)
-- Name: tbl_evento_riesgo fksikfi91c08ndv9tpkh7kfi6o1; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fksikfi91c08ndv9tpkh7kfi6o1 FOREIGN KEY (eve_estrategico_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


--
-- TOC entry 3293 (class 2606 OID 28006)
-- Name: tbl_matriz_riesgo fkt0q7i2d061qvo72fb4xrdkegt; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_matriz_riesgo
    ADD CONSTRAINT fkt0q7i2d061qvo72fb4xrdkegt FOREIGN KEY (rie_identificado_id) REFERENCES ciro.tbl_tabla_descripcion_matriz_riesgo(des_id);


--
-- TOC entry 3278 (class 2606 OID 19531)
-- Name: tbl_evento_riesgo fkx5kn11pg4ccxt8s9a8comjim; Type: FK CONSTRAINT; Schema: ciro; Owner: postgres
--

ALTER TABLE ONLY ciro.tbl_evento_riesgo
    ADD CONSTRAINT fkx5kn11pg4ccxt8s9a8comjim FOREIGN KEY (eve_sub_evento_id) REFERENCES ciro.tbl_tabla_descripcion(des_id);


-- Completed on 2021-12-18 17:07:19

--
-- PostgreSQL database dump complete
--

