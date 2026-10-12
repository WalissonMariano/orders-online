import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTypeOfItems1721770000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.type_of_items (
        id integer NOT NULL,
        type_items_description character varying NOT NULL,
        tax_percentage numeric(6, 2) NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY (id)
      );

      CREATE SEQUENCE public.type_of_items_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1;

      ALTER SEQUENCE public.type_of_items_id_seq OWNED BY public.type_of_items.id;

      ALTER TABLE ONLY public.type_of_items
        ALTER COLUMN id SET DEFAULT nextval('public.type_of_items_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.type_of_items
    `);
  }
}
