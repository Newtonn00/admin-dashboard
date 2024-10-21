'use client';

import React, { useEffect, useState } from 'react';
import { PaymentMethodEntity } from "@/entities/payment_method/_domain/types";
import { useDataFetcher } from '@/hooks/useDataFetcherDynamicRoutes';
import Loader from '../Common/Loader';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Checkbox, Divider, Input, Link, Tooltip } from '@nextui-org/react';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';
import BaseEditableTable from '../Tables/BaseEditableTable';
import { useSaveData } from '@/hooks/useSaveDataDynamicRoutes';
import { EditIcon } from '../Icons/Table/edit-icon';
import { DeleteIcon } from '../Icons/Table/delete-icon';
import { SaveIcon } from '../Icons/Table/save-icon';
import { CancelIcon } from '../Icons/Table/cancel-icon';

interface PaymentMethodDetailFormProps {
  pmId: string;
}

const PaymentMethodDetailForm: React.FC<PaymentMethodDetailFormProps> = ({pmId}) => {

    const [isEditable, setIsEditable] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [editedValues, setEditedValues] = useState<Record<string, any>|null>(null);


    const [updatedData, setUpdatedData] = useState<Record<string,any>|null>(null)
    const[paymentMethod, setPaymentMethod] = useState<PaymentMethodEntity|null>(null);
    const [linkValue, setLinkValue] = useState('');
//getting game details
    const {data, isLoading, error, total, fetchData } = useDataFetcher<PaymentMethodEntity>();
    //getting function for posting logs
    const { logMessage } = useLogger();

    const {updatedData:savedData, isSaving=false, errorSaving, saveData} = useSaveData<PaymentMethodEntity>(API_ENDPOINTS.PAYMENTMETHOD);

    useEffect(() => {

      fetchData({
        endpoint:API_ENDPOINTS.PAYMENTMETHOD,
        singleId:pmId
      });
          
    },[]);

    useEffect(() =>{
      
      if (updatedData){

        saveData(pmId, updatedData);
      }

    },[updatedData])

    useEffect(() => {
      if (data.length > 0) {
        setPaymentMethod(data[0]);
      }
    }, [data]);


    useEffect(() => {
      if (savedData) {
        
        setPaymentMethod(savedData);
      }
    }, [savedData]);

    // useEffect(() =>{
    //   if (linkValue){
    //       logMessage(`Link fetched: ${linkValue}`)
    //   }    
    // },[linkValue]);
    


    const handleSaveRecord = (tableName: string, updatedData: Record<string, any>) =>{

      setUpdatedData({id:pmId, data:updatedData, tableName});
    }

    const handleEditButtonClick=() => {
      setIsEditable(true);

    }
    
    const handleCancelButtonClick=() => {
      setIsEditable(false);
      setIsChanged(false);

    }

    const handleSaveButtonClick=() => {
      setIsEditable(false);
      setIsChanged(false);
      handleSaveRecord("payment_method", editedValues ? editedValues : {});

    }

    const handleInputChange=(fieldName: string, value: any) =>{

      const changedValues = {
        ...paymentMethod,
        [fieldName]: value,
      };
      setIsChanged(hasChanges(paymentMethod, changedValues));
      setEditedValues(changedValues);
    }

    const hasChanges = (current: Record<string, any>|null, edited:Record<string, any>): boolean =>{

      for (const key in current) {
        if (current[key]!== edited[key]) {
          return true;
        }
      }
      return false;
    }



    if (error) {
      return <div>Error loading {error}</div>; 
    }

    if (errorSaving) {
      return <div>Error saving {errorSaving}</div>; 
    }
    
    if (!paymentMethod) {
    return null;
    }
    if (isLoading) {
      return <Loader /> ;
    } 


    // tabs rendering
    const renderCardContent = () => {

        return (
            <div> 
              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">ID:</label>
                <p className="text-sm font-medium">{paymentMethod.id}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Name:</label>
                <p className="text-sm font-medium">{paymentMethod.name}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Caption:</label>

                <Input className="text-sm font-medium w-fit"
                  defaultValue={paymentMethod.caption}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("caption", e.target.value)}
                />
      
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Logo URL:</label>

                <Input className="text-sm font-medium w-70"
                  defaultValue={paymentMethod.logo_url}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  style={{ width: `${paymentMethod.logo_url.length + 2}ch` }}
                  onChange={(e) => handleInputChange("logo_url", e.target.value)}
                />
              </div>


              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator ID:</label>
                <Input className="text-sm font-medium w-70"
                  defaultValue={paymentMethod.aggregator_id}
                  disabled={!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  style={{ width: `${paymentMethod.aggregator_id.length + 2}ch` }}
                  onChange={(e) => handleInputChange("aggregator_id", e.target.value)}
                  
                />
                

              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator Name:</label>
                <p className="text-sm font-medium">{paymentMethod.aggregator_name}</p>
              </div>

              

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Dashboard Show:</label>

                <Checkbox 
                  defaultSelected={paymentMethod.dashboard_show}
                  onChange={(e) => handleInputChange("dashboard_show", e.target.checked)}
                  color={isEditable ? 'primary' : 'default'}
                  disabled = {!isEditable}
                />

              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Countries:</label>
                <Input className="text-sm font-medium w-fit"
                  defaultValue={paymentMethod.supported_countries}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("supported_countries", e.target.value)}
                />
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Currencies:</label>
                <Input className="text-sm font-medium w-fit"
                  defaultValue={paymentMethod.supported_currencies}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("supported_currencies", e.target.value)}
                />

              </div>


              <Accordion>
                <AccordionItem key="1" aria-label="fee" title={`fee (${ paymentMethod.fee?.length})`}>
                  <BaseEditableTable 
                    tableName='fee' 
                    data={paymentMethod.fee ??[]} 
                    columns={['prc', 'fix', 'minAmount','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="2" aria-label="fx_fee" title={`fx_fee (${ paymentMethod.fx_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='fx_fee' 
                    data={paymentMethod.fx_fee ??[]} 
                    columns={['prc', 'fix', 'country_code','currencies','Action']}
                    handleSaveRecord={handleSaveRecord}
                  />
                </AccordionItem>
                <AccordionItem key="3" aria-label="tax_fee" title={`tax_fee (${ paymentMethod.tax_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='tax_fee' 
                    data={paymentMethod.tax_fee ??[]} 
                    columns={['prc', 'fix', 'country_code','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="4" aria-label="dispute_fee" title={`dispute_fee (${ paymentMethod.dispute_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='dispute_fee' 
                    data={paymentMethod.dispute_fee ??[]} 
                    columns={['dispute_type', 'fix', 'currency_code','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="5" aria-label="game_settings" title={`game_settings (${ paymentMethod.game_settings?.length})`}>
                  <BaseEditableTable 
                    tableName='game_settings' 
                    data={paymentMethod.game_settings ??[]} 
                    columns={['game_id', 'enabled', 'Action']}
                    unEditableFields={['game_id']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
              </Accordion>

            </div>  
        );

};

  return (

    <Card className="w-full min-w-[600px]">
      <CardHeader className="flex gap-3 items-center justify-between"> 
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Payment Method Details</p>

            <div className="flex items-center" >
              {paymentMethod.logo_url && (
              <img 
                src={paymentMethod.logo_url} 
                alt={`${paymentMethod.name} logo`} 
                className="h-6 w-auto" 
              />
              )}
              <p className="text-lg text-default-500 ml-2" >{paymentMethod.caption + ' ' + paymentMethod.aggregator_name}</p>
            </div>
            
        </div>

        <div  className='flex space-x-2 flex-nowrap'>
                  
          {!isEditable ?

          <div className="relative flex items-center gap-2">

              <Tooltip color='primary' content="Edit card">
              <Button className="text-lg text-primary bg-white-500 hover:bg-gray-200"
                onClick={() =>handleEditButtonClick()}
              >
                      <EditIcon />
                  </Button>
              </Tooltip>    
              <Tooltip color="danger" content="Delete card">
                  <Button className="text-lg text-danger bg-white-500 hover:bg-gray-200">
                      <DeleteIcon />
                  </Button>
              </Tooltip>
          </div>
          :
          <div className="relative flex items-center gap-2">
          
            {isChanged && <Tooltip color='success' content="Save card">
              <Button 
                  className="text-lg text-success bg-white-500 hover:bg-gray-200"                          
                  onClick={handleSaveButtonClick}
              >
                  <SaveIcon />  
              </Button>
            </Tooltip> }   
            <Tooltip color="danger" content="Cancel changes">
                <Button 
                    className="text-lg text-danger bg-white-500 hover:bg-gray-200"
                    onClick={handleCancelButtonClick}
                >
                    <CancelIcon />
                </Button>
            </Tooltip>
          </div>
          }

        </div>

      </CardHeader>
      <Divider/>

          <Card>
            <CardBody>
              {renderCardContent()}
            </CardBody>
          </Card>  
    </Card>

  );
};

export default PaymentMethodDetailForm;
