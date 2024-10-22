import React, { createContext, useContext, useState } from 'react';

interface FilterContextProps {
filterValue: string;
currentState?: string;
dateRangeValue: string[] | null;
complexFilterValue: Record<string, any> | undefined;
showFilters: boolean;
showAdditionalFilters?: boolean;
currentPage?: number;
handleCurrentPageChange?:(pageValue:number)=>void;
handleDateRangeChange?: (dateRangeValue: string[]|null) => void;
handleFilterChange?: (filterValue: string) => void;
handleFilterSubmit?: () => void;
handleClear?: () => void;
handleContextInit?: () => void;
setShowFilters?: (showFilterValue: boolean) => void;
setShowAdditionalFilters?: (showAdditionalFiltersValue: boolean) => void;
handleStateChange?: (state: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [filterValue, setFilterValue] = useState('');
const [dateRangeValue, setDateRangeValue] = useState<string[] | null>(null);
const [complexFilterValue, setComplexFilterValue] = useState<Record<string, any>>({});
const [showFilters, setShowFilters] = useState(false);
const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [currentState, setCurrentState] = useState("");

const handleFilterChange = (filterValue: string) => {
    setFilterValue(filterValue);
};


const handleStateChange = (state:string) => {


       setCurrentState(state);
    
}
const handleFilterSubmit = () => {
    //setCurrentPage(1); 

    const filterFields = {
    selectedFields: filterValue.trim() || "", 
    dateRange: dateRangeValue ? dateRangeValue : ["", ""] ,
    status: currentState || "",
    };

    setComplexFilterValue(filterFields);
    setCurrentPage(1);


}
    
const handleCurrentPageChange = (pageValue: number) =>{
    setCurrentPage(pageValue);
}

const handleDateRangeChange = (dateRangeValue: string[]|null) => {
setDateRangeValue(dateRangeValue)
};

const handleClear=() => {
    handleFilterChange('');
    if(handleDateRangeChange) {
        handleDateRangeChange(null);
    }
    handleStateChange("");
}

const handleContextInit=() => {
    handleFilterChange('');
    if(handleDateRangeChange) {
        handleDateRangeChange(null);
    }
    setComplexFilterValue({});
    setCurrentPage(1);
    setCurrentState("")
}

return (
    <FilterContext.Provider
    value={{ filterValue, 
            currentState,
            dateRangeValue, 
            complexFilterValue, 
            showFilters, 
            showAdditionalFilters,
            currentPage, 
            handleCurrentPageChange,
            setShowFilters,
            setShowAdditionalFilters,
            handleDateRangeChange, 
            handleFilterChange, 
            handleFilterSubmit, 
            handleClear,
            handleContextInit,
            handleStateChange}}
    >
    {children}
    </FilterContext.Provider>
);
};

export const useFilter = () => {
const context = useContext(FilterContext);
if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
}
return context;
};