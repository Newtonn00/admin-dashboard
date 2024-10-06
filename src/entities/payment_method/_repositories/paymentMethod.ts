import { dbBillingClient } from "@/shared/lib/db_billing";
import { PaymentMethodEntity } from "../_domain/types";
import { convertDateStringToTimeStampInSeconds, convertTimeStampToLocaleDateString, genUID } from "@/shared/utils/commonUtils";
import logger from "@/shared/utils/logger";
import { dispute_type } from "../../../../prisma/generated/client_billing";

export class PaymentMethodRepository {



    mapToPaymentMethodType = (data: any): PaymentMethodEntity =>{

        const paymentMethodData = {


            id: data.id,
            name: data.name,
            rank: data.rank,
            show: data.show ? 'Yes' : 'No',
            supported_countries: data.supported_countries,
            aggregator_id: data.aggregator_id,
            aggregator_name: data.aggregator ? data.aggregator.name : "",
            caption: data.caption,
            logo_url: data.logo_url,
            dashboard_show: data.dashboard_show ? 'Yes' : 'No',
            supported_currencies: data.supported_currencies,
            fee: data.payment_method_fee.map((pmf: any) => 
                    pmf ?
                    {
                        prc: Number(pmf.fee_prc),
                        fix: Number(pmf.fee_fix),
                        country_code: pmf.country_code,
                        minAmount: Number(pmf.min_amount),
                    } 
                    : {}

                ),
            fx_fee: data.payment_method_fx_fee.map((pmf: any) => 
                pmf ?
                {
                    prc: Number(pmf.fee_prc),
                    fix: Number(pmf.fee_fix),
                    country_code: pmf.country_code,
                    currencies: pmf.currencies
                } 
                : {}
            ),
            tax_fee: data.payment_method_tax_fee.map((pmf: any) => 
                pmf ?
                {
                    prc: Number(pmf.fee_prc),
                    fix: Number(pmf.fee_fix),
                    country_code: pmf.country_code,
                } 
                : {}
            ),
            dispute_fee: data.payment_dispute_fee.map((pmf: any) => 
                pmf ?
                {
                    dispute_type: pmf.dispute_type,
                    fix: Number(pmf.fixed_fee),
                    currency_code: pmf.fixed_fee_currency,
                } 
                : {}
            ),

            game_settings: data.payment_method_game_settings.map((pmf: any) => 
                pmf ?
                {
                    game_id: pmf.game_id !== "" ? pmf.game_id : "all games",
                    enabled: pmf.enabled ? "Yes" : "No",
                } 
                : {}
            ),

            


        }

        return paymentMethodData
    }
    async getPaymentMethodById(pmMId: string): Promise<PaymentMethodEntity[]> {
        try{
            const rawData = await dbBillingClient.payment_method.findUniqueOrThrow({
                where: {
                    id: pmMId,
                },
                include:{
                    aggregator: true,
                    payment_dispute_fee: true,
                    payment_method_fee: true,
                    payment_method_fx_fee: true,
                    payment_method_tax_fee: true,
                    payment_method_game_settings: true,

                }
            });
            
            return [this.mapToPaymentMethodType(rawData)];
        }    catch(error: unknown)  {


            if (error instanceof Error){
                logger.error({
                        msg: `Payment Method Repository Error. Failed to retrieve Payment Method data for payment_method_id: ${pmMId}`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'Payment Method Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve Payment Method data for payment_method_id: ${pmMId}`);


        }
    }
    async getPaymentMethods(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data: PaymentMethodEntity[], total: number}> {
        try{

            const skip = (page - 1) * pageSize;
            const take = pageSize;
                    
            const[rawData, total] = await Promise.all([
                dbBillingClient.payment_method.findMany({
                    
                    skip: skip,
                    take: take,
                    where: whereCondition,
                    include:{
                        aggregator: true,
                        payment_dispute_fee: true,
                        payment_method_fee: true,
                        payment_method_fx_fee: true,
                        payment_method_tax_fee: true,
                        payment_method_game_settings: true,
    
                    },

                }),
                dbBillingClient.payment_method.count({
                    where: whereCondition,
                }),


            ])

            const data = rawData.map(this.mapToPaymentMethodType)
            
            return {data, total };
        }catch (error: unknown){

            if (error instanceof Error){
                logger.error(
                    {
                        msg: `Payment Method Repository Error. Failed to retrieve Payment Method data`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'Payment Method Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve Payment Method data `);
        }
    
    }
    async getPaymentMethodsByFilter(page: number, pageSize: number, filter: Record<string, any>): Promise<{ data: PaymentMethodEntity[], total: number }> {
        const whereCondition: Record<string, any> = {};
        if (filter['selectedFields']){
            
            whereCondition["OR"] =  [
                            {'id': {contains: filter['selectedFields'], mode:'insensitive'}},
                            {'name': {contains: filter['selectedFields'], mode:'insensitive'}}
                            ]
        }


        return this.getPaymentMethods(page, pageSize, whereCondition);
        
        

    }

    async updatePaymentMethod(pmMId:string, data:  Record<string, any>): Promise<PaymentMethodEntity[]>{

        try{
            await dbBillingClient.payment_method.update({
                                        where: {id: pmMId},
                                        data: data})
            return this.getPaymentMethodById(pmMId);
        } catch(error: unknown)
        {

            if (error instanceof Error){
                logger.error(
                    {msg: `Payment Method Repository Error. Failed to update account data for payment_method_id ${pmMId}`, 
                    error: error.message,
                    stack: error.stack,
                });
            } else{

                logger.error({msg: 'Payment Method Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to update Payment Method data for payment_method_id ${pmMId}`);
        }                                
    }

    async createPaymentMethod(data: Record<string, any>):Promise<PaymentMethodEntity[]>{
        try{
            const newPaymentMethod = await dbBillingClient.payment_method.create({

                data: {//+
                    id: genUID('pmt', 31),
                    name: data.name,//+
                    rank: data.rank,//+
                    show: data.show,//+
                    supported_countries: data.supported_countries,//+
                    aggregator_id: data.aggregator_id,//+
                    caption: data.caption,//+
                    logo_url: data.logo_url,//+
                    dashboard_show: data.dashboard_show,//+
                    supported_currencies: data.supported_currencies,//+
                },
            });
            return [this.mapToPaymentMethodType(newPaymentMethod)];
        } catch(error: unknown)
        {

            if (error instanceof Error){
                logger.error(
                    {msg: `Payment Method Repository Error. Failed to create new Payment method`, 
                    error: error.message,
                    stack: error.stack,
                });
            } else{

                logger.error({msg: 'Payment Method Repository Error. An unknown error occurred'});
            }    
            
            throw new Error('Failed to create new Payment Method');
        }
        
    }
    
}


export const paymentMethodRepository = new PaymentMethodRepository();