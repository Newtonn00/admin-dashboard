import { dbBillingClient } from "@/shared/lib/db_billing";
import { PaymentMethodEntity } from "../_domain/types";
import { genUID, checkArraysAsStringIntersection } from "@/shared/utils/commonUtils";
import logger from "@/shared/utils/logger"; 
import { BaseRepository } from "@/entities/base_repository/BaseRepository";
import { paymentMethodFxFeeRepository } from "@/entities/payment_method_fx_fee/_repository/paymentMethodFxFee";
import { paymentMethodTaxFeeRepository } from "@/entities/payment_method_tax_fee/_repository/paymentMethodTaxFee";
import { paymentMethodFeeRepository } from "@/entities/payment_method_fee/_repository/paymentMethodFee";
import { paymentDisputeFeeRepository } from "@/entities/payment_dispute_fee/_repository/paymentDisputeFee";
import { paymentMethodGameSettingsRepository } from "@/entities/payment_method_game_settings/_repository/paymentMethodGameSettings";



export class PaymentMethodRepository extends BaseRepository<PaymentMethodEntity> {

    constructor() {
        super('Payment Method', logger);
    }

    getFilter(filter: Record<string, any>): string {
        throw new Error("Method not implemented.");
    }


    mapToDataType = (data: any): PaymentMethodEntity =>{
        const paymentMethodData = {


            id: data.id,
            name: data.name,
            rank: data.rank,
            show: data.show,
            supported_countries: data.supported_countries,
            aggregator_id: data.aggregator_id,
            aggregator_name: data.aggregator ? data.aggregator.name : "",
            caption: data.caption,
            logo_url: data.logo_url,
            dashboard_show: data.dashboard_show,
            supported_currencies: data.supported_currencies,
            fee: data.payment_method_fee ? data.payment_method_fee.map((pmf: any) => 
                    pmf ?
                    {
                        id: pmf.id,
                        prc: Number(pmf.fee_prc),
                        fix: Number(pmf.fee_fix),
                        country_code: pmf.country_code,
                        minAmount: Number(pmf.min_amount),
                    } 
                    : {}

                ):[],
            fx_fee: data.payment_method_fx_fee ? data.payment_method_fx_fee.map((pmf: any) => 
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
            ) : [],
            tax_fee: data.payment_method_tax_fee ? data.payment_method_tax_fee.map((pmf: any) => 
                pmf ?
                {
                    aggregator_id: pmf.aggregator_id,
                    payment_method_id: pmf.payment_method_id ?? "",                    
                    prc: Number(pmf.fee_prc),
                    fix: Number(pmf.fee_fix),
                    country_code: pmf.country_code,
                } 
                : {}
            ) : [],
            dispute_fee: data.payment_dispute_fee ? data.payment_dispute_fee.map((pmf: any) => 
                pmf ?
                {
                    pm_id: pmf.pm_id,
                    dispute_type: pmf.dispute_type,
                    fix: Number(pmf.fixed_fee),
                    currency_code: pmf.fixed_fee_currency,
                } 
                : {}
            ) : [],

            game_settings: data.payment_method_game_settings ? data.payment_method_game_settings.map((pmf: any) => 
                pmf ?
                {
                    payment_method_id: pmf.payment_method_id,
                    game_id: pmf.game_id,
                    enabled: pmf.enabled,
                } 
                : {}
            ) : [],

            


        }

        return paymentMethodData
    }
    async getRecordById(id: string): Promise<PaymentMethodEntity> {


        return(
            this.handleDatabaseOperation(
                async () => {
                
                    const rawData = await dbBillingClient.payment_method.findUniqueOrThrow({
                        where: {
                            id: id,
                        },
                        include:{
                            aggregator: true,
                            payment_dispute_fee: true,
                            payment_method_fee: true,
                            payment_method_game_settings: true,

                        }
                    });
                    const fxFee =  (await paymentMethodFxFeeRepository.getRecords(1,1000,{aggregator_id: rawData.aggregator_id})).data.filter((record) =>{
                            if (record.payment_method_id === id) {
                                return true;
                            } else if(record.aggregator_id === rawData.aggregator_id && 
                                        record.payment_method_id === "" &&
                                        record.country_code !== "" &&
                                        rawData.supported_countries?.includes(record.country_code)){
                                    return true;
                            }else if(record.aggregator_id === rawData.aggregator_id &&
                                    record.payment_method_id === "" &&
                                    record.country_code === "" &&
                                    (record.currencies[0] === '{}' || checkArraysAsStringIntersection(record.currencies[0] ,rawData.supported_currencies))
                                    
                            ){
                                return true;
                            }else{
                                return false;
                            }


                        });
                        const taxFee =  (await paymentMethodTaxFeeRepository.getRecords(1,1000,{aggregator_id: rawData.aggregator_id})).data.filter((record) =>{
                            if (record.payment_method_id === id) {
                                return true;
                            } else if(record.aggregator_id === rawData.aggregator_id && 
                                        record.payment_method_id === "" &&
                                        record.country_code !== "" &&
                                        rawData.supported_countries?.includes(record.country_code)){
                                    return true;
                            }else if(record.aggregator_id === rawData.aggregator_id &&
                                    record.payment_method_id === "" &&
                                    record.country_code === ""
                                    
                            ){
                                return true;
                            }else{
                                return false;
                            }


                        });

                        const updatedData = this.mapToDataType({
                            ...rawData,
                            payment_method_fx_fee: fxFee,
                            payment_method_tax_fee: taxFee,
                        });  
                                
  
                    
                    return updatedData;
                    
                }, `get record ${id}`     
            )        
        )
    
    }
    async getRecords(page: number, pageSize: number, whereCondition: Record<string, any>): Promise<{data: PaymentMethodEntity[], total: number}> {

        return(
            this.handleDatabaseOperation(
                async() => {
                    const skip = (page - 1) * pageSize;
                    const take = pageSize;
                            
                    const[rawData, total] = await Promise.all([
                        dbBillingClient.payment_method.findMany({
                            
                            skip: skip,
                            take: take,
                            where: whereCondition,


                        }),
                        dbBillingClient.payment_method.count({
                            where: whereCondition,
                        }),


                    ])

                    const data = rawData.map(this.mapToDataType)
                    
                    return {data, total };
                }, 'get records'
            )
        )
    }


    async getByFilter(page: number, pageSize: number, filter: Record<string, any>): Promise<{ data: PaymentMethodEntity[], total: number }> {
        const whereCondition: Record<string, any> = {};
        if (filter['selectedFields']){
            
            whereCondition["OR"] =  [
                            {'id': {contains: filter['selectedFields'], mode:'insensitive'}},
                            {'name': {contains: filter['selectedFields'], mode:'insensitive'}}
                            ]
        }


        return this.getRecords(page, pageSize, whereCondition);
        
        

    }

    async updateRecord(data:  Record<string, any>): Promise<PaymentMethodEntity>{
        console.log('repo', data)
        
        return(    
            this.handleDatabaseOperation(
                async() => {
                    
                    if (data.tableName === 'payment_method'){
                        

                        this.mapToDataType(await dbBillingClient.payment_method.update({
                            where: {id: data.id},
                            data :{
                                logo_url: data.data.logo_url,
                                aggregator_id: data.data.aggregator_id,
                                dashboard_show: data.data.dashboard_show,
                                caption: data.data.caption,
                                supported_countries: data.data.supported_countries,
                                supported_currencies: data.data.supported_currencies,
                            }}))

                    }else{
                        await this.getRepositoryByTableName(data.tableName).updateRecord(data.data);
                    }    
                    const updatedData = await this.getRecordById(data.id);
                    //console.log('repo-updated', updatedData)
                    return updatedData

                }, `update record ${JSON.stringify(data.id)}`
            )  
        )                                  
    }

    async createRecord(data: Record<string, any>):Promise<PaymentMethodEntity>{

            
        return(
            this.handleDatabaseOperation(
                async() => {
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
                    return this.mapToDataType(newPaymentMethod);
                }, `create record`    
            )
        )
        
    }


    getRepositoryByTableName(tableName: string) {
        switch (tableName) {

            case 'fee':
                return paymentMethodFeeRepository;
            case 'fx_fee':
                return paymentMethodFxFeeRepository;
            case 'tax_fee':
                return paymentMethodTaxFeeRepository;
            case 'dispute_fee':
                return paymentDisputeFeeRepository;
            case 'game_settings':
                return paymentMethodGameSettingsRepository;
            default:
                throw new Error(`Unknown table name: ${tableName}`);
        }
    }
    
}


export const paymentMethodRepository = new PaymentMethodRepository();