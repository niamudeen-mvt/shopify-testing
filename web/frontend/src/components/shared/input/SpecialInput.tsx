import TextError from "../TextError";

type Props = {
  type: any;
  id: any;
  value: string | number;
  label?: string;
  handleChange: any;
  errors?: any;
  note?: string;
  prefix?: string;
  suffix?: any;
};

export default function SpecialInput({
  id,
  type,
  value,
  note,
  prefix,
  suffix,
  errors,
  handleChange,
}: Props) {
  return (
    <>
      <div className="flex justify-between item-center border border-gray-300 text-gray-600 text-xs rounded-lg mb-3 font-normal">
        <span className="flex__center whitespace-nowrap px-2">{prefix}</span>
        <input
          id={id}
          type={type}
          value={value}
          spellCheck={false}
          className="border-none max-w-[260px]"
          onChange={(event) => handleChange(event, id)}
        />
        <span className="flex__center w-max px-2">{suffix}</span>
      </div>
      {errors ? <TextError color="dark" msg={errors} /> : null}
      {note ? (
        <span className="mb-3 text-gray-500">
          You can add several separated by commas
        </span>
      ) : null}
    </>
  );
}
