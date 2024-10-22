import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { PaymentDisputeFeeEntity } from "../_domain/types";

import { dbBillingClient } from "@/shared/lib/db_billing";

import logger from "@/shared/utils/logger"; 

export class PaymentDisputeFeeRepository extends BaseRepository<PaymentDisputeFeeEntity>{

    constructor() {
        super('Payment Dispute Fee', logger);
    }
    mapToDataType(data: any): PaymentDisputeFeeEntity {

        const paymentDisputeFeeData = {

            pm_id: data.pm_id,
            dispute_type: data.dispute_type,
            fixed_fee: data.fixed_fee,
            fixed_fee_currency: data.fixed_fee_currency,

        }

        return paymentDisputeFeeData;

        
    }
    async getRecordById(id: string): Promise<PaymentDisputeFeeEntity> {  
        throw new Error("Method not implemented.");
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:PaymentDisputeFeeEntity[], total:number}> {
        
        return(
            this.handleDatabaseOperation(
                async () => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_dispute_fee.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,

                        }),
                        dbBillingClient.payment_dispute_fee.count({
                            where: whereCondition,
                        }),

                    ])

                    const data = rawData.map(this.mapToDataType);
                    
                    return {data, total };
                }, "read"
            )
        )

    }
    async updateRecord(data: Record<string, any>): Promise<PaymentDisputeFeeEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {              
                    return this.mapToDataType(await dbBillingClient.payment_dispute_fee.update({
                                                where: {pm_id: data.pm_id, dispute_type: data.dispute_type},
                                                data: {fixed_fee: Number(data.fixed_fee),
                                                    fixed_fee_currency: data.fixed_fee_currency,
    
                                                }}))
                }, `update`
            )  
        )      
 
    }


    async createRecord( data: Record<string, any>): Promise<PaymentDisputeFeeEntity> {
        throw new Error("Method not implemented.");
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }

}

export const paymentDisputeFeeRepository = new PaymentDisputeFeeRepository();