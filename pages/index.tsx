import React from 'react';

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-10 gap-10'>
      <Link href={'/team/1'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 1</button>
      </Link>
      <Link href={'/team/2'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 2</button>
      </Link>
      <Link href={'/team/21243123'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 3</button>
      </Link>
      <Link href={'/team/21243123'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 4</button>
      </Link>
      <Link href={'/team/21243123'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 5</button>
      </Link>
      <Link href={'/team/21243123'}>
        <button className='bg-blue-500 rounded-xl p-10'>Team 6</button>
      </Link>
    </div>
  );
};

export default HomePage;
