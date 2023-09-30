import {initTRPC} from '@trpc/server'
import {NeonDatabase} from "drizzle-orm/neon-serverless";

const t = initTRPC.create()



export type TrpcContext = {
	db: NeonDatabase
}

export const router = t.router
export const publicProcedure = t.procedure
