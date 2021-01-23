import axios from 'axios';

import config from '../config';

const api = axios.create({ baseURL: 'https://api.giphy.com/v1' });

export const searchGIF = async (term) => {
  const { data } = api.get('/gifs/search', {
    params: {
      api_key: config.giphyApiKey,
      q: term,
    },
  });

  return data.data;
};

export const searchRandomGIF = async (term) => {
  const gifs = await searchGIF(term);
  const randomIndex = Math.floor(Math.random() * 20) + 1;

  return gifs[randomIndex];
};
