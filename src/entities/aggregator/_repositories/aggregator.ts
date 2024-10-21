import { dbBillingClient } from "@/shared/lib/db_billing";
import { AggregatorEntity } from "../_domain/types";
import { convertDateStringToTimeStampInSeconds, convertTimeStampToLocaleDateString } from "@/shared/utils/commonUtils";
import logger from "@/shared/utils/logger";
import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { paymentMethodFxFeeRepository } from "@/entities/payment_method_fx_fee/_repository/paymentMethodFxFee";
import { paymentMethodTaxFeeRepository } from "@/entities/payment_method_tax_fee/_repository/paymentMethodTaxFee";

export class AggregatorRepository extends BaseRepository<AggregatorEntity> {

    constructor() {
        super('Aggregator', logger);
    }

    mapToDataType(data: any): AggregatorEntity {
        

        const aggregatorData = {
            id: data.id,
            name: data.name,
            fx_fee: data.payment_method_fx_fee.map((pmf: any) => 
                pmf ?
                {
                    aggregator_id: pmf.aggregator_id,
                    payment_method_id: pmf.payment_method_id ?? "",
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
                    aggregator_id: pmf.aggregator_id,
                    payment_method_id: pmf.payment_method_id ?? "",
                    prc: Number(pmf.fee_prc),
                    fix: Number(pmf.fee_fix),
                    country_code: pmf.country_code,
                } 
                : {}
            ),

        }
        return aggregatorData
    }
    getRecordById(id: string): Promise<AggregatorEntity> {
        return this.handleDatabaseOperation(async ()=>{


            const rawData = await dbBillingClient.aggregators.findUniqueOrThrow({
                where: {
                    id: id,
                },
                include: {
                    payment_method_fx_fee: true,
                    payment_method_tax_fee: true,
                    
                }
            });
            
            return this.mapToDataType(rawData);


        }, `get record ${id}`);
    }
    getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{ data: AggregatorEntity[]; total: number; }> {
        return this.handleDatabaseOperation(async () =>{
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

            const data = rawData.map(this.mapToDataType)

            return {data, total };



        }, 'get records');
    }
    updateRecord(data: Record<string, any>): Promise<AggregatorEntity> {

        return this.handleDatabaseOperation(async () =>{

            if (data.tableName === 'aggregator'){
                        

                this.mapToDataType(await dbBillingClient.aggregators.update({
                    where: {id: data.id},
                    data:{name: data.data.name}}))

            }else{
                await this.getRepositoryByTableName(data.tableName).updateRecord(data.data);
            }    
            const updatedData = await this.getRecordById(data.id);

            return updatedData

        }, `update record ${JSON.stringify(data.id)}`);


    }
    createRecord(data: Record<string, any>): Promise<AggregatorEntity> {
        return this.handleDatabaseOperation(async() => {

            const newAggregator = await dbBillingClient.aggregators.create({

                data: {
                    id: data.id,
                    name: data.name,

                },
            });
            return this.mapToDataType(newAggregator);

        }, `create record` )
    }
    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }
    getRepositoryByTableName(tableName: string) {
        switch (tableName) {


            case 'fx_fee':
                return paymentMethodFxFeeRepository;
            case 'tax_fee':
                return paymentMethodTaxFeeRepository;
            default:
                throw new Error(`Unknown table name: ${tableName}`);
        }
    }
    
}


export const aggregatorRepository = new AggregatorRepository();