import Navbar from './Navbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children }: any) => {
  return (
    <div className='min-h-screen bg-[#151515] px-10 text-white pb-20'>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
