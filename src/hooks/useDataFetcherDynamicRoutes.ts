import { useState } from "react";
import { DataFetchParams } from "@/types/dataHooksTypes";

export const useDataFetcher = <T>() => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    const fetchData = async ({endpoint, page = 1, pageSize = 10,  singleId = "", selectedFilterValue = {}}: DataFetchParams) =>{
        setIsLoading(true);
        setError(null);
        


        try {
            if (singleId){

                const response = await fetch(`${endpoint}/${singleId}`);
                const { success, data } = await response.json();
                if (!success) {
                    throw new Error(`Failed to load data from ${endpoint}`);
                }
                setData([data]);
                setTotal(1);
            }else{
                const filterFields = { ...selectedFilterValue };
                console.log('hookFilter', filterFields, selectedFilterValue);
                const response = await fetch(`${endpoint}?page=${page}&pageSize=${pageSize}&filter=${encodeURIComponent(JSON.stringify(filterFields))}`);
                const { success, data, total } = await response.json();
                if (!success) {
                    throw new Error(`Failed to load data from ${endpoint}`);
                }
                setData(data);
                setTotal(total);
            }



        } catch (err) {
            setError(`${err}`);
        } finally {
            
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, total, fetchData };
};