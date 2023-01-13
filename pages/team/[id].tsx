import React from 'react';

import Teams from '../../Teams';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Player from '../../components/Player';

const TeamPage = (id: any) => {
  const [date, setDate] = React.useState<number>(
    Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000,
  );
  const [lobby, setLobby] = React.useState<string>('7,1,0');
  const [customDays, setCustomDays] = React.useState<number>(0);
  const [searchDays, setSearchDays] = React.useState<number>(0);

  return (
    <div>
      {/* create input and a button that sets id to input value */}
      <h1 className='text-center font-bold uppercase'>Time period</h1>
      <div className='mx-auto w-full flex flex-row justify-center gap-4 mt-4 font-bold uppercase'>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() => setDate(0)}
        >
          All time
        </button>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 31536000)
          }
        >
          Last year
        </button>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000)
          }
        >
          Last 3 months
        </button>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000)
          }
        >
          Last month
        </button>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 604800)
          }
        >
          Last Week
        </button>
        <button
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 259200)
          }
        >
          Last 3 days
        </button>
        <form action='' className='flex flex-row gap-4'>
          <input
            type='number'
            className='bg-blue-500 p-4 rounded-lg text-black placeholder-black'
            placeholder='Custom number of days'
            onChange={(e) => setCustomDays(Number(e.target.value))}
          />
          <button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              setDate(
                Math.floor(new Date().getTime() / 1000.0) - 259200 * customDays,
              );
            }}
            className='bg-blue-500 p-4 rounded-lg 
            
          '
          >
            Submit
          </button>
        </form>
      </div>
      <div className='flex flex-col w-full mx-auto justify-center items-center my-4 font-bold uppercase'>
        <h1 className='my-2'>Lobby type</h1>
        <div className='flex flex-row gap-4'>
          <button
            className='bg-blue-500 p-4 rounded-lg'
            onClick={() => setLobby('7,1,0')}
          >
            All
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg'
            onClick={() => setLobby('0')}
          >
            Unranked
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg'
            onClick={() => setLobby('7')}
          >
            Ranked
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg'
            onClick={() => setLobby('1')}
          >
            Practice
          </button>
        </div>
      </div>
      <div className='flex flex-row justify-between px-2 lg:px-10'>
        {Teams.map((team: any) => {
          if (Number(team.id) === Number(id.id)) {
            return (
              <>
                <Player id={team.player1} date={date} lobby={lobby} />
                <Player id={team.player2} date={date} lobby={lobby} />
                <Player id={team.player3} date={date} lobby={lobby} />
                <Player id={team.player4} date={date} lobby={lobby} />
                <Player id={team.player5} date={date} lobby={lobby} />
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

//get server side props to dynamically generate pages for each team
export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}

export default TeamPage;
