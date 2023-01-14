const TimePeriod = [
  {
    id: 1,
    name: 'All time',
    formula: 0,
  },
  {
    id: 2,
    name: 'Last year',
    formula: 31536000,
  },
  {
    id: 3,
    name: 'Last 3 months',
    formula: 3 * 2592000,
  },
  {
    id: 4,
    name: 'Last month',
    formula: 2592000,
  },
  {
    id: 5,
    name: 'Last week',
    formula: 604800,
  },
  {
    id: 6,
    name: 'Last 3 days',
    formula: 3 * 86400,
  },
  {
    id: 7,
    name: 'Last day',
    formula: 86400,
  },
];

export default TimePeriod;
