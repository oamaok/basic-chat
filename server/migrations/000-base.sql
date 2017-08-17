BEGIN;
SELECT _v.register_patch('000-base', NULL, NULL);

CREATE TABLE users (
  "id" uuid PRIMARY KEY,
  "createdAt" timestamp NOT NULL,
  "email" text UNIQUE,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE rooms (
  "id" uuid PRIMARY KEY,
  "createdAt" timestamp NOT NULL,
  "creatorId" uuid REFERENCES users ("id"),
  "type" integer NOT NULL,
  "name" text UNIQUE
);

CREATE TABLE roommapping (
  "createdAt" timestamp NOT NULL,
  "userId" uuid REFERENCES users ("id"),
  "roomId" uuid REFERENCES rooms ("id"),
  PRIMARY KEY ("userId", "roomId")
);

CREATE TABLE messages (
  "id" integer PRIMARY KEY,
  "createdAt" timestamp NOT NULL,
  "userId" uuid REFERENCES users ("id"),
  "roomId" uuid REFERENCES rooms ("id")
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
  '1970-01-01 00:00:00',
  '',
  'System',
  '',
  ''
);

COMMIT;