import React from 'react';
import TimePeriod from '../../TimePeriod';
import Lobbies from '../../Lobbies';

import Teams from '../../Teams';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Player from '../../components/Player';

const TeamPage = (id: any) => {
  const [date, setDate] = React.useState<number>(
    Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000,
  );
  const [lobby, setLobby] = React.useState<string>('7,1,0');
  const [customDays, setCustomDays] = React.useState<number>(0);
  const [games, setGames] = React.useState<any>(1);
  const [searchGames, setSearchGames] = React.useState<any>(0);
  const [filters, setFilters] = React.useState<boolean>(false);

  return (
    <div>
      {filters ? (
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4 font-bold uppercase'>
            <div className='flex justify-center items-center'>
              <button
                className='bg-[#252525] text-white p-4 rounded-lg'
                onClick={() => setFilters(false)}
              >
                Hide filters
              </button>
            </div>
            <h1 className='text-center font-bold uppercase'>Time period</h1>
            <div className='flex flex-col lg:flex-row gap-4 mx-auto items-center justify-center'>
              {TimePeriod.map((time: any) => {
                return (
                  <button
                    key={time.id}
                    className='bg-[#252525] text-white p-4 rounded-lg'
                    onClick={() => {
                      time.formula === 0
                        ? setDate(0)
                        : setDate(
                            Math.floor(new Date().getTime() / 1000.0) -
                              time.formula,
                          );
                    }}
                  >
                    {time.name}
                  </button>
                );
              })}
              <form
                action=''
                className='flex flex-col lg:flex-row gap-4 mx-auto lg:mx-0'
              >
                <input
                  type='number'
                  className='bg-[#252525] text-white p-4 rounded-lg  placeholder-white text-center'
                  placeholder='Custom number of days'
                  onChange={(e) => setCustomDays(Number(e.target.value))}
                />
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    setDate(
                      Math.floor(new Date().getTime() / 1000.0) -
                        86400 * customDays,
                    );
                  }}
                  className='bg-[#252525] text-white p-4 rounded-lg 
        
      '
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className='flex flex-col gap-4 font-bold uppercase'>
            <h1 className='text-center font-bold uppercase'>Lobby type</h1>

            <div className='flex flex-col lg:flex-row gap-4 mx-auto items-center justify-center'>
              {Lobbies.map((lobbies: any) => {
                return (
                  <div>
                    <button
                      key={lobbies.id}
                      className='bg-[#252525] text-white p-4 rounded-lg'
                      onClick={() => setLobby(lobbies.value)}
                    >
                      {lobbies.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col w-full mx-auto justify-center items-center my-4 font-bold uppercase gap-4 mb-10'>
            <h1>Min games on hero</h1>
            <form
              className='flex flex-col lg:flex-row gap-4 w-3/4 lg:w-full items-center justify-center'
              action=''
            >
              <input
                type='number'
                value={games}
                className='bg-[#252525] text-white p-4 rounded-lg  placeholder-black text-center'
                placeholder='Min games on hero'
                onChange={(e) => setGames(Number(e.target.value))}
              />
              <button
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  setSearchGames(games);
                }}
                className='bg-[#252525] text-white p-4 rounded-lg'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center uppercase font-bold'>
          <button
            className='bg-[#252525] text-white p-4 rounded-lg'
            onClick={() => setFilters(true)}
          >
            Filters
          </button>
        </div>
      )}

      <div className=''>
        {Teams.divisons.map((division: any) => {
          return (
            <div key={division.id}>
              {division.teams.map((team: any) => {
                if (Number(team.id === Number(id.id))) {
                  return (
                    <div
                      className='flex flex-col gap-10 lg:flex-row justify-between px-2 lg:px-10 items-center lg:items-baseline'
                      key={team.id}
                    >
                      {team.players.map((player: any) => {
                        return (
                          <Player
                            key={player.id}
                            id={player.accountID}
                            date={date}
                            lobby={lobby}
                            games={searchGames}
                          />
                        );
                      })}
                    </div>
                  );
                }
              })}
            </div>
          );
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
