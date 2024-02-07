"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/themeButton";
import { DataTablePagination } from "./dataTablePagination";
import { saveAs } from "file-saver";
import { FileTextIcon } from "@radix-ui/react-icons";
import { DataTableViewOptions } from "./columnVisibility";
import { DataTableColumnHeader } from "./dataTableColumnHeader";

// interface Recipe {
//   id: string;
//   title: string;
//   image: string;
//   time: number;
//   description: string;
//   vegan: boolean;
// }

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Function to convert an array of objects to a CSV string
const convertToCSV = (data: any[]) => {
  const header = Object.keys(data[0]).join(",") + "\n";
  const csv = data.map((row) => Object.values(row).join(",")).join("\n");
  return header + csv;
};

const handleExportCSV = (originalRowData: any[]) => {
  // Convert originalRowData to CSV format
  const csvData = convertToCSV(originalRowData);

  // Create a Blob with the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

  // Save the Blob as a file using FileSaver.js
  saveAs(blob, "export.csv");
};

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [originalRowData, setOriginalRowData] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  useEffect(() => {
    let selectedData = [];
    table.getFilteredSelectedRowModel().rows.map((e) => {
      selectedData.push(e.original);
    });
    setOriginalRowData(selectedData);
  }, [rowSelection, table]);

  return (
    <>
      <h1 className="text-3xl font-extrabold">Data Table</h1>

      <div className="flex justify-between">
        <div className="flex items-center py-4 gap-4">
          <Input
            placeholder="Filter Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div className="flex items-stretch justify-center m-auto gap-2">
            <ModeToggle />
            <DataTableViewOptions table={table} />
          </div>
        </div>
        {originalRowData.length > 0 && (
          <Button
            className="flex gap-2"
            onClick={() => handleExportCSV(originalRowData)}
          >
            <FileTextIcon /> Export as CSV
          </Button>
        )}
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
      </div>
    </>
  );
}

export default DataTable;
