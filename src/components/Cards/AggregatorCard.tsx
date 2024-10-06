'use client';

import React, { useEffect, useState } from 'react';
import { AggregatorEntity } from "@/entities/aggregator/_domain/types";
import { useDataFetcher } from '@/hooks/useDataFetcherDynamicRoutes';
import Loader from '../Common/Loader';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Divider, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';

interface PaymentMethodDetailFormProps {
  aggId: string;
}

const AggregatorDetailForm: React.FC<PaymentMethodDetailFormProps> = ({aggId}) => {
    const [activeTab, setActiveTab] = useState('details');
    const[aggregator, setAggregator] = useState<AggregatorEntity|null>(null);
    const [linkValue, setLinkValue] = useState('');
//getting game details
    const {data, isLoading, error, total, fetchData } = useDataFetcher<AggregatorEntity>();
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

    if (error) {
      return <div>Error loading {error}</div>; 
    }

    if (!aggregator) {
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
                <p className="text-sm font-medium">{aggregator.id}</p>
              </div>

              <div className="flex items-center mb-4">
                <label className="block text-md font-medium mr-4">Name:</label>
                <p className="text-sm font-medium">{aggregator.name}</p>
              </div>

              <Accordion>

                <AccordionItem key="1" aria-label="ips" title={`fx_fee (${ aggregator.fx_fee?.length})`}>
                  {renderSettingsTable(aggregator.fx_fee ??[])}
                </AccordionItem>
              <AccordionItem key="2" aria-label="ips" title={`tax_fee (${ aggregator.tax_fee?.length})`}>
                {renderSettingsTable(aggregator.tax_fee ??[])}
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
          <p className="text-lg font-semibold">Aggregator Details</p>
          <div className="flex items-center" >
            <p className="text-lg text-default-500 ml-2" >{aggregator.name}</p>
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

export default AggregatorDetailForm;
