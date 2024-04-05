const TextError = ({ msg = "msg", color }: { msg: any; color?: string }) => {
  return (
    <p className={`${color == "dark" ? "text-red-500" : "text-white"} text-xs`}>
      {msg}
    </p>
  );
};

export default TextError;
