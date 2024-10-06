import { dbBillingClient } from "@/shared/lib/db_billing";
import { AggregatorEntity } from "../_domain/types";
import { convertDateStringToTimeStampInSeconds, convertTimeStampToLocaleDateString } from "@/shared/utils/commonUtils";
import logger from "@/shared/utils/logger";

export class AggregatorRepository {



    mapToAggregatorType = (data: any): AggregatorEntity =>{



        const aggregatorData = {
            

            id: data.id,
            name: data.name,
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

        }

        return aggregatorData
    }
    async getAggregatorById(aggId: string): Promise<AggregatorEntity[]> {
        try{
            const rawData = await dbBillingClient.aggregators.findUniqueOrThrow({
                where: {
                    id: aggId,
                },
                include: {
                    payment_method_fx_fee: true,
                    payment_method_tax_fee: true,
                    

                }
            });
            
            return [this.mapToAggregatorType(rawData)];
        }    catch(error: unknown)  {


            if (error instanceof Error){
                logger.error({
                        msg: `Aggregator Repository Error. Failed to retrieve Game data for aggregator_id: ${aggId}`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'Aggregator Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve Aggregator data for aggregator_id: ${aggId}`);


        }
    }
    async getAggregators(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data: AggregatorEntity[], total: number}> {
        try{
            const skip = (page - 1) * pageSize;
            const take = pageSize;
                    
            const[rawData, total] = await Promise.all([
                dbBillingClient.aggregators.findMany({
                    
                    skip: skip,
                    take: take,
                    where: whereCondition,
                    include: {
                        payment_method_fx_fee: true,
                        payment_method_tax_fee: true,
                        
    
                    }

                }),
                dbBillingClient.aggregators.count({
                    where: whereCondition,
                }),


            ])

            const data = rawData.map(this.mapToAggregatorType)

            return {data, total };
        }catch (error: unknown){

            if (error instanceof Error){
                logger.error(
                    {
                        msg: `Aggregator Repository Error. Failed to retrieve Aggregators data`, 
                        error: error.message,
                        stack: error.stack,
                    }
                );
            } else{

                logger.error({msg: 'Aggregator Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to retrieve Aggregator data `);
        }
    
    }

    async updateAggregator(aggId:string, data:  Record<string, any>): Promise<AggregatorEntity[]>{

        try{
            await dbBillingClient.aggregators.update({
                                        where: {id: aggId},
                                        data: data})
            return this.getAggregatorById(aggId);
        } catch(error: unknown)
        {

            if (error instanceof Error){
                logger.error(
                    {msg: `Aggregator Repository Error. Failed to update account data for aggregator_id ${aggId}`, 
                    error: error.message,
                    stack: error.stack,
                });
            } else{

                logger.error({msg: 'Aggregator Repository Error. An unknown error occurred'});
            }    
            
            throw new Error(`Failed to update Aggregator data for aggregator_id ${aggId}`);
        }                                
    }

    async createAggregator(data: Record<string, any>):Promise<AggregatorEntity[]>{
        try{
            const newAggregator = await dbBillingClient.aggregators.create({

                data: {//+
                    id: data.id,//+
                    name: data.name,//+

                },
            });
            return [this.mapToAggregatorType(newAggregator)];
        } catch(error: unknown)
        {

            if (error instanceof Error){
                logger.error(
                    {msg: `Aggregator Repository Error. Failed to create new Aggregator`, 
                    error: error.message,
                    stack: error.stack,
                });
            } else{

                logger.error({msg: 'Aggregator Repository Error. An unknown error occurred'});
            }    
            
            throw new Error('Failed to create new Aggregator');
        }
        
    }
    
}


export const aggregatorRepository = new AggregatorRepository();