import React from "react";

type Props = {
  id: string;
  label: string;
  options: any;
  handleChange: any;
  value: string;
};

export default function SelectItem({
  id,
  label,
  options,
  handleChange,
  value,
}: Props) {
  return (
    <div key={id}>
      <label htmlFor="countries" className="block mb-2 text-sm dark:text-white">
        {label}
      </label>
      <select
        id={id}
        value={value}
        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(event) => handleChange(event, id)}
      >
        {options?.map((el: any) => {
          return <option value={el?.value}>{el.label}</option>;
        })}
      </select>
    </div>
  );
}
