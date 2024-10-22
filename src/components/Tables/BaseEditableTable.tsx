import { Button, Checkbox, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { DeleteIcon } from '../Icons/Table/delete-icon';
import { EditIcon } from '../Icons/Table/edit-icon';
import { SaveIcon } from '../Icons/Table/save-icon';
import { CancelIcon } from '../Icons/Table/cancel-icon';

interface BaseEditableTableProps{
    tableName: string;
    data:Record<string, any>[];
    dataType: Record<string, DataType>;
    columns: string[];
    handleSaveRecord: (tableName: string, data: Record<string, any>) => void;

}

interface DataType{
    type: 'number' | 'text' | 'checkbox' | '';
    editable: boolean;
    validation?: (value: any) => boolean;
}
const BaseEditableTable:React.FC<BaseEditableTableProps> =({tableName, data, dataType, columns, handleSaveRecord})=>{
    
    const [editIndex, setEditIndex] = useState(-1);
    const [editValues, setEditValues] = useState<Record<string, any>>({});
    const [isChanged, setIsChanged] = useState(false);




    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditValues({ ...data[index] });
    };
    
    const handleSaveClick = () => {

        handleSaveRecord(tableName, editValues);
        setEditIndex(-1);
        setEditValues({});
        setIsChanged(false);
    };
    
    const handleInputChange = (key: string, value: any) => {


        const changedValues = {
            ...editValues,
            [key]: value,
        };
        setEditValues(changedValues)  


        setIsChanged(hasChanges(data[editIndex], changedValues));
    };
    
    const handleCancelClick = () => {
        setEditIndex(-1);
        setEditValues({});
        setIsChanged(false);
    };

    const hasChanges = (current: Record<string, any>|null, edited:Record<string, any>): boolean =>{

    for (const key in current) {
        if (current[key]!== edited[key]) {
        return true;
        }
    }
    return false;
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
                
                {column !== "Action" ? 

                    (editIndex === index ? (
                       typeof editValues[column] === 'boolean' ?
                        <Checkbox 
                            defaultSelected={editValues[column]}
                            onChange={(e) => handleInputChange(column, e.target.checked)}
                        >

                        </Checkbox>

                        :
                        <Input
                            className="w-fit"
                            value={editValues[column] || ""}
                            type={dataType[column].type}
                            onChange={(e) => handleInputChange(column, e.target.value)}
                            isDisabled={!dataType[column].editable}
                            isInvalid={!dataType[column].validation?.(editValues[column] )}
                            color={dataType[column].editable ? 'primary' : 'default'}

                            
                        />

                    ) :    
                        typeof dataRow[column] === 'boolean' ?

                        
                            <Checkbox 
                                defaultSelected={dataRow[column]}
                                isDisabled
                                
                            > 
                            </Checkbox>
                        :
                            (
                            dataRow[column])
                    )
                // (dataRow[column])
                
                
                : 

                    (editIndex === index ? (
                        <div className='flex space-x-2 flex-nowrap'>
        
                            <div className="relative flex items-center gap-2">
 
                            {isChanged && <Tooltip color='success' content="Save row">
                                    <span 
                                        className="text-lg text-success cursor-pointer active:opacity-50"
                                        onClick={handleSaveClick}
                                    >
                                        <SaveIcon />
                                    </span>
                                </Tooltip>    
                            }    
                                <Tooltip color="danger" content="Cancel changes">
                                    <span 
                                        className="text-lg text-danger cursor-pointer active:opacity-50"
                                        onClick={handleCancelClick}
                                    >
                                        <CancelIcon />
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <div  className='flex space-x-2 flex-nowrap'>
                
                            <div className="relative flex items-center gap-2">
 
                                <Tooltip color='primary' content="Edit row">
                                <span className="text-lg text-primary cursor-pointer active:opacity-50"
                                onClick={() =>handleEditClick(index)}>
                                        <EditIcon />
                                    </span>
                                </Tooltip>    
                                <Tooltip color="danger" content="Delete row">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                    </span>
                                </Tooltip>
                            </div>

                        </div>
                    ))

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

export default BaseEditableTable;
