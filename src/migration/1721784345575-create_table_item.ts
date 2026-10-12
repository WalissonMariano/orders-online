import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableItems1721784345575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.item (
        id integer NOT NULL,
        number_item integer NOT NULL,
        type_of_item_id integer NOT NULL,
        item_description character varying NOT NULL,
        unit_value numeric(6, 2) NOT NULL,
        image character varying NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY (id)
      );

      CREATE SEQUENCE public.item_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1;

      ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;

      ALTER TABLE ONLY public.item
        ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);

      ALTER TABLE public.item
        ADD CONSTRAINT fk_item_type_of_item_id
        FOREIGN KEY (type_of_item_id) REFERENCES public.type_of_items (id);

      CREATE INDEX idx_item_type_of_item_id ON public.item (type_of_item_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.item
    `);
  }
}
