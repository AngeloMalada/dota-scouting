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
const Player = ({ id, date, lobby }: Props) => {
  const [playerid, setPlayerId] = useState<any>(id);
  const [heroes, setHeroes] = useState<PlayerData[]>([]);
  const [search, setSearch] = useState<number>(id);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/stratz/?id=${playerid}&date=${date}&gamemode=${lobby}`,
    )
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, [search, date, lobby]);

  console.log(heroes);

  return (
    <>
      {heroes.length > 0 ? (
        heroes[0]?.messege === 'No data' ? (
          <div className='flex flex-col gap-4 mt-10'>
            <form action='' className='flex flex-col items-center gap-4'>
              <input
                className='border-2 border-black rounded-lg p-2 text-center'
                type='text'
                name='id'
                id='id'
                value={playerid}
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <button
                className='border-2 bg-blue-500 text-white rounded-lg p-2'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  setSearch(playerid);
                }}
              >
                Search
              </button>
            </form>
            <h1 className='text-center uppercase font-bold'>
              {heroes[0].playerName}
            </h1>
            <h1 className='text-center font-bold uppercase'>
              Player didnt play in period you selected or he has private profile
            </h1>
          </div>
        ) : (
          <div className='flex flex-col gap-4 mt-10'>
            <form action='' className='flex flex-col items-center gap-4'>
              <input
                className='border-2 border-black rounded-lg p-2 text-center'
                type='text'
                name='id'
                id='id'
                value={playerid}
                onChange={(e) => setPlayerId(e.target.value)}
              />
              <button
                className='border-2 bg-blue-500 text-white rounded-lg p-2'
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  setSearch(playerid);
                }}
              >
                Search
              </button>
            </form>
            <Link href={`https://www.opendota.com/players/${playerid}/matches`}>
              <h1 className='text-center uppercase font-bold'>
                {heroes[0]?.playerName}
              </h1>
            </Link>
            {heroes
              .sort(
                //sort by points
                (a: any, b: any) =>
                  b.games *
                    b.win *
                    ((Number(b.winrateAtPlayerLevel) +
                      Number(b.winrateAgainstPlayer)) /
                      2) *
                    Number(b.proWinrate) -
                  a.games *
                    a.win *
                    ((Number(a.winrateAtPlayerLevel) +
                      Number(a.winrateAgainstPlayer)) /
                      2) *
                    Number(a.proWinrate),
              )
              .map((hero) => (
                <Link
                  href={`https://www.opendota.com/heroes/${hero.id}/matchups`}
                >
                  <div
                    key={hero.id}
                    className='flex flex-col items-center shadow-lg rounded-lg p-4 gap-2 font-semibold'
                  >
                    <h1>{hero.Name}</h1>
                    <img
                      src={hero.image_url}
                      alt=''
                      className='w-24 rounded-lg'
                    />
                    <h1>Games: {hero.games}</h1>
                    <h1>Wins: {hero.win}</h1>
                    <h1>IMP: {hero.imp}</h1>
                    {/* <div className='flex flex-row gap-4'>
              {hero.heroRoles.map((heroRole: any) => (
                <h1>{heroRole}</h1>
                ))}
              </div> */}
                    {/* <h1>
                  Winrate:{' '}
                  {hero.winPercentage != 'No games played'
                    ? hero.winPercentage + '%'
                    : hero.winPercentage}
                </h1>

                <h1>
                  Points:{' '}
                  {(
                    (1000 *
                      (hero.games *
                        hero.win *
                        ((Number(hero.winrateAtPlayerLevel) +
                          Number(hero.winrateAgainstPlayer)) /
                          2) *
                        Number(hero.proWinrate))) /
                    (heroes[0].games *
                      heroes[0].win *
                      ((Number(heroes[0].winrateAtPlayerLevel) +
                        Number(heroes[0].winrateAgainstPlayer)) /
                        2) *
                      Number(heroes[0].proWinrate))
                  ).toFixed(0)}
                </h1> */}
                  </div>
                </Link>
              ))}
          </div>
        )
      ) : (
        <div className='flex flex-col gap-4 mt-10'>
          <form action='' className='flex flex-col items-center gap-4'>
            <input
              className='border-2 border-black rounded-lg p-2 text-center'
              type='text'
              name='id'
              id='id'
              value={playerid}
              onChange={(e) => setPlayerId(e.target.value)}
            />
            <button
              className='border-2 bg-blue-500 text-white rounded-lg p-2'
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                setSearch(playerid);
              }}
            >
              Search
            </button>
          </form>
          <img src='/rings.svg' className='w-48 aspect-square mt-40' />
        </div>
      )}
      {/* if data is loaded and empty array is returned display "profile is private" */}
    </>
  );
};

export default Player;
