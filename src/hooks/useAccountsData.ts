import { useCallback, useState } from "react";
import { AccountEntity } from '@/entities/account/_domain/types';
import { DataFetchParams } from '@/types/dataHooksTypes';

export const useAccounts = ({page = 1, pageSize = 10, filter = {}}: DataFetchParams) => {
    const [accounts, setAccounts] = useState<AccountEntity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);


    const fetchAccounts = useCallback(async (selectedFilterValue: Record<string, any>={}) => {
        setIsLoading(true);
        setError(null);
        try {
                const filterFields = {...filter, ...selectedFilterValue};
                const response = await fetch(`/api/account?page=${page}&pageSize=${pageSize}&filter=${JSON.stringify(filterFields)}`);
                const { data, total } = await response.json();
                setAccounts(data);
                setTotal(total);

            } catch (err) {
                setError(`Failed to load accounts ${err}`);
            } finally {
                setIsLoading(false);
                
            }
    }, [page, filter, pageSize]);

    return { accounts, isLoading, error, total, fetchAccounts };
};
