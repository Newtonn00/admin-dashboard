import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { PaymentMethodGameSettingsEntity } from "../_domain/types";

import { dbBillingClient } from "@/shared/lib/db_billing";

import logger from "@/shared/utils/logger"; 

export class PaymentMethodGameSettingsRepository extends BaseRepository<PaymentMethodGameSettingsEntity>{

    constructor() {
        super('Payment Method Game Settings', logger);
    }
    mapToDataType(data: any): PaymentMethodGameSettingsEntity {

        const paymentMethodGameSettingsData = {

            payment_method_id: data.payment_method_id,
            game_id: data.game_id,
            enabled: data.enabled,

        }

        return paymentMethodGameSettingsData;

        
    }
    async getRecordById(id: string): Promise<PaymentMethodGameSettingsEntity> {  
        throw new Error("Method not implemented.");
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data:PaymentMethodGameSettingsEntity[], total:number}> {
        
        return(
            this.handleDatabaseOperation(
                async () => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_method_game_settings.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,

                        }),
                        dbBillingClient.payment_method_game_settings.count({
                            where: whereCondition,
                        }),

                    ])

                    const data = rawData.map(this.mapToDataType);
                    
                    return {data, total };
                }, "read"
            )
        )

    }
    async updateRecord(data: Record<string, any>): Promise<PaymentMethodGameSettingsEntity> {

        return(
            this.handleDatabaseOperation(
                async () => {           
                    console.log('repo', data)   
                    return this.mapToDataType(await dbBillingClient.payment_method_game_settings.update({
                                                
                                                where: {  payment_method_id_game_id: {
                                                    payment_method_id: data.payment_method_id,
                                                    game_id: data.game_id
                                                  }
                                                },
                                                data: {
                                                    enabled: data.enabled,
    
                                                }}))
                }, `update`
            )  
        )      
 
    }


    async createRecord( data: Record<string, any>): Promise<PaymentMethodGameSettingsEntity> {
        throw new Error("Method not implemented.");
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }

}

export const paymentMethodGameSettingsRepository = new PaymentMethodGameSettingsRepository();