import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrder1721778979829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public."order" (
        id integer NOT NULL,
        order_number integer NOT NULL,
        order_description character varying NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY (id)
      );

      CREATE SEQUENCE public.order_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1;

      ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;

      ALTER TABLE ONLY public."order"
        ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public."order"
    `);
  }
}
