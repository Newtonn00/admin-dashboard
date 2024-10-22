'use client';

import React, { useEffect, useState } from 'react';
import { AggregatorEntity } from "@/entities/aggregator/_domain/types";
import { useDataFetcher } from '@/hooks/useDataFetcherDynamicRoutes';
import Loader from '../Common/Loader';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';
import BaseEditableTable from '../Tables/BaseEditableTable';
import { useSaveData } from '@/hooks/useSaveDataDynamicRoutes';
import { isCountryISOCodeCorrect } from '@/shared/utils/countries';
import { isCurrencyISOCodeCorrect } from '@/shared/utils/currencies';

interface PaymentMethodDetailFormProps {
  aggId: string;
}

const AggregatorDetailForm: React.FC<PaymentMethodDetailFormProps> = ({aggId}) => {

    const [updatedData, setUpdatedData] = useState<Record<string,any>|null>(null)
    const[aggregator, setAggregator] = useState<AggregatorEntity|null>(null);
    const [linkValue, setLinkValue] = useState('');
//getting game details
    const {data, isLoading, error, total, fetchData } = useDataFetcher<AggregatorEntity>();
    const {updatedData:savedData, isSaving=false, errorSaving, saveData} = useSaveData<AggregatorEntity>(API_ENDPOINTS.AGGREGATOR);

    //getting function for posting logs
    const { logMessage } = useLogger();
    useEffect(() => {

      fetchData({
        endpoint:API_ENDPOINTS.AGGREGATOR,
        singleId:aggId
      });
          
    },[]);

    useEffect(() => {
      if (data.length > 0) {
        setAggregator(data[0]);
      }
    }, [data]);

    useEffect(() =>{
      if (linkValue){
          logMessage(`Link fetched: ${linkValue}`)
      }    
    },[linkValue]);
    const handleLinkClick = (linkValue: string) => {
      setLinkValue(linkValue);

    };

    useEffect(() =>{
      
      if (updatedData){

        saveData(aggId, updatedData);
      }

    },[updatedData])

    useEffect(() => {
      if (savedData) {
        
        setAggregator(savedData);
      }
    }, [savedData]);

    const handleSaveRecord = (tableName: string,  updatedData: Record<string, any>) =>{
      setUpdatedData({id:aggId, data:updatedData, tableName});

    }

    if (error) {
      return <div>Error loading {error}</div>; 
    }

    if (!aggregator) {
    return null;
    }
    if (isLoading) {
      return <Loader /> ;
    } 



    // tabs rendering
    const renderFormContent = () => {

        return (
            <div> 
              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">ID:</label>
                <p className="text-sm font-medium">{aggregator.id}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Name:</label>
                <p className="text-sm font-medium">{aggregator.name}</p>
              </div>

              <Accordion>

                <AccordionItem key="1" aria-label="fx_fee" title={`fx_fee (${ aggregator.fx_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='fx_fee' 
                    data={aggregator.fx_fee ??[]} 
                    dataType={{
                          'payment_method_id':{type: 'text', editable: true, validation: (value:string) => true},
                          'prc':{type: 'number', editable: true, validation: (value:number) => !isNaN(value)},
                          'fix':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                          'country_code':{type:'text', editable: true, validation: (value:string) => isCountryISOCodeCorrect(value.trim())}, 
                          'currencies': {type: 'text', editable: true, validation: (value:string) => typeof value === 'string' ? value.split(',').every((currency) =>  isCurrencyISOCodeCorrect(currency.trim())): true}, 
                          'Action': { type: '', editable: false }}}
                    columns={['payment_method_id','prc', 'fix', 'country_code','currencies','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
  
                </AccordionItem>
              <AccordionItem key="2" aria-label="tax_fee" title={`tax_fee (${ aggregator.tax_fee?.length})`}>
              <BaseEditableTable  
                tableName='tax_fee' 
                data={aggregator.tax_fee ??[]} 
                dataType={{
                          'payment_method_id':{type: 'text', editable: true, validation: (value:string) => true},
                          'prc':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                          'fix':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                          'country_code':{type:'text', editable: true, validation:  (value:string) => value ? isCountryISOCodeCorrect(value.trim()):true}, 
                          'Action': { type: '', editable: false }}}
                columns={['payment_method_id','prc', 'fix', 'country_code','Action']}
                handleSaveRecord={handleSaveRecord} 
              />
      
              </AccordionItem>

            </Accordion>

            </div>  
        );

};

  return (

    <Card className="w-full min-w-[600px]">
      <CardHeader className="flex gap-3"> 
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Aggregator Details</p>
          <div className="flex items-center" >
            <p className="text-lg text-default-500 ml-2" >{aggregator.name}</p>
          </div>
        </div>

      </CardHeader>
      <Divider/>

          <Card>
            <CardBody>
              {renderFormContent()}
            </CardBody>
          </Card>  

    </Card>

  );
};

export default AggregatorDetailForm;
