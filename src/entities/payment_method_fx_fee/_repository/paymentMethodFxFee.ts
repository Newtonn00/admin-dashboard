import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { PaymentMethodFxFeeEntity } from "../_domain/types";

import { dbBillingClient } from "@/shared/lib/db_billing";

import logger from "@/shared/utils/logger"; 

export class PaymentMethodFxFeeRepository extends BaseRepository<PaymentMethodFxFeeEntity>{

    constructor() {
        super('Payment Method Fx Fee', logger);
    }
    mapToDataType(data: any): PaymentMethodFxFeeEntity {

        const paymentMethodFxFeeData = {

            aggregator_id: data.aggregator_id,
            payment_method_id: data.payment_method_id ?? "",
            currencies: data.currencies,
            country_code: data.country_code,
            fee_prc: data.fee_prc,
            fee_fix: data.fee_fix

        }

        return paymentMethodFxFeeData;

        
    }
    async getRecordById(id: string): Promise<PaymentMethodFxFeeEntity> {  
        throw new Error("Method not implemented.");
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:PaymentMethodFxFeeEntity[], total:number}> {
        
        return(
            this.handleDatabaseOperation(
                async () => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_method_fx_fee.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,

                        }),
                        dbBillingClient.payment_method_fx_fee.count({
                            where: whereCondition,
                        }),

                    ])

                    const data = rawData.map(this.mapToDataType);
                    
                    return {data, total };
                }, "get records"
            )
        )

    }
    async updateRecord(data: Record<string, any>): Promise<PaymentMethodFxFeeEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {
                  
    
                    const whereId ={aggregator_id: data.aggregator_id,
                                    payment_method_id: data.payment_method_id === '' ? null : data.payment_method_id ,
                                    country_code: data.country_code}
                    if (!whereId){
                        throw new Error("ID value is undefined");
                    }     
                    
                
                    const updatedData = this.mapToDataType(await dbBillingClient.payment_method_fx_fee.updateMany({
                        where: whereId,
                        data: {fee_fix: Number(data.fix),
                            fee_prc: Number(data.prc),
                            currencies: data.currencies,
                            country_code: data.country_code,

                        }}));
                   
                     
                    return updatedData
                }, `update record ${JSON.stringify(data.aggregator_id)}`
            )  
        )      
 
    }


    async createRecord( data: Record<string, any>): Promise<PaymentMethodFxFeeEntity> {
        throw new Error("Method not implemented.");
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }

}

export const paymentMethodFxFeeRepository = new PaymentMethodFxFeeRepository();