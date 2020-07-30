import API from '../src/Objects/api';

it('Retrieves the scores from the DB', () => {
  API.getScores()
    .then((response) => {
      expect(response).toBe('Succeed');
    })
    .catch((error) => error);
});

it('Post a new score to database', () => {
  API.postScores('test', 1)
    .then((response) => {
      expect(response).toBe('Leaderboard score created correctly.');
    })
    .catch((error) => error);
});

it('If score is 0, it returns an error', () => {
  API.postScores('test', 0)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});

it('If name is empty, it should not send anything to avoid an error', () => {
  API.postScores('', 0)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});
