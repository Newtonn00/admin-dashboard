import { useCallback, useEffect, useState } from "react";
import { getSession } from 'next-auth/react';

export const useSaveData =<T>( endpoint: string) => {
    const [isSaving, setIsSaving] = useState(false);
    const [errorSaving, setError] = useState<string | null>(null);
    const [updatedData, setUpdatedData] = useState<T>();
    const [user, setUser] = useState<string | null>(null);

    useEffect(() =>
        {
            const fetchSession = async () => {
                const session = await getSession();
                if (session && session.user) {
                    setUser(session.user.name ?? null);
                    
                }
                
                
            }
            fetchSession();
        },[]);


    const saveData = useCallback(async (dataId: string, data: Record<string, any> = {}) => {
        setIsSaving(true);
        setError(null);
        try {
            if (user) {
                data = {
                    ...data,
                    user: user,
                }
            }else{
                data = {
                    ...data,
                    user: 'unknown',
                }
            }
            const response = await fetch(`${endpoint}/${dataId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data ),
            });
            const { success, message, returnedData } = await response.json(); 

            if (!success) {
                throw new Error(message);
            }
            setUpdatedData(returnedData);

        } catch (err) {
            setError(`${err}`);
        } finally {
            setIsSaving(false);
        }
    }, [endpoint, user]);

    return {updatedData, isSaving, errorSaving, saveData };
};