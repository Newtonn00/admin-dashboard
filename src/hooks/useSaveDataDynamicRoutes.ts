import { useCallback, useState } from "react";

export const useSaveData =<T>( endpoint: string) => {
    const [isSaving, setIsSaving] = useState(false);
    const [errorSaving, setError] = useState<string | null>(null);
    const [updatedData, setUpdatedData] = useState<T>();
    const saveData = useCallback(async (dataId: string, data: Record<string, any> = {}) => {
        setIsSaving(true);
        setError(null);
        try {
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
    }, [endpoint]);

    return {updatedData, isSaving, errorSaving, saveData };
};