import * as Label from "@radix-ui/react-label";

type SearchProps = {
  columnFilters: any[];
  setColumnFilters: (filters: any[]) => void;
};

export const Search = ({ columnFilters, setColumnFilters }: SearchProps) => {
  const searchValue = columnFilters.find(
    (column) => column.id === "first_name"
  )?.value;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const filterIndex = columnFilters.findIndex(
      (column) => column.id === "first_name"
    );

    let newColumnFilters;

    if (filterIndex !== -1) {
      newColumnFilters = [...columnFilters];
      newColumnFilters[filterIndex].value = value;
    } else {
      newColumnFilters = [...columnFilters, { id: "first_name", value }];
    }

    setColumnFilters(newColumnFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-[15px] px-5 mt-4">
      <Label.Root
        className="text-[15px] font-medium leading-[35px] text-black"
        htmlFor="firstName"
      >
        First name
      </Label.Root>
      <input
        className="bg-blackA2 shadow-blackA6 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
        type="text"
        id="firstName"
        value={searchValue || ""}
        onChange={handleSearch}
      />
    </div>
  );
};
