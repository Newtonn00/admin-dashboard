'use client';

import React, { useState, useEffect } from 'react';
import BaseTableNextUI from './BaseTableNextUI';
import { ColumnType} from "@/types/tableTypes"
import { CompanyEntity } from '@/entities/company/_domain/types';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';
import { useDataFetcher } from '@/hooks/useDataFetcher';
import { useFilter } from '../Navbar/filter-context';

interface CompaniesTableProps {
    customerId?: string;
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ customerId }: CompaniesTableProps) => {
    const [linkValue, setLinkValue] = useState('');
    //const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const[pageSize, setPageSize] = useState(20);
    //const [complexFilterValue, setComplexFilterValue] = useState<Record<string, any>>();
    const [dateRangeValue, setDateRangeValue] = useState<string[] | null>(null);

    const {complexFilterValue, setShowFilters, handleContextInit, currentPage} = useFilter();

    const [filter, setFilter] = useState(customerId ? {customerId} : {})

    //const { companies, isLoading, error, total, fetchCompanies } = useCompanies({page: currentPage, pageSize: pageSize, filter: filter});
    
    const { data: companies, isLoading, error, total, fetchData } = useDataFetcher<CompanyEntity>(); 

    const [initialized, setInitialized] = useState(false);    
// settings for global filter context
    useEffect(() => {

        if (setShowFilters)
            {setShowFilters(true);}
    
        if (handleContextInit) {
            handleContextInit();
        }
        return () => {
            if (setShowFilters)
            {setShowFilters(false);}
            if (handleContextInit) {
                handleContextInit();
            }
    };
    }, []);

    const { logMessage } = useLogger();
    
    useEffect(() => {

        let timeoutId: NodeJS.Timeout;

        if (!initialized) {
          timeoutId = setTimeout(() => setInitialized(true), 100);  
        }else{
            fetchData({
                    endpoint:API_ENDPOINTS.COMPANIES, 
                    page:currentPage,
                    pageSize:pageSize,
                    selectedFilterValue:{...complexFilterValue, ...filter}});
        }        

    }, [initialized, currentPage, pageSize, complexFilterValue, filter]);

    useEffect(() => {

        setTotalPages(Math.ceil(total / pageSize));
    
    },[total]);

    useEffect(() =>{
        if (linkValue){
            logMessage(`Link fetched: ${linkValue}`)
        }    
    },[linkValue]);

    const handleFilterChange = (filterValue: string) => {
        setFilterValue(filterValue);
    };

    const handleLinkClick = (linkValue: string) => {
        setLinkValue(linkValue);
    };

    const handleFilterSubmit = () => {
        //setCurrentPage(1);
        const filterFields = {
            selectedFields: filterValue || "", 
            created_at: dateRangeValue ? dateRangeValue : ["", ""] 
        };   
        //setComplexFilterValue(filterFields); 
        
    };

    const handleDateRangeChange = (dateRangeValue: string[]|null) => {
        setDateRangeValue(dateRangeValue)
    };

    const columns: ColumnType<CompanyEntity>[] = [
        { key: 'name', label: 'Name', link_type: 'external', link: 'company_link' },
        { key: 'created_at', label: 'Created at' },
    ];

return (
    <div>
        <BaseTableNextUI
            data={companies}
            columns={columns}
            pageSize={pageSize}
            totalValue={total}
            totalPages={totalPages}
            isLoading={isLoading}
            error={error}
            routeName='/company-card/'
            onSetPageSize={setPageSize}
            onLinkClick={handleLinkClick} 


        />
    </div>
);

};

export default CompaniesTable;
