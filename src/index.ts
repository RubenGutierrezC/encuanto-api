import { Application } from "https://deno.land/x/oak/mod.ts";
import './services/cron.ts'
import { db } from './db.ts'
import router from './routes/routes.ts'
import { ProviderModel } from './models/provider.ts';

db.link([ProviderModel])
await db.sync()


const app = new Application();

// app.use((ctx) => {
//     ctx.response.body = "deno app";
// });

app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({ port: 4050 })
