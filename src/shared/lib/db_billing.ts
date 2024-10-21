import { PrismaClient } from "../../../prisma/generated/client_billing";

declare global {
    var dbBillingClient: PrismaClient | undefined;
}

const dbBillingClient = global.dbBillingClient || new PrismaClient(    
    {
         log: ['query', 'info', 'warn', 'error'],
         }
    );

if (process.env.NODE_ENV !== 'production') {
global.dbBillingClient = dbBillingClient;
}

export { dbBillingClient };