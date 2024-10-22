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
import { isCountryISOCodeCorrect } from '@/shared/utils/countries';
import { isCurrencyISOCodeCorrect } from '@/shared/utils/currencies';
import ModalForm from '../Modal/ModalForm';


interface PaymentMethodDetailFormProps {
  pmId: string;
}

const PaymentMethodDetailForm: React.FC<PaymentMethodDetailFormProps> = ({pmId}) => {

    const [isEditable, setIsEditable] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [validationState, setValidationState] = useState<Record<string, boolean>>({});
    const [editedValues, setEditedValues] = useState<Record<string, any>|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updatedData, setUpdatedData] = useState<Record<string,any>|null>(null)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEntity|null>(null);

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
        setEditedValues(data[0]);
        const initialValidationState: Record<string, boolean> = {};
        Object.keys(data[0]).forEach(key => {initialValidationState[key] = true});
        setValidationState(initialValidationState);



      }
    }, [data]);


    useEffect(() => {
      if (savedData) {
        
        setPaymentMethod(savedData);
      }
    }, [savedData]);
    


    const handleSaveRecord = (tableName: string, updatedData: Record<string, any>) =>{

      setUpdatedData({id:pmId, data:updatedData, tableName});
    }

    const handleEditButtonClick=() => {
      setIsEditable(true);

    }
    
    const handleCancelButtonClick=() => {

      
        if (isChanged) {
          setIsModalOpen(true);
        } else {
          setIsEditable(false);
        }
    }

    const clearChanges = () => {
      
      setIsEditable(false);
      setIsChanged(false);
      setIsModalOpen(false);
      setEditedValues(paymentMethod);
      const initialValidationState: Record<string, boolean> = {};
      Object.keys(data[0]).forEach(key => {initialValidationState[key] = true});
      setValidationState(initialValidationState);

    }

    const handleSaveButtonClick=() => {
      setIsEditable(false);
      setIsChanged(false);
      handleSaveRecord("payment_method", editedValues ? editedValues : {});

    }

    const handleInputChange=(fieldName: string, value: any) =>{

      const changedValues = {
        ...editedValues,
        [fieldName]: value,
      };

      setValidationState({...validationState, [fieldName]: isCodesValid(fieldName,value)})
      setIsChanged(hasChanges(paymentMethod, changedValues));
      setEditedValues(changedValues);


    }

    const isCodesValid = (fieldName:string, codeList: string):boolean =>{
      
      switch (fieldName){
        case 'supported_countries':
          return codeList.split(',').every((country) =>  isCountryISOCodeCorrect(country.trim()));

        case 'supported_currencies':
          return codeList.split(',').every((currency) =>  isCurrencyISOCodeCorrect(currency.trim()));
        default:
          return true;
      };
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
                  value={editedValues?.caption}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("caption", e.target.value)}
                />
      
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Logo URL:</label>

                <Input className="text-sm font-medium w-70"
                  value={editedValues?.logo_url}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  style={{ width: `${editedValues?.logo_url.length + 2}ch` }}
                  onChange={(e) => handleInputChange("logo_url", e.target.value)}
                />
              </div>


              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator ID:</label>
                <Input className="text-sm font-medium w-70"
                  value={paymentMethod.aggregator_id}
                  disabled={!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  style={{ width: `${editedValues?.aggregator_id.length + 2}ch` }}
                  onChange={(e) => handleInputChange("aggregator_id", e.target.value)}
                  isRequired
                  
                />
                

              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator Name:</label>
                <p className="text-sm font-medium">{editedValues?.aggregator_name}</p>
              </div>

              

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Dashboard Show:</label>

                <Checkbox 
                  isSelected={editedValues?.dashboard_show}
                  onChange={(e) => handleInputChange("dashboard_show", e.target.checked)}
                  color={isEditable ? 'primary' : 'default'}
                  isDisabled={!isEditable}
                  size='lg'
                />




              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Countries:</label>
                <Input className="text-sm font-medium w-fit"
                  value={editedValues?.supported_countries}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("supported_countries", e.target.value)}
                  isInvalid={!validationState["supported_countries"]}
                />
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Currencies:</label>
                <Input className="text-sm font-medium w-fit"
                  //defaultValue={paymentMethod.supported_currencies}
                  value={editedValues?.supported_currencies}
                  disabled = {!isEditable}
                  color={isEditable ? 'primary' : 'default'}
                  onChange={(e) => handleInputChange("supported_currencies", e.target.value)}
                  isInvalid={!validationState["supported_currencies"]}
                />

              </div>


              <Accordion>
                <AccordionItem key="1" aria-label="fee" title={`fee (${ paymentMethod.fee?.length})`}>
                  <BaseEditableTable 
                    tableName='fee' 
                    data={paymentMethod.fee ??[]} 

                    dataType={{'prc':{type: 'number', editable: true, validation: (value:number) => !isNaN(value)},
                              'fix':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                              'minAmount':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},                
                              'Action': { type: '', editable: false }}}

                    columns={['prc', 'fix', 'minAmount','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="2" aria-label="fx_fee" title={`fx_fee (${ paymentMethod.fx_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='fx_fee' 
                    data={paymentMethod.fx_fee ??[]} 

                    dataType={{'prc':{type: 'number', editable: true, validation: (value:number) => !isNaN(value)},
                    'fix':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                    'country_code':{type:'text', editable: true, validation: (value:string) => value ? isCountryISOCodeCorrect(value.trim()) : true}, 
                    'currencies': {type: 'text', editable: true, validation: (value:string) => typeof value === 'string' ? value.split(',').every((currency) =>  isCurrencyISOCodeCorrect(currency.trim())) : true}, 
          
                    'Action': { type: '', editable: false }}}
                    columns={['prc', 'fix', 'country_code','currencies','Action']}
                    handleSaveRecord={handleSaveRecord}
                  />
                </AccordionItem>
                <AccordionItem key="3" aria-label="tax_fee" title={`tax_fee (${ paymentMethod.tax_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='tax_fee' 
                    data={paymentMethod.tax_fee ??[]} 

                    dataType={{'prc':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                              'fix':{type: 'number', editable: true, validation:  (value:number) => !isNaN(value)},
                              'country_code':{type:'text', editable: true, validation:  (value:string) => value ? isCountryISOCodeCorrect(value.trim()) : true}, 
                              'Action': { type: '', editable: false }}}
                    
                    columns={['prc', 'fix', 'country_code','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="4" aria-label="dispute_fee" title={`dispute_fee (${ paymentMethod.dispute_fee?.length})`}>
                  <BaseEditableTable 
                    tableName='dispute_fee' 
                    data={paymentMethod.dispute_fee ??[]} 
                   
                    dataType={{'dispute_type': {type: 'text', editable: false}, 
                              'fix':  {type: 'number', editable: true, validation:  (value:number) => !isNaN(value)}, 
                              'currency_code': {type: 'text', editable: true, validation: (value:string) => value ? isCurrencyISOCodeCorrect(value.trim()) : true}, 
                              'Action': { type: '', editable: false }}}

                    columns={['dispute_type', 'fix', 'currency_code','Action']}
                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
                <AccordionItem key="5" aria-label="game_settings" title={`game_settings (${ paymentMethod.game_settings?.length})`}>
                  <BaseEditableTable 
                    tableName='game_settings' 
                    data={paymentMethod.game_settings ??[]} 
                    dataType={{'game_id':{type:'text', editable: false, validation:(value:string)=>true},
                              'enabled':{type:'checkbox', editable: true}, 
                              'Action': { type: '', editable: false }}}
                    columns={['game_id', 'enabled', 'Action']}

                    handleSaveRecord={handleSaveRecord} 
                  />
                </AccordionItem>
              </Accordion>

            </div>  
        );

};

  return (
    <>
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
            
              {!Object.values(validationState).includes(false) && isChanged && <Tooltip color='success' content="Save card">
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

      <ModalForm 
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        headerText={'Confirmation'} 
        BodyComponent={() => {
          return <><p>Unsaved changes will be canceled.<br />
            Please, confirm your action
            </p></>
        }}
        handleCancelExtended={() => {null}}
        
        handleConfirmExtended={clearChanges}      
      
      />

    </>


  );
};

export default PaymentMethodDetailForm;
