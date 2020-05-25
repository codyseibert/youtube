const baseUrl = 'http://sandipbgt.com/theastrologer/api';

export const getSigns = () => {
  return fetch(`${baseUrl}/sunsigns`).then((response) =>
    response.json()
  );
};

export const getHoroscope = (sign, timeframe) => {
  return fetch(`${baseUrl}/horoscope/${sign}/${timeframe}`)
    .then((response) => response.json())
    .then(({ horoscope }) => horoscope);
};
