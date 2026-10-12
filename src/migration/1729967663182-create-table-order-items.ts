import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrderItems1729967663182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.order_items (
        id integer NOT NULL,
        order_id integer NOT NULL,
        item_id integer NOT NULL,
        quantity integer NOT NULL,
        tax_value numeric(6, 2) NOT NULL,
        total_value numeric(6, 2) NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        update_at timestamp without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY (id)
      );

      CREATE SEQUENCE public.order_items_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 2147483647
        CACHE 1;

      ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;

      ALTER TABLE ONLY public.order_items
        ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);

      ALTER TABLE public.order_items
        ADD CONSTRAINT fk_order_items_order_id
        FOREIGN KEY (order_id) REFERENCES public."order" (id) ON DELETE CASCADE;

      ALTER TABLE public.order_items
        ADD CONSTRAINT fk_order_items_item_id
        FOREIGN KEY (item_id) REFERENCES public.item (id);

      CREATE INDEX idx_order_items_order_id ON public.order_items (order_id);
      CREATE INDEX idx_order_items_item_id ON public.order_items (item_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.order_items
    `);
  }
}
