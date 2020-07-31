import API from '../src/Objects/api';

it('If name is empty, it should not send anything to avoid an error', () => {
  API.postScores('', 0)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});
