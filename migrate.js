import {drizzle} from "drizzle-orm/postgres-js";
import {migrate} from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const production = args[0] === 'production';

if (production) {
	console.log("Migrating production database...");
}

// eslint-disable-next-line no-undef
const db_url = production ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

if (!db_url) {
	console.error("No database url provided at environment variable " + (production ? "PROD_DB_URL" : "DEV_DB_URL"));
	// eslint-disable-next-line no-undef
	process.exit(1);
}

const pool = postgres(db_url, {
	max: 1,
	ssl: "prefer",
	onnotice: () => {}
});
const db = drizzle(pool);

console.log(`Migrating database at ${db_url}...`);

migrate(db, {
	migrationsFolder: "./drizzle"
}).then(() => {
	console.log("Migration complete.");
	pool.end();
});
