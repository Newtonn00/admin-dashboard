import { PrismaClient } from "../../../prisma/generated/client_aghanim";

declare global {
    var dbClient: PrismaClient | undefined;
}

const dbClient = global.dbClient || new PrismaClient(      
    // {
    //      log: ['query', 'info', 'warn', 'error'],
    //      }
    );

if (process.env.NODE_ENV !== 'production') {
global.dbClient = dbClient;
}

export { dbClient };