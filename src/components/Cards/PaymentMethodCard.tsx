'use client';

import React, { useEffect, useState } from 'react';
import { PaymentMethodEntity } from "@/entities/payment_method/_domain/types";
import { useDataFetcher } from '@/hooks/useDataFetcherDynamicRoutes';
import Loader from '../Common/Loader';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Divider, Input, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';

interface PaymentMethodDetailFormProps {
  pmId: string;
}

const PaymentMethodDetailForm: React.FC<PaymentMethodDetailFormProps> = ({pmId}) => {
    const [activeTab, setActiveTab] = useState('details');
    const[paymentMethod, setPaymentMethod] = useState<PaymentMethodEntity|null>(null);
    const [linkValue, setLinkValue] = useState('');
//getting game details
    const {data, isLoading, error, total, fetchData } = useDataFetcher<PaymentMethodEntity>();
    //getting function for posting logs
    const { logMessage } = useLogger();
    useEffect(() => {

      fetchData({
        endpoint:API_ENDPOINTS.PAYMENTMETHOD,
        singleId:pmId
      });
          
    },[]);

    useEffect(() => {
      if (data.length > 0) {
        setPaymentMethod(data[0]);
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

    if (error) {
      return <div>Error loading {error}</div>; 
    }

    if (!paymentMethod) {
    return null;
    }
    if (isLoading) {
      return <Loader /> ;
    } 

    const handleTabChange = (key: any) => {
      setActiveTab(key); 
    };


    const renderSettingsTable=(data: Record<string, any>[], handleRemoveRecord?: (name: string) => void)=>{
      
      let columns: string[] = [""]

      if(data.length > 0) {
        columns = [...Object.keys(data[0]), "Action"];        
      }
      return(
        <Table>
          
        <TableHeader>

          {columns.map((columnKey) => (
            <TableColumn key={String(columnKey)}>{String(columnKey)}</TableColumn>
          ))
          
          }
          

        </TableHeader>
        {data.length > 0 ? (
          <TableBody>
            {data.map((dataRow, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell 
                    key={column}
                  >
                    
                    {column !== "Action" ? (dataRow[column]): 
                    
                    <Button 
                      color="danger" size="sm"
                      isDisabled
                    >
                    Remove
                  </Button>
                  }
                  
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No rows to display">{[]}</TableBody>
        )}
      </Table>

      );
  
      }




    // tabs rendering
    const renderTabContent = () => {
    switch (activeTab) {
        case 'details':
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
                <label className="block text-md font-medium mr-4">Description:</label>
                <p className="text-sm font-medium">{paymentMethod.caption}</p>
              </div>


              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Countries:</label>
                <p className="text-sm font-medium">{paymentMethod.supported_countries}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Supported Currencies:</label>
                <p className="text-sm font-medium">{paymentMethod.supported_currencies}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator ID:</label>
                <p className="text-sm font-medium">{paymentMethod.aggregator_id}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Aggregator Name:</label>
                <p className="text-sm font-medium">{paymentMethod.aggregator_name}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Dashboard Show:</label>
                <p className="text-sm font-medium">{paymentMethod.dashboard_show}</p>
              </div>


              <Accordion>
              <AccordionItem key="1" aria-label="ips" title={`fee (${ paymentMethod.fee?.length})`}>
                {/* <div className="mb-4 flex gap-4">
                  <Input
                    placeholder="Enter IP address"
                    fullWidth
                    //value={newHardIP.value}
                    //isInvalid={!newHardIP.isValid}
                    //onChange={(e) => handleChangeIP(e.target.value)}
                    
                  />
                  <Button 
                    //isDisabled={!newHardIP.isValid||newHardIP.value.length === 0}
                    //onPress={handleAddIP}
                  >
                    Add
                  </Button>
                </div> */}
                
                {renderSettingsTable(paymentMethod.fee ??[])}
              </AccordionItem>
                <AccordionItem key="2" aria-label="ips" title={`fx_fee (${ paymentMethod.fx_fee?.length})`}>
                  {renderSettingsTable(paymentMethod.fx_fee ??[])}
                </AccordionItem>
              <AccordionItem key="3" aria-label="ips" title={`tax_fee (${ paymentMethod.tax_fee?.length})`}>
                {renderSettingsTable(paymentMethod.tax_fee ??[])}
              </AccordionItem>
              <AccordionItem key="4" aria-label="ips" title={`dispute_fee (${ paymentMethod.dispute_fee?.length})`}>
                {renderSettingsTable(paymentMethod.dispute_fee ??[])}
              </AccordionItem>
              <AccordionItem key="5" aria-label="ips" title={`game_settings (${ paymentMethod.game_settings?.length})`}>
                {renderSettingsTable(paymentMethod.game_settings ??[])}
              </AccordionItem>
            </Accordion>

            </div>  
        );
        // case 'customers':
        // return (

        //     <CustomersTable companyId={game.company_id} /> 
 
        // );
        default:
        return null;
    }
};

  return (

    <Card className="w-full min-w-[600px]">
      <CardHeader className="flex gap-3"> 
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
            <p className="text-lg text-default-500 ml-2" >{paymentMethod.name}</p>
          </div>
        </div>

      </CardHeader>
      <Divider/>
      <Tabs aria-label="Options"
        onSelectionChange={handleTabChange}
        className='mt-2'
      >
        <Tab key="details" title="Details">
          <Card>
            <CardBody>
              {renderTabContent()}
            </CardBody>
          </Card>  
        </Tab>
        {/* <Tab key="customers" title="Customers">
          <Card>
            <CardBody>
              {renderTabContent()}
            </CardBody>
          </Card>  
        </Tab> */}
      </Tabs>
    </Card>

  );
};

export default PaymentMethodDetailForm;
