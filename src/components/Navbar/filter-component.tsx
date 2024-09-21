
import { Button, DateRangePicker, DateValue, Input, RangeValue, Select, SelectItem } from "@nextui-org/react";
import { useFilter } from "./filter-context";
import {parseDate} from "@internationalized/date";
import { SearchIcon } from "../Icons/Table/search-icon";
import { useState } from "react";
import { transactionStatus } from "@/entities/transaction/_domain/transactionStatus";

const FilterComponent = () =>{

    const { filterValue, dateRangeValue, showFilters, showAdditionalFilters, currentState, handleFilterChange, handleFilterSubmit, handleDateRangeChange, handleClear, handleStateChange } = useFilter();
    
    const states = [ {key: "0", value: "all states"}, ...transactionStatus];


                   
    


// convert string data to data range
    const getRangeValue = (value: string[] | null | undefined): RangeValue<DateValue> | null => {
        if (!value) return null;
        const startDate: DateValue = parseDate(value[0]);
        const endDate: DateValue = parseDate(value[1]);
        const dateRange: RangeValue<DateValue> = { start: startDate, end: endDate };
        return dateRange;
    };
    return(
        <>

        {showFilters && (
            <div className="flex justify-start gap-2 items-center">
                <Input
                    isClearable = {true}
                    startContent={<SearchIcon />}
                    placeholder="Search by text..."
                    value={filterValue}
                    onValueChange={handleFilterChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFilterSubmit ? handleFilterSubmit() : null; 
                        }
                    }}
                    className="w-full sm:max-w-[100%]"
                />
                <DateRangePicker
                    labelPlacement="outside"
                    value={getRangeValue(dateRangeValue)}
                    onChange={(range) => handleDateRangeChange ? handleDateRangeChange([range.start.toString(), range.end.toString()]): null}
                    className="max-w-xs ml-2" 
                />


                {showAdditionalFilters && <Select
                    size='md'
                    variant = "flat"
                    //defaultSelectedKeys="0"
                    selectedKeys={states.find(({value}) => value === currentState)?.key || "0"}
                   
                    onSelectionChange={(keys) => 

                            {
                                const selectedValue = states.find(({key}) => key === Array.from(keys).join(""))?.value || "all states";                                      
                                if(handleStateChange){
                                    handleStateChange(selectedValue);
                                }
                            }

                    }
                    className="w-auto min-w-[140px] max-w-[140px] text-md"
                >
                    {states.map((state)=>( <SelectItem key={state.key}>{state.value}</SelectItem>)) 


                    }

                </Select>}    

                <Button 
                    className={`bg-${"default"}-500 text-white ml-2`} 
                    size="md"
                    onClick={handleFilterSubmit}>
                    Apply
                </Button>
                <Button 
                    onClick={handleClear} 
                    size="md"
                    className={`bg-${"default"}-500 text-white ml-2`}
                >
                    Clean
                </Button>
            </div>
            )
        }
</>
    );
}

export default FilterComponent;