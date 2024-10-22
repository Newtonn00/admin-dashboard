import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { PaymentMethodFeeEntity } from "../_domain/types";

import { dbBillingClient } from "@/shared/lib/db_billing";

import logger from "@/shared/utils/logger"; 

export class PaymentMethodFeeRepository extends BaseRepository<PaymentMethodFeeEntity>{

    constructor() {
        super('Payment Method Fee', logger);
    }
    mapToDataType(data: any): PaymentMethodFeeEntity {

        const paymentMethodFeeData = {

            id: data.id,
            payment_method_id: data.payment_method_id,
            fee_prc: data.fee_prc,
            fee_fix: data.fee_fix,
            min_amount: data.min_amount,
            country_code: data.country_code,

        }

        return paymentMethodFeeData;

        
    }
    async getRecordById(id: string): Promise<PaymentMethodFeeEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {
                    const rawData = await dbBillingClient.payment_method_fee.findUniqueOrThrow({
                        where: {
                            id: Number(id),
                        },
                    });
                    
                    return this.mapToDataType(rawData);
                }, 'read'
            )
        )        
        
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:PaymentMethodFeeEntity[], total:number}> {
        
        return(
            this.handleDatabaseOperation(
                async () => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_method_fee.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,

                        }),
                        dbBillingClient.payment_method_fee.count({
                            where: whereCondition,
                        }),

                    ])

                    const data = rawData.map(this.mapToDataType);
                    
                    return {data, total };
                }, "read"
            )
        )

    }
    async updateRecord(data: Record<string, any>): Promise<PaymentMethodFeeEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {

                    return this.mapToDataType(await dbBillingClient.payment_method_fee.update({
                        where: {id: Number(data.id)},
                        data :{
                            fee_prc: data.prc,
                            fee_fix: data.fix,
                            min_amount: data.minAmount,
                            country_code: data.country_code,
                        }}))
                }, `read`
            )  
        )      
 
    }


    async createRecord(data: Record<string, any>): Promise<PaymentMethodFeeEntity> {
        throw new Error("Method not implemented.");
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }

}

export const paymentMethodFeeRepository = new PaymentMethodFeeRepository()