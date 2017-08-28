BEGIN;
SELECT _v.register_patch('000-base', NULL, NULL);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "createdAt" timestamp NOT NULL,
  "email" text UNIQUE,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE rooms (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "createdAt" timestamp NOT NULL,
  "creatorId" uuid REFERENCES users ("id"),
  "type" integer NOT NULL,
  "name" text UNIQUE
);

INSERT INTO users (
  "id",
  "createdAt",
  "email",
  "firstName",
  "lastName",
  "password"
) VALUES (
  '00000000-0000-4000-8000-000000000000',
  NOW(),
  '',
  'System',
  '',
  ''
);

INSERT INTO rooms (
  "id",
  "createdAt",
  "type",
  "name"
) VALUES (
  '00000000-0000-4000-8000-000000000000',
  NOW(),
  0,
  'general'
);

ALTER TABLE users ADD COLUMN "currentRoomId" uuid REFERENCES rooms ("id") DEFAULT '00000000-0000-4000-8000-000000000000';

CREATE TABLE user_rooms (
  "createdAt" timestamp NOT NULL,
  "userId" uuid NOT NULL REFERENCES users ("id"),
  "roomId" uuid NOT NULL REFERENCES rooms ("id"),
  PRIMARY KEY ("userId", "roomId")
);

CREATE TABLE messages (
  "id" serial PRIMARY KEY,
  "createdAt" timestamp NOT NULL,
  "userId" uuid NOT NULL REFERENCES users ("id"),
  "roomId" uuid NOT NULL REFERENCES rooms ("id")
);

COMMIT;