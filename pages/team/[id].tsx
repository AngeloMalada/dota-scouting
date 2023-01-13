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
 const [games,setGames] = React.useState<any>(0)
 const [searchGames,setSearchGames] = React.useState<any>(0)

  return (
    <div>
      {/* create input and a button that sets id to input value */}
      <h1 className='text-center font-bold uppercase'>Time period</h1>
      <div className='mx-auto w-4/5 lg:w-full flex flex-col lg:flex-row justify-center gap-4 mt-4 font-bold uppercase px-4'>
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
        <form
          action=''
          className='flex flex-col lg:flex-row gap-4 mx-auto lg:mx-0'
        >
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
      <div className='flex flex-col w-full mx-auto justify-center items-center my-4 font-bold uppercase '>
        <h1 className='my-2'>Lobby type</h1>
        <div className='flex flex-col lg:flex-row gap-4 w-3/4 lg:w-full items-center justify-center'>
          <button
            className='bg-blue-500 p-4 rounded-lg w-full lg:w-fit'
            onClick={() => setLobby('7,1,0')}
          >
            All
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg w-full lg:w-fit'
            onClick={() => setLobby('0')}
          >
            Unranked
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg w-full lg:w-fit'
            onClick={() => setLobby('7')}
          >
            Ranked
          </button>
          <button
            className='bg-blue-500 p-4 rounded-lg w-full lg:w-fit'
            onClick={() => setLobby('1')}
          >
            Practice
          </button>
        </div>
      </div>
      <div className='flex flex-col w-full mx-auto justify-center items-center my-4 font-bold uppercase gap-4 mb-10'>

        <h1>Min games on hero</h1>
        <form
        className='flex flex-col lg:flex-row gap-4 w-3/4 lg:w-full items-center justify-center' 
        action="">
          <input
            type="number"
            value={games}
            className="bg-blue-500 p-4 rounded-lg text-black placeholder-black text-center"
            placeholder="Min games on hero"
            onChange={(e) => setGames(Number(e.target.value))}
           
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setSearchGames(
                games)
            }}
            className="bg-blue-500 p-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <div className='flex flex-col gap-10 lg:flex-row justify-between px-2 lg:px-10 items-center lg:items-baseline'>
        {Teams.map((team: any) => {
          if (Number(team.id) === Number(id.id)) {
            return (
              <>
                <Player id={team.player1} date={date} lobby={lobby} games={searchGames}/>
                <Player id={team.player2} date={date} lobby={lobby} games={searchGames}/>
                <Player id={team.player3} date={date} lobby={lobby} games={searchGames}/>
                <Player id={team.player4} date={date} lobby={lobby} games={searchGames}/>
                <Player id={team.player5} date={date} lobby={lobby} games={searchGames}/>
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
