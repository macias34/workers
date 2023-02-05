import Navbar from "../UI/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
