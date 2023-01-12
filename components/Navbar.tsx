import Link from 'next/link';
import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className='p-10 flex flex-row justify-between'>
      <div>
        <Link href={'/'}>
          <h1 className='uppercase font-bold text-2xl'>RD2L</h1>
        </Link>
      </div>
      <div className='flex flex-row gap-4 font-bold uppercase'>
        <Link href={'/'}>
          <span>Home</span>
        </Link>
        {/* <Link href={'/'}>
          <span>Home</span>
        </Link>
        <Link href={'/'}>
          <span>Home</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
