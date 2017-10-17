process.stdout.write(JSON.stringify({
  database: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  stackTrace: true
}, null, 2));

