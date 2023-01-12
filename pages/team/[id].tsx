import React from 'react';

import Teams from '../../Teams';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Player from '../../components/Player';

const TeamPage = (id: any) => {
  const [date, setDate] = React.useState<number>(
    Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000,
  );

  return (
    <div>
      {/* create input and a button that sets id to input value */}

      <div className='mx-auto w-full flex flex-row justify-center gap-4 mt-4 font-bold uppercase'>
        <h1 className='bg-blue-500 p-4 rounded-lg' onClick={() => setDate(0)}>
          All time
        </h1>
        <h1
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 31536000)
          }
        >
          Last year
        </h1>
        <h1
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000)
          }
        >
          Last 3 months
        </h1>
        <h1
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 3 * 2592000)
          }
        >
          Last month
        </h1>
        <h1
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 604800)
          }
        >
          Last Week
        </h1>
        <h1
          className='bg-blue-500 p-4 rounded-lg'
          onClick={() =>
            setDate(Math.floor(new Date().getTime() / 1000.0) - 259200)
          }
        >
          Last 3 days
        </h1>
      </div>
      <div className='flex flex-row justify-between px-2 lg:px-10'>
        {Teams.map((team: any) => {
          if (Number(team.id) === Number(id.id)) {
            return (
              <>
                <Player id={team.player1} date={date} />
                <Player id={team.player2} date={date} />
                <Player id={team.player3} date={date} />
                <Player id={team.player4} date={date} />
                <Player id={team.player5} date={date} />
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
