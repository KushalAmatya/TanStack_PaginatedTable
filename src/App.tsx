import { useState } from "react";
import { data } from "./constant";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

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
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (row) => row.getValue(),
  }),
];

const App = () => {
  const [tabledata, setTableData] = useState(data);
  const table = useReactTable({
    data: tabledata,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 text-left bg-gray-100"
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <button
          onClick={() => table.previousPage()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-32"
        >
          Previous
        </button>

        <button
          onClick={() => table.nextPage()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-32"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
