BEGIN;
SELECT _v.register_patch('002-id-default', ARRAY['000-base'], NULL);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE users ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();
ALTER TABLE rooms ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

CREATE SEQUENCE messages_id_seq;
ALTER TABLE messages ALTER COLUMN "id" SET DEFAULT nextval('messages_id_seq');
ALTER SEQUENCE messages_id_seq OWNED BY messages.id;

COMMIT;