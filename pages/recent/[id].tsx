//currently this page is not getting used so it is not updated to new api

import React, { useEffect, useState } from 'react';

type Props = {};
type Match = {
  hero_id: number;
};
type Matches = Match[];
const RecentMatches = (props: Props) => {
  const [playerid, setPlayerId] = useState<number>(72407726);
  const [player, setPlayer] = useState<any>([]);
  const [playerHeroes, setPlayerHeroes] = useState<Match[]>([]);
  const [heroes, setHeroes] = useState<any>([]);
  const [group, setGroup] = useState<any>([]);

  useEffect(() => {
    fetch(`https://api.opendota.com/api/players/${playerid}`)
      .then((res) => res.json())
      .then((data) => setPlayer(data));

    fetch(`https://api.opendota.com/api/players/${playerid}/recentMatches`)
      .then((res) => res.json())
      .then((data) => setPlayerHeroes(data));

    fetch(`http://localhost:8080/heroes`)
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);
  const groupBy = (array: Matches, key: string) => {
    return array.reduce((result: any, currentValue: any) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue,
      );

      return result;
    }, {});
  };

  console.log(playerHeroes[2]?.hero_id);
  console.log(groupBy(playerHeroes, 'hero_id'));

  return (
    <>
      <div>
        {/* map the groupBy */}
        {Object.keys(groupBy(playerHeroes, 'hero_id'))
          .sort(
            //sort by the length of the array
            (a, b) =>
              groupBy(playerHeroes, 'hero_id')[b].length -
              groupBy(playerHeroes, 'hero_id')[a].length,
          )
          .map((key) => (
            <div className='flex flex-col items-center w-full' key={key}>
              {heroes.map((hero: any) => (
                <div
                  className='w-full flex flex-col items-center'
                  key={hero.id}
                >
                  {Number(key) === hero.hero_id && (
                    <div className='flex   shadow-lg p-10 rounded-xl items-center  gap-4 w-[50%]'>
                      <div className='flex flex-row w-full justify-between items-center'>
                        <div className=' font-bold uppercase p-4 px-10 flex flex-row gap-10'>
                          <p>
                            {groupBy(playerHeroes, 'hero_id')[key].length} games
                          </p>
                          {hero.localized_name}
                        </div>
                        <img
                          src={hero.image_url}
                          alt={hero.localized_name}
                          className='w-48 rounded-xl object-center object-cover'
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default RecentMatches;
