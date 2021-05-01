import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new PostgresConnector({
  host: 'ec2-3-217-219-146.compute-1.amazonaws.com',
  port: 5432,
  username: "fvhpgtktrohrnp",
  password: "fc27a9ea511f8380f7a5a3c69d92765fa08832b9a1f80357acf37cbf2c3fd8dc",
  database: "df1n6t7q5jbunq",
});

export const db = new Database({ connector, debug: true })