
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Relationships } from 'https://deno.land/x/denodb/mod.ts';
import './services/cron.ts'
import { db } from './db.ts'
import router from './routes/routes.ts'
import { ProviderModel } from './models/provider.ts';
import { HistoryModel } from './models/history.ts';
import { getMonitorPrice } from './services/getMonitorInfo.ts';
import { getAirtmPrice } from './services/getAirtmInfo.ts';


// Relationships.belongsTo(HistoryModel, ProviderModel);
// db.link([ProviderModel, HistoryModel])
// await db.sync({drop: true})

// getMonitorPrice()
getAirtmPrice()

const app = new Application();

app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({ port: 4050 })
