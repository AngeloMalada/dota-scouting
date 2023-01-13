import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  id: number;
  date: number;
  lobby: string;
};

type PlayerData = {
  id: number;
  games: number;
  win: number;
  winPercentage: string;
  winrateAtPlayerLevel: string;
  winrateAgainstPlayer: string;
  image_url: string;
  proWinrate: string;
  Name: string;
  withWin: number;
  withGames: number;
  playerName: string;
  imp: number;
  messege: string;
};

async function getHeroes(id: number, date: number, lobby: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/stratz/?id=${id}&date=${date}&gamemode=${lobby}`,
  );
  return res.json();
}

const Player = ({ id, date, lobby }: Props) => {
  const [playerid, setPlayerId] = useState<any>(id);
  const [search, setSearch] = useState<any>(id);

  const QueryQlient = useQueryClient();

  const {
    data: heroes,
    isLoading,
    error,
  } = useQuery(['getHeroes', playerid, date, lobby], () =>
    getHeroes(playerid, date, lobby),
  );

  return (
    <>
      <div className='w-3/4 mt-10'>
        <form
          action=''
          className='flex flex-col items-center gap-4 min-h-[70px]'
        >
          <input
            className='border-2 border-black rounded-lg p-2 text-center w-3/4 '
            type='text'
            name='id'
            id='id'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className='border-2 bg-blue-500 text-white rounded-lg p-2'
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              setPlayerId(search);
            }}
          >
            Search
          </button>
        </form>
        {heroes ? (
          <div className='w-3/4 mx-auto'>
            <div className='mt-10'>
              <Link
                href={`https://www.opendota.com/players/${playerid}/matches`}
              >
                <h1 className='text-center uppercase font-bold min-h-[70px] break-all'>
                  {heroes[0]?.playerName}
                </h1>
              </Link>
            </div>
            {heroes[0]?.messege === 'No data' ? (
              <div className='flex flex-col gap-4 mt-10 w-full '>
                <h1 className='text-center font-bold uppercase  flex mx-auto '>
                  Player didnt play in period you selected or he has private
                  profile
                </h1>
              </div>
            ) : (
              <div className='flex flex-col gap-4 mt-10   '>
                {heroes.map((hero: any) => (
                  <Link
                    href={`https://www.opendota.com/heroes/${hero.id}/matchups`}
                    key={hero.id}
                    className=''
                  >
                    <div className='flex flex-col items-center shadow-lg text-xs lg:text-lg rounded-lg p-4  gap-2 font-semibold'>
                      <h1 className='min-h-[70px] font-bold text-center'>
                        {hero.Name}
                      </h1>
                      <img
                        src={hero.image_url}
                        alt=''
                        className='w-24 rounded-lg '
                      />
                      <h1>Games: {hero.games}</h1>
                      <h1>Wins: {hero.win}</h1>
                      <h1>IMP: {hero.imp}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className='
          '
          >
            <img
              src='/rings.svg'
              className='w-48 aspect-square mt-40 mx-auto'
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Player;
