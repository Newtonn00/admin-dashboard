import { Button, Checkbox, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';

import { useState } from 'react';
import { DeleteIcon } from '../Icons/Table/delete-icon';
import { EditIcon } from '../Icons/Table/edit-icon';
import { SaveIcon } from '../Icons/Table/save-icon';
import { CancelIcon } from '../Icons/Table/cancel-icon';
import { boolean } from 'zod';

interface BaseEditableTableProps{
    tableName: string;
    data:Record<string, any>[];
    columns: string[];
    unEditableFields?: string[];
    handleSaveRecord: (tableName: string, data: Record<string, any>) => void;

}

const BaseEditableTable:React.FC<BaseEditableTableProps> =({tableName, data, columns, unEditableFields = [], handleSaveRecord})=>{
    
    const [editIndex, setEditIndex] = useState(-1);
    const [editValues, setEditValues] = useState<Record<string, any>>({});



    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditValues({ ...data[index] });
    };
    
    const handleSaveClick = () => {

        handleSaveRecord(tableName, editValues);
        setEditIndex(-1);
        setEditValues({});
    };
    
    const handleInputChange = (key: string, value: any) => {
        setEditValues((prev) => ({
        ...prev,
        [key]: value,
        }));
    };
    
    const handleCancelClick = () => {
        setEditIndex(-1);
        setEditValues({});
    };


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

                    (editIndex === index && !unEditableFields.includes(column) ? (
                       typeof editValues[column] === 'boolean' ?
                        <Checkbox 
                            defaultSelected={editValues[column]}
                            onChange={(e) => handleInputChange(column, e.target.checked)}
                        >

                        </Checkbox>

                        :
                        <Input
                            value={editValues[column] || ""}
                            onChange={(e) => handleInputChange(column, e.target.value)}
                            
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
 
                                <Tooltip color='success' content="Save row">
                                    <span 
                                        className="text-lg text-success cursor-pointer active:opacity-50"
                                        onClick={handleSaveClick}
                                    >
                                        <SaveIcon />
                                    </span>
                                </Tooltip>    
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
