import { useEffect, useState } from "react";

export const editableCell = ({ getValue, column, row, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      type="text"
      className="w-[300px] text-left"
      value={value}
      onBlur={onBlur}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
