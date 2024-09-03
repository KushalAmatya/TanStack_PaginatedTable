import { useState } from "react";
import { data } from "./constant";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { editableCell } from "./editableCell";
import genderCell from "./genderCell";
import { Search } from "./Search";

type dataType = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  ip_address: string;
};

const columnHelper = createColumnHelper<dataType>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("first_name", {
    header: "First Name",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: "Last Name",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: genderCell,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: editableCell,
  }),
];

const App = () => {
  const [tableData, setTableData] = useState(data);
  const [columnFilters, setColumnFilters] = useState([
    {
      id: "first_name",
      value: "",
    },
  ]);
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData((prev) => {
          const newData: any = [...prev];
          newData[rowIndex][columnId as keyof dataType] = value;
          return newData;
        });
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 14,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = tableData.length;

  const startRow = currentPage * pageSize + 1;
  const endRow = Math.min((currentPage + 1) * pageSize, totalRows);

  return (
    <div>
      <div>
        <Search
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`${
                      index == 1
                        ? "min-w-[50px] max-w-[50px]"
                        : "min-w-[200px] max-w-[200px]"
                    } border text-center border-gray-300 px-4 py-2  bg-gray-100 `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-gray-50 w-full">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`${
                      index == 0
                        ? "!max-w-[50px] !min-w-[50px]"
                        : "max-w-[200px] min-w-[200px]"
                    } border border-gray-300 px-4 py-2  text-center`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-4 items-center mt-4">
          <button
            onClick={() => table.previousPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-32"
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <div className="text-sm text-gray-700">
            Showing {startRow}-{endRow} of {totalRows} cells
          </div>

          {table.getCanNextPage() && (
            <button
              onClick={() => table.nextPage()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-32"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
