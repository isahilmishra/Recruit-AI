import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';
import dotenv from 'dotenv';
dotenv.config();
async function main() {
    try {
        const connectionString = `${process.env.DATABASE_URL}`;
        console.log("Using DATABASE_URL:", connectionString.replace(/:([^:@]+)@/, ":***@")); // Mask password
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });
        console.log("Executing test query...");
        const user = await prisma.user.findFirst();
        console.log("Database connection successful. Result:", user ? "User found" : "No user found");
        await prisma.$disconnect();
        await pool.end();
    }
    catch (error) {
        console.error("Connection failed:", error);
    }
}
main();
//# sourceMappingURL=test-db.js.map