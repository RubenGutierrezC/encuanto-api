import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new PostgresConnector({
  host: 'localhost',
  port: 5432,
  username: "admintest",
  password: "123456",
  database: "rates",
});

export const db = new Database({ connector, debug: true })