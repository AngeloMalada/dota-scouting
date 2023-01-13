import React from 'react';

import Link from 'next/link';
import Teams from '../Teams.js';
const HomePage = () => {
  return (
    <div className='flex flex-col items-center gap-40'>
      <div className='flex flex-col items-center gap-10'>
        <h1 className='uppercase font-bold text-3xl'>Division 1</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 items-center w-full px-20 place-items-center mx-auto gap-20'>
          {Teams.map((team: any) => {
            if (team.division === 'D1') {
              return (
                <Link href={`/team/${team.id}`}>
                  <button
                    className='
                  bg-blue-500 p-4 rounded-lg font-bold uppercase
                  '
                  >
                    <h1>{team.name}</h1>
                  </button>
                </Link>
              );
            }
          })}
        </div>
      </div>
      <div className='flex flex-col items-center gap-10'>
        <h1 className='uppercase font-bold text-3xl'>Division 2</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4  items-center w-full px-20 place-items-center mx-auto gap-20'>
          {Teams.map((team: any) => {
            if (team.division === 'D2') {
              return (
                <Link href={`/team/${team.id}`}>
                  <button
                    className='
                  bg-blue-500 p-4 rounded-lg font-bold uppercase
                  '
                  >
                    <h1>{team.name}</h1>
                  </button>
                </Link>
              );
            }
          })}
        </div>
      </div>
      <div className='flex flex-col items-center gap-10'>
        <h1 className='uppercase font-bold text-3xl'>Division 3</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4  items-center w-full px-20 place-items-center mx-auto gap-20'>
          {Teams.map((team: any) => {
            if (team.division === 'D3') {
              return (
                <Link href={`/team/${team.id}`}>
                  <button
                    className='
                    bg-blue-500 p-4 rounded-lg font-bold uppercase
                    '
                  >
                    <h1>{team.name}</h1>
                  </button>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
