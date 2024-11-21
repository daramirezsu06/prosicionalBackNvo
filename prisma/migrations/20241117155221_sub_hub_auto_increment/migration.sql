-- AlterTable
CREATE SEQUENCE subhub_id_seq;
ALTER TABLE "subHub" ALTER COLUMN "id" SET DEFAULT nextval('subhub_id_seq');
ALTER SEQUENCE subhub_id_seq OWNED BY "subHub"."id";
