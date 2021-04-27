import { Application } from "https://deno.land/x/oak/mod.ts";
import './services/cron.ts'

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "deno app";
});

await app.listen({ port: 4050 });