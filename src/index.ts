
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Relationships } from 'https://deno.land/x/denodb/mod.ts';
import './services/cron.ts'
import { db } from './db.ts'
import router from './routes/routes.ts'
import { HistoryModel } from './models/history.ts';
import { ProviderModel } from './models/provider.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

Relationships.belongsTo(HistoryModel, ProviderModel);
db.link([ProviderModel, HistoryModel])
// await db.sync({drop: true})


const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`server listen on port ${argPort ? Number(argPort) : DEFAULT_PORT}`)
await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT })
