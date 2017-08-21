BEGIN;
SELECT _v.register_patch('001-rename-roommapping', ARRAY['000-base'], NULL);

ALTER TABLE roommapping RENAME TO user_rooms;

COMMIT;