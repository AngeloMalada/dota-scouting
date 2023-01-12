import React, { useEffect, useState } from 'react';
type Props = {
  id: number;
};
const Player = (id: Props) => {
  const [playerid, setPlayerId] = useState<number>(id.id);

  const [player, setPlayer] = useState<any>([]);
  const [playerHeroes, setPlayerHeroes] = useState<any>([]);
  const [heroes, setHeroes] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/player?id=${playerid}`)
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, [playerid]);

  return (
    <>
      <div className='flex flex-col gap-4 mt-10'>
        <h1 className='text-center uppercase font-bold'>
          {heroes[0]?.playerName}
        </h1>
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
          .map((hero: any) => (
            <div
              key={hero.id}
              className='flex flex-col items-center shadow-lg rounded-lg p-4 gap-2 font-semibold'
            >
              <h1>{hero.name}</h1>
              <img src={hero.image_url} alt='' className='w-24 rounded-lg' />
              <h1>Games: {hero.games}</h1>
              <h1>Wins: {hero.win}</h1>
              {/* <div className='flex flex-row gap-4'>
              {hero.heroRoles.map((heroRole: any) => (
                <h1>{heroRole}</h1>
              ))}
            </div> */}
              <h1>Winrate: {hero.winPercentage}%</h1>
              <h1>
                Points:{' '}
                {(
                  hero.games *
                  hero.win *
                  ((Number(hero.winrateAtPlayerLevel) +
                    Number(hero.winrateAgainstPlayer)) /
                    2) *
                  Number(hero.proWinrate)
                ).toFixed(0)}
              </h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default Player;
