import React from 'react';

import Link from 'next/link';
import Teams from '../Teams.js';
const HomePage = () => {
  return (
    <div className='font-bold uppercase items-center justify-center text-center flex flex-col gap-48'>
      {Teams.divisons.map((division: any) => {
        return (
          <div className='flex flex-col gap-4' key={division.id}>
            <h1 className='text-3xl'>{division.name}</h1>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
              {division.teams.map((team: any) => {
                return (
                  <div className=' mx-auto' key={team.id}>
                    <Link href={`/team/${team.id}`}>
                      <button className='bg-blue-500 p-4 rounded-lg'>
                        <h1 className='w-48'>{team.name}</h1>
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
