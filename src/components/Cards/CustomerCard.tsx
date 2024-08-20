'use client';

import React, { useEffect, useState } from 'react';
import { CustomerEntity } from "@/entities/customer/_domain/types";
import Loader from '../common/Loader';
import { useCustomers } from '@/hooks/useCustomersData';
import CompaniesTable from '../Tables/CompaniesTable';
import GamesTable from '../Tables/GamesTable';
import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from '@nextui-org/react';

interface CustomerDetailFormProps {
  customerId?: string;
  companyId?: string;
}

const CustomerDetailForm: React.FC<CustomerDetailFormProps> = ({ customerId, companyId}) => {
    const [activeTab, setActiveTab] = useState('details');
    const[currentPage, setCurrentPage] = useState(1);
    const[customer, setCustomer] = useState<CustomerEntity|null>(null);
    const pageSize = 1;
    let filter: Record<string, any> = {};
    if (customerId){
      filter = JSON.parse(`{"customerId":"${customerId}"}`);
    }else if(companyId){

      filter = JSON.parse(`{"companyId":"${companyId}"}`);
    }
    const {customers, isLoadingCustomers, errorCustomers, fetchCustomers} = useCustomers(currentPage, pageSize, filter);
    
    useEffect(() => {

            fetchCustomers();

    },[]);

    useEffect(() => {
      if (customers.length > 0) {
        setCustomer(customers[0]);
      }
    }, [customers]);


    if (errorCustomers ) {
      return <div>Error loading {errorCustomers}</div>; 
    }

    if (!customer) {
    return null;
    }
    if (isLoadingCustomers) {
      return <Loader /> ;
    } 

    const handleTabChange = (key: any) => {
      setActiveTab(key); 
    };

    const renderTabContent = () => {
    switch (activeTab) {
        case 'details':
        return (
            <div> 


              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Id:</label>
                  <p className="text-sm font-medium">{customer.id}</p>
              </div>
              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Name:</label>
                  <p className="text-sm font-medium">{customer.name}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">E-mail:</label>
                  <p className="text-sm font-medium">{customer.email}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Sub:</label>
                  <p className="text-sm font-medium">{customer.sub}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Is staff:</label>
                  <p className="text-sm font-medium">{customer.is_staff}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Accepted Privacy Version:</label>
                  <p className="text-sm font-medium">{customer.accepted_privacy_version}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Accepted privacy version at:</label>
                  <p className="text-sm font-medium">{customer.accepted_privacy_at}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Accepted Term Version:</label>
                  <p className="text-sm font-medium">{customer.accepted_terms_version}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Accepted term version at:</label>
                  <p className="text-sm font-medium">{customer.accepted_terms_at}</p>
              </div>

              <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Created At:</label>
                  <p className="text-sm font-medium">{customer.created_at}</p>
                </div>

                <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Modified At:</label>
                  <p className="text-sm font-medium">{customer.modified_at}</p>
                </div>

                <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Deleted_at:</label>
                  <p className="text-sm font-medium">{customer.deleted_at}</p>
                </div>


                <div className="flex items-center mb-4">
                  <label className="block text-md font-medium mr-4">Archived_at:</label>
                  <p className="text-sm font-medium">{customer.archived_at}</p>
                </div>



            </div>

        );
        case 'companies':
        return (

            <CompaniesTable customerId={customerId} /> 
 
        );
        case 'games':
        return (

            <GamesTable customerId={customerId} />
        ); 
        default:
        return null;
    }
};

  return (
    <Card className="w-full min-w-[600px]">
    <CardHeader className="flex gap-3"> 
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Customer details</p>
        <p className="text-md text-default-500">{customer.name}</p>
      </div>

    </CardHeader>
    <Divider/>


<div className="flex w-full flex-col">
      <Tabs aria-label="Options"
        onSelectionChange={handleTabChange}
      >
        <Tab key="details" title="Details">
          <Card>
            <CardBody>
              {renderTabContent()}
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="companies" title="Companies">
          <Card>
            <CardBody
              
            >
              {renderTabContent()}
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="games" title="Games">
          <Card>
            <CardBody>
              {renderTabContent()}
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div> 


    {/* <Divider/>
    <CardFooter>

    </CardFooter> */}
  </Card>

  );
};

export default CustomerDetailForm;