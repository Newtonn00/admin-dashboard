'use client';

import React from 'react';
import {ColumnType} from "@/types/tableTypes"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table"

import { Chip, Pagination, RangeValue, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useFilter} from "../Navbar/filter-context";
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';


type ColorType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
interface BaseTableProps<T> {
    data: T[];
    columns: ColumnType<T>[];
    hasMoreRecords?: boolean;
    infinitePagination?: boolean;
    totalValue?: number;
    pageSize: number;
    totalPages: number;
    isLoading?: boolean;
    error?: string | null;
    routeName?: string;
    onSetPageSize(pageSize: number): void;
    onLinkClick: (link:string) => void;
 
}



const BaseTableNextUI = <T extends Record<string, any>>({
    data,
    columns,
    totalValue,
    pageSize,
    totalPages,
    isLoading,
    error,
    routeName = "none",
    hasMoreRecords=false,
    infinitePagination=false,
    onSetPageSize,
 
    onLinkClick,

}: BaseTableProps<T>) => {
    const selectedColor: ColorType = "primary"
    const router = useRouter()

    const {complexFilterValue, setShowFilters, handleContextInit, currentPage, handleCurrentPageChange} = useFilter();

// rounting by double click to interbal pages (cards)
    const handlePageSizeChange = (value:string) => {
        onSetPageSize(parseInt(value, 10));
    };
    const handleOpenForm = (route: string, id: string) => {
        if (route !== "none"){
            router.push(`${route}${id}`); 
        }    
    };

    const handleLinkClick=(link: string)=>{
        onLinkClick(link);
    }


    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore: hasMoreRecords,
        onLoadMore: () => {
        if (handleCurrentPageChange) {
            handleCurrentPageChange((currentPage ?? 0)+1);
        }
        },
    });

// rendering table cell content
    const TableCellContent = (
        {
            column,
            row,
        }: 
        {
            column: ColumnType<T>;
            row: T;
        }) =>
    {
//rendering cell with external links
        if (column.link_type === "external" && column.link && typeof column.link === 'string') {
            return (
                <a className='text-blue-500 hover:underline'
                    href={row[column.link]}
                    target="_blank"
                    rel="noopener noreferrer"

                    onClick={(e) => {
                        
                        handleLinkClick(row[column.link as string]);                        
                        
                        e.stopPropagation();

                    }} 
                >
                    {row[column.key]}
                </a>
            );
//rendering cell with internal links
        } else if (column.link_type === "internal" && column.link) {
            return (
                <Link
                    className='text-blue-500 hover:underline'
                    href={typeof column.link === 'function' ? column.link(row) : column.link}
                    
                    onClick={(e) => e.stopPropagation()}
                >
                    {row[column.key]}
                </Link>
            );
        }
        return  (column.cellColor ? <Chip
                    className='rounded-md'
                    style={{backgroundColor: `${typeof column.cellColor === 'function' ? column.cellColor(row) : column.cellColor}` }} 
                    
                >
                    {row[column.key]}
                </Chip> 
                :
                <p>{row[column.key]}</p>);
    }

// rendering top part of table: search text, date range, page size selector
    const topContent = React.useMemo(() => {
        return (
            <>
                <div className="flex flex-col gap-4 ">
                    <div className="flex justify-between items-center">
                        
                        
                    </div>

                    
                </div>

                <div className='flex w-full justify-between items-center'>
                {totalValue && (totalValue > 0) ? <Chip className='text-xs ml-4' color="primary">{`Total rows: ${totalValue}`}</Chip> : <></> }
                    {totalPages > 0 ? (
                        <div className='flex w-full justify-between'>
                        <div className="flex w-full justify-center">
                           {!infinitePagination && <Pagination
                                size='sm'
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={currentPage}
                                total={totalPages}
                                onChange={(page) => handleCurrentPageChange?.(page)}
                            />}
                        </div>
                        


                        <Select
                            size='sm'
                            defaultSelectedKeys={[String(pageSize)]}
                            onSelectionChange={(keys) => 

                                    {
                                        const selectedValue = Array.from(keys).join(""); 
                                        handlePageSizeChange(selectedValue);
                                    }

                            }
                            className="w-auto min-w-[80px]"
                        >
                            <SelectItem key="10">10</SelectItem>
                            <SelectItem key="20">20</SelectItem>
                            <SelectItem key="50">50</SelectItem>
                            <SelectItem key="100">100</SelectItem>
                        </Select>
                        </div>
                        ) : null}
                </div>

            </>
        )
    }, [ pageSize, totalPages, currentPage, totalValue]);     

    
    if (error) {
        
        return (
            <div className="flex items-center justify-center min-h-screen">

                <div className="text-red-500">{error}</div>
            </div>
        );
    }


    return (
        <div className="flex flex-col gap-3">
            <Table 
                isHeaderSticky
                color={selectedColor}
                selectionMode="single" 
                defaultSelectedKeys={["2"]} 
                isStriped 
                topContent={topContent}
                topContentPlacement='outside'
                aria-label='qwe'
                baseRef={scrollerRef}
                bottomContent={
                infinitePagination && hasMoreRecords ? (
                    <div className="flex w-full justify-center">
                        <Spinner ref={loaderRef} color="default" />
                    </div>
                ) : null
                }
                // classNames={{
                // base: "max-h-[700px] overflow-scroll",
                // table: "min-h-[400px]",
                // }}

                classNames={{
                    base: "max-h-[90vh] overflow-auto", 
                    table: "w-[90vw]",
                  }}




                >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={String(column.key)}>
                        {column.label}

                </TableColumn>}

                </TableHeader>

                    <TableBody
                    
                        isLoading={isLoading}
                        loadingContent={<Spinner color="primary" />}
                    >
                        

                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}
                            
                                onDoubleClick={() => {
                                    if (routeName !== "none") {
                                        handleOpenForm(routeName, row.id); 
                                    } 
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell 
                                        key={String(column.key)}
                                        
                                    >

                                        <div 
                                            className="truncate max-w-xs" 
                                            title={row[column.key] as unknown as string} 

                                            
                                        >

                                   
                                            <TableCellContent column = {column} row = {row} />    
                                
                                        </div>
                                        
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

            </Table>

        </div>
    );

    
};

export default BaseTableNextUI;
