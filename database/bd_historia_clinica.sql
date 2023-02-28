PGDMP                         {            bd_historia_clinica    15.2    15.2 $               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    16398    bd_historia_clinica    DATABASE     �   CREATE DATABASE bd_historia_clinica WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
 #   DROP DATABASE bd_historia_clinica;
                postgres    false                        2615    16399    historia    SCHEMA        CREATE SCHEMA historia;
    DROP SCHEMA historia;
                postgres    false            �            1259    16433    hospital    TABLE     �  CREATE TABLE historia.hospital (
    "emailHospital" character varying(255) NOT NULL,
    "telefonoHospital" character varying(255) NOT NULL,
    "contraseniaHospital" character varying(255) NOT NULL,
    "nombreHospital" character varying(255) NOT NULL,
    "direccionHospital" character varying(255) NOT NULL,
    "servicioMedicoHospital" character varying(2048) NOT NULL,
    "idHospital" integer NOT NULL,
    "ID" integer NOT NULL,
    "tipoUsuario" character varying DEFAULT 'H'::character varying
);
    DROP TABLE historia.hospital;
       historia         heap    postgres    false    6            �            1259    16479    hospital_ID_seq    SEQUENCE     �   CREATE SEQUENCE historia."hospital_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE historia."hospital_ID_seq";
       historia          postgres    false    217    6            #           0    0    hospital_ID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE historia."hospital_ID_seq" OWNED BY historia.hospital."ID";
          historia          postgres    false    221            �            1259    16419    medico    TABLE     �  CREATE TABLE historia.medico (
    "tipoUsuario" character varying(255) DEFAULT 'M'::character varying NOT NULL,
    "emailMedico" character varying(255) NOT NULL,
    "telefonoMedico" character varying(255) NOT NULL,
    "contraseniaMedico" character varying(255) NOT NULL,
    "nombreMedico" character varying(255) NOT NULL,
    "direccionMedico" character varying(255) NOT NULL,
    "servicioMedico" character varying(2048) NOT NULL,
    "idMedico" integer NOT NULL,
    "ID" integer NOT NULL
);
    DROP TABLE historia.medico;
       historia         heap    postgres    false    6            �            1259    16471    medico_ID_seq    SEQUENCE     �   CREATE SEQUENCE historia."medico_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE historia."medico_ID_seq";
       historia          postgres    false    6    216            $           0    0    medico_ID_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE historia."medico_ID_seq" OWNED BY historia.medico."ID";
          historia          postgres    false    220            �            1259    16442    observacion    TABLE     V  CREATE TABLE historia.observacion (
    "ID" integer NOT NULL,
    "observacionMedica" character varying(2048) NOT NULL,
    "estadoPaciente" character varying(2048) NOT NULL,
    "especialidadPaciente" character varying(2048) NOT NULL,
    "idMedico" integer NOT NULL,
    "idPaciente" integer NOT NULL,
    "idHospital" integer NOT NULL
);
 !   DROP TABLE historia.observacion;
       historia         heap    postgres    false    6            �            1259    16441    observacion_ID_seq    SEQUENCE     �   CREATE SEQUENCE historia."observacion_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE historia."observacion_ID_seq";
       historia          postgres    false    6    219            %           0    0    observacion_ID_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE historia."observacion_ID_seq" OWNED BY historia.observacion."ID";
          historia          postgres    false    218            �            1259    16401    paciente    TABLE     �  CREATE TABLE historia.paciente (
    "emailPaciente" character varying(255) NOT NULL,
    "telefonoPaciente" character varying(255) NOT NULL,
    "contraseniaPaciente" character varying NOT NULL,
    "nombrePaciente" character varying(255) NOT NULL,
    "direccionPaciente" character varying(255) NOT NULL,
    "fechaNacimientoPaciente" date,
    "tipoUsuario" character varying DEFAULT 'P'::character varying NOT NULL,
    "idPaciente" integer NOT NULL,
    "ID" integer NOT NULL
);
    DROP TABLE historia.paciente;
       historia         heap    postgres    false    6            �            1259    16495    paciente_ID_seq    SEQUENCE     �   CREATE SEQUENCE historia."paciente_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE historia."paciente_ID_seq";
       historia          postgres    false    215    6            &           0    0    paciente_ID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE historia."paciente_ID_seq" OWNED BY historia.paciente."ID";
          historia          postgres    false    222            y           2604    16480    hospital ID    DEFAULT     r   ALTER TABLE ONLY historia.hospital ALTER COLUMN "ID" SET DEFAULT nextval('historia."hospital_ID_seq"'::regclass);
 >   ALTER TABLE historia.hospital ALTER COLUMN "ID" DROP DEFAULT;
       historia          postgres    false    221    217            x           2604    16472 	   medico ID    DEFAULT     n   ALTER TABLE ONLY historia.medico ALTER COLUMN "ID" SET DEFAULT nextval('historia."medico_ID_seq"'::regclass);
 <   ALTER TABLE historia.medico ALTER COLUMN "ID" DROP DEFAULT;
       historia          postgres    false    220    216            {           2604    16445    observacion ID    DEFAULT     x   ALTER TABLE ONLY historia.observacion ALTER COLUMN "ID" SET DEFAULT nextval('historia."observacion_ID_seq"'::regclass);
 A   ALTER TABLE historia.observacion ALTER COLUMN "ID" DROP DEFAULT;
       historia          postgres    false    218    219    219            v           2604    16496    paciente ID    DEFAULT     r   ALTER TABLE ONLY historia.paciente ALTER COLUMN "ID" SET DEFAULT nextval('historia."paciente_ID_seq"'::regclass);
 >   ALTER TABLE historia.paciente ALTER COLUMN "ID" DROP DEFAULT;
       historia          postgres    false    222    215                      0    16433    hospital 
   TABLE DATA           �   COPY historia.hospital ("emailHospital", "telefonoHospital", "contraseniaHospital", "nombreHospital", "direccionHospital", "servicioMedicoHospital", "idHospital", "ID", "tipoUsuario") FROM stdin;
    historia          postgres    false    217   �-                 0    16419    medico 
   TABLE DATA           �   COPY historia.medico ("tipoUsuario", "emailMedico", "telefonoMedico", "contraseniaMedico", "nombreMedico", "direccionMedico", "servicioMedico", "idMedico", "ID") FROM stdin;
    historia          postgres    false    216   �.                 0    16442    observacion 
   TABLE DATA           �   COPY historia.observacion ("ID", "observacionMedica", "estadoPaciente", "especialidadPaciente", "idMedico", "idPaciente", "idHospital") FROM stdin;
    historia          postgres    false    219   H/                 0    16401    paciente 
   TABLE DATA           �   COPY historia.paciente ("emailPaciente", "telefonoPaciente", "contraseniaPaciente", "nombrePaciente", "direccionPaciente", "fechaNacimientoPaciente", "tipoUsuario", "idPaciente", "ID") FROM stdin;
    historia          postgres    false    215   �/       '           0    0    hospital_ID_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('historia."hospital_ID_seq"', 8, true);
          historia          postgres    false    221            (           0    0    medico_ID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('historia."medico_ID_seq"', 29, true);
          historia          postgres    false    220            )           0    0    observacion_ID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('historia."observacion_ID_seq"', 8, true);
          historia          postgres    false    218            *           0    0    paciente_ID_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('historia."paciente_ID_seq"', 14, true);
          historia          postgres    false    222                       2606    16467    medico medico_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY historia.medico
    ADD CONSTRAINT medico_pkey PRIMARY KEY ("idMedico");
 >   ALTER TABLE ONLY historia.medico DROP CONSTRAINT medico_pkey;
       historia            postgres    false    216            �           2606    16449    observacion observacion_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY historia.observacion
    ADD CONSTRAINT observacion_pkey PRIMARY KEY ("ID");
 H   ALTER TABLE ONLY historia.observacion DROP CONSTRAINT observacion_pkey;
       historia            postgres    false    219            }           2606    16503    paciente paciente_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY historia.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY ("idPaciente");
 B   ALTER TABLE ONLY historia.paciente DROP CONSTRAINT paciente_pkey;
       historia            postgres    false    215            �           2606    16469    hospital pk 
   CONSTRAINT     U   ALTER TABLE ONLY historia.hospital
    ADD CONSTRAINT pk PRIMARY KEY ("idHospital");
 7   ALTER TABLE ONLY historia.hospital DROP CONSTRAINT pk;
       historia            postgres    false    217            �           2606    16514    observacion fk_id_hospital    FK CONSTRAINT     �   ALTER TABLE ONLY historia.observacion
    ADD CONSTRAINT fk_id_hospital FOREIGN KEY ("idHospital") REFERENCES historia.hospital("idHospital") NOT VALID;
 F   ALTER TABLE ONLY historia.observacion DROP CONSTRAINT fk_id_hospital;
       historia          postgres    false    217    3201    219            �           2606    16504    observacion fk_id_medico    FK CONSTRAINT     �   ALTER TABLE ONLY historia.observacion
    ADD CONSTRAINT fk_id_medico FOREIGN KEY ("idMedico") REFERENCES historia.medico("idMedico") NOT VALID;
 D   ALTER TABLE ONLY historia.observacion DROP CONSTRAINT fk_id_medico;
       historia          postgres    false    3199    219    216            �           2606    16509    observacion fk_id_paciente    FK CONSTRAINT     �   ALTER TABLE ONLY historia.observacion
    ADD CONSTRAINT fk_id_paciente FOREIGN KEY ("idPaciente") REFERENCES historia.paciente("idPaciente") NOT VALID;
 F   ALTER TABLE ONLY historia.observacion DROP CONSTRAINT fk_id_paciente;
       historia          postgres    false    215    219    3197               �   x�%�M�0 ���+y���[�Q.��0�j9y+�үO���Κ{�\Sw��u,g0|@���!��`B �i��.��q��ճ�����ǕU^$��楫��T�v�A��j�"�O�d����L�l�I���7�hH�I��gc���/�         �   x�%��
�0 ����<��ߡ��!ґ�I k'�2���)z��N��SdLo�����]ˍ���14~"1$q*
A������N5{6�Q��ڛ�
��޺��UUuY$<?K�OqN�?aj9��Kǐ��� .�$�c0�����8$�SDNP�kH)�'�0�         T   x���(J-N�+IT(��+��M,VHIUH�+�LMIL�t-.IL�I�(�L���O�L�4404340722 2,� ��͋���� ��/�         �   x�%��
�@ ���yUwf7]oaA�F&]&YLZD����ӻ=7N��[�ڞW����q ��J�&��'�Q���}��΅͞�c�0��f��,��n�sUDU]���F�I�P�z���e� )2���U`�� 1�%��2F�I0�5�<�*�+$     