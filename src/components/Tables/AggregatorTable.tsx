'use client';

import React, { useState, useEffect } from 'react';
import BaseTableNextUI from './BaseTableNextUI';
import { ColumnType} from "@/types/tableTypes"
import { AggregatorEntity } from '@/entities/aggregator/_domain/types';
import { useLogger } from '@/hooks/useLogger';
import { API_ENDPOINTS } from '@/shared/config/apiEndpoints';
import { useDataFetcher } from '@/hooks/useDataFetcherDynamicRoutes';
import { useFilter } from '../Navbar/filter-context';

const AggregatorsTable = () => {
 

    const {complexFilterValue, setShowFilters, handleContextInit, currentPage } = useFilter();

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
    const [initialized, setInitialized] = useState(false);    
    const [linkValue, setLinkValue] = useState('');
    //const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalValue, setTotalValue] = useState(0);
    const [dateRangeValue, setDateRangeValue] = useState<string[] | null>(null);
    const { data: aggregators, isLoading, error, total, fetchData } = useDataFetcher<AggregatorEntity>(); 

    
    const { logMessage } = useLogger();


    useEffect(() => {

        let timeoutId: NodeJS.Timeout;

        if (!initialized) {
            timeoutId = setTimeout(() => setInitialized(true), 100);  
        }else{
            fetchData({
                    endpoint:API_ENDPOINTS.AGGREGATOR, 
                    page:currentPage,
                    pageSize:pageSize,
                    selectedFilterValue:complexFilterValue});
            }            

    }, [initialized, currentPage, pageSize, complexFilterValue]);

useEffect(() => {

    setTotalPages(Math.ceil(total / pageSize));
    setTotalValue(total);


},[total]);


    useEffect(() =>{
        if (linkValue){
            logMessage(`Link fetched: ${linkValue}`)
        }    
    },[linkValue]);

    const handleLinkClick = (linkValue: string) => {
        setLinkValue(linkValue);
    };



    const columns: ColumnType<AggregatorEntity>[] = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Name'},

    ];

return (
    <div>
        <BaseTableNextUI
            data={aggregators}
            columns={columns}
            totalValue={totalValue}
            pageSize={pageSize}
            totalPages={totalPages}
            isLoading={isLoading}
            error={error}
            routeName='/aggregator-card/'
            onSetPageSize={setPageSize}
            onLinkClick={handleLinkClick}


        />
    </div>
);

};

export default AggregatorsTable;
