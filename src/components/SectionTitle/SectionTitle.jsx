const SectionTitle = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 absolute left-0 font-bold uppercase">
      {[...children].map((char, index) => (
        <p key={index}>{char}</p>
      ))}
    </div>
  );
};

export default SectionTitle;
