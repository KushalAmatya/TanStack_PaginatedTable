import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const GenderCell = ({ getValue, column, row, table }: any) => {
  const initialValue = getValue();
  const [selectedGender, setSelectedGender] = useState(initialValue);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
    table.options.meta?.updateData(row.index, column.id, event.target.value);
  };

  useEffect(() => {
    setSelectedGender(initialValue);
  }, [initialValue]);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <p className="hover:cursor-pointer">{selectedGender}</p>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[150px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
              Edit Gender
            </p>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="male"
              >
                Male
              </label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={selectedGender === "Male"}
                onChange={handleGenderChange}
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="female"
              >
                Female
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={selectedGender === "Female"}
                onChange={handleGenderChange}
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="polygender"
              >
                Polygender
              </label>
              <input
                type="radio"
                id="polygender"
                name="gender"
                value="Polygender"
                checked={selectedGender === "Polygender"}
                onChange={handleGenderChange}
              />
            </fieldset>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default GenderCell;
