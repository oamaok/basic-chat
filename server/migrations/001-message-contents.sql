BEGIN;
SELECT _v.register_patch('001-message-contents', ARRAY['000-base'], NULL);

ALTER TABLE messages ADD COLUMN "contents" text NOT NULL;

COMMIT;
