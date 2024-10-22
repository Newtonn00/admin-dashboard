import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { PaymentMethodTaxFeeEntity } from "../_domain/types";

import { dbBillingClient } from "@/shared/lib/db_billing";

import logger from "@/shared/utils/logger"; 

export class PaymentMethodTaxFeeRepository extends BaseRepository<PaymentMethodTaxFeeEntity>{

    constructor() {
        super('Payment Method Tax Fee', logger);
    }
    mapToDataType(data: any): PaymentMethodTaxFeeEntity {

        const paymentMethodTaxFeeData = {

            aggregator_id: data.aggregator_id,
            payment_method_id: data.payment_method_id ?? "",
            country_code: data.country_code,
            fee_prc: data.fee_prc,
            fee_fix: data.fee_fix

        }

        return paymentMethodTaxFeeData;

        
    }
    async getRecordById(id: string): Promise<PaymentMethodTaxFeeEntity> {  
        throw new Error("Method not implemented.");
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:PaymentMethodTaxFeeEntity[], total:number}> {
        
        return(
            this.handleDatabaseOperation(
                async () => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_method_tax_fee.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,

                        }),
                        dbBillingClient.payment_method_tax_fee.count({
                            where: whereCondition,
                        }),

                    ])

                    const data = rawData.map(this.mapToDataType);
                    
                    return {data, total };
                }, "read"
            )
        )

    }
    async updateRecord( data: Record<string, any>): Promise<PaymentMethodTaxFeeEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {

                    const whereId ={aggregator_id: data.aggregator_id,
                                    payment_method_id:data.payment_method_id === '' ? null : data.payment_method_id,
                                    country_code: data.country_code}
                    if (!whereId){
                        throw new Error("ID value is undefined");
                    }                

                    return this.mapToDataType(await dbBillingClient.payment_method_tax_fee.updateMany({
                                                where: whereId,
                                                data: {fee_fix: data.fix,
                                                    fee_prc: data.prc,
                                                    country_code: data.country_code,
    
                                                }}))
                }, `update`
            )  
        )      
 
    }


    async createRecord( data: Record<string, any>): Promise<PaymentMethodTaxFeeEntity> {
        throw new Error("Method not implemented.");
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }

}

export const paymentMethodTaxFeeRepository = new PaymentMethodTaxFeeRepository();