import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrderItems1729967663182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        
            CREATE TABLE public.order_items (
                    id integer NOT NULL,
                    order_id integer NOT NULL,
                    item_id integer NOT NULL,
                    quantity double precision NOT NULL,
                    tax_value double precision NOT NULL,
                    total_value double precision NOT NULL,
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
    
            ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);
    
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE public.order_items
            `);
  }
}
