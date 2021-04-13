import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  hostname: "127.0.0.1",
  port: 5432,
  user: "admintest",
  database: "rates",
  password: "123456",
});

await client.connect();

export default client;
