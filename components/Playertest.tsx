"use client";

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  id: number;
};

const Player = (id: Props) => {
  const [heroes, setHeroes] = useState<any>([]);
  const [player, setPlayer] = useState<any>([]);
  const [playerHeroes, setPlayerHeroes] = useState<any>([]);

  useEffect(() => {
    fetch(`https://api.opendota.com/api/players/${id.id}`)
      .then((res) => res.json())
      .then((data) => setPlayer(data));

    fetch(`https://api.opendota.com/api/players/${id.id}/heroes`)
      .then((res) => res.json())
      .then((data) => setPlayerHeroes(data));

    fetch(`https://api.opendota.com/api/heroes`)
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, [id]);

  return (
    <div>
      {heroes && player && playerHeroes ? (
        <div className="flex flex-col gap-8 items-center">
          {/* username */}
          <h1>{player?.profile?.personaname}</h1>
          {/* mapirani heroji za username */}
          {playerHeroes.slice(0, 10).map((hero: any) => (
            <div className="w-full" key={hero.hero_id}>
              {/* mapirane slike heroja koje odgovaraju id_heroja u api sa listom heroja i  id_heroja u api sa slikama */}
              {heroes.map((hero2: any) => (
                <div className="" key={hero2.id}>
                  {Number(hero.hero_id) === hero2.id && (
                    <div className="flex flex-row  justify-between shadow-lg p-2 rounded-xl items-center py-8">
                      <span className="break-all font-bold uppercase p-4">
                        {hero2.localized_name}
                      </span>
                      <Image
                        width={100}
                        height={100}
                        src={`http://cdn.dota2.com/apps/dota2/images/heroes/${hero2.name.replace(
                          "npc_dota_hero_",
                          ""
                        )}_lg.png`}
                        className="w-16 object-center object-cover"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <img src="/rings.svg" className="w-48" alt="" />
      )}
    </div>
  );
};

export default Player;
