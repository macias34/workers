const Button = ({ children, color, onClick }) => {
  const getTheme = () => {
    switch (color) {
      case "red": {
        return " border-red-400 text-red-400 transition hover:bg-red-400";
      }
      case "green": {
        return "border-emerald-500 transition  text-emerald-400 hover:bg-emerald-500 hover:text-white";
      }

      default: {
        return "border-sky-400 text-sky-400 transition hover:bg-sky-500 hover:text-white";
      }
    }
  };

  return (
    <button
      type="submit"
      className={`flex bg-transparent border-2 w-fit px-10 py-3 rounded-xl font-semibold text-xl ${getTheme()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
