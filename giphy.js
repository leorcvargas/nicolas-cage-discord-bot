const axios = require('axios').default;

const api = axios.create({ baseURL: 'https://api.giphy.com/v1' });

const getRandomGIF = (term) => api.get('/gifs/search', {
  params: {
    api_key: process.env.GIPHY_API_KEY,
    q: term,
  },
}).then(({ data }) => {
  const randomIndex = Math.floor(Math.random() * 20) + 1;

  return data.data[randomIndex].url;
})
  .catch((error) => error);

module.exports = {
  getRandomGIF,
};
