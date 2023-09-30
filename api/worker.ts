import {Hono} from "hono";
import { trpcServer } from "@hono/trpc-server";
import {appRouter} from "@api/index.ts";
import {Pool} from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-serverless';
import {TrpcContext} from "@api/trpc.ts";
import {cors} from "hono/cors";

export interface cfEnv {
	DB_URL: string;
}

export type Env = {
	Bindings: {
		DB_URL: string;
	}
}

const app = new Hono<Env>()

app.use("*", cors({
	origin: [
		"http://localhost:5173",
		"http://localhost:8787",
		"https://skilldiff.julianbuse.com",
		"https://skilldiff-api.julianbuse.com",
	]
}))

app.use('/trpc/*', async (c, next) => {

	const pool = new Pool({connectionString: c.env.DB_URL})
	const db = drizzle(pool)

	return trpcServer({
		router: appRouter,
		endpoint: '/trpc',
		createContext: (): TrpcContext => ({
			db
		})
	})(c, next)
})

export default {
	fetch: app.fetch
};
