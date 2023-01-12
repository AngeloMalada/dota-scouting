import React from 'react';

import Teams from '../../Teams';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Player from '../../components/Player';

const TeamPage = (id: any) => {
  console.log(Teams);
  console.log(Teams[0].id);
  console.log(id.id);
  return (
    <div>
      {/* create input and a button that sets id to input value */}

      <div className='flex flex-row justify-between px-2 lg:px-10'>
        {Teams.map((team: any) => {
          if (Number(team.id) === Number(id.id)) {
            return (
              <>
                <Player id={team.player1} />
                <Player id={team.player2} />
                <Player id={team.player3} />
                <Player id={team.player4} />
                <Player id={team.player5} />
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
