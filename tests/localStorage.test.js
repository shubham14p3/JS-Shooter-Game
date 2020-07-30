import LocalStorage from '../src/Objects/localStorage';

it('Saves content to local storage', () => {
  LocalStorage.saveLocalStorage('This is a test!');
  expect(JSON.parse(localStorage.getItem('score'))).toBe('This is a test!');
});

it('Reads content from local storage', () => {
  localStorage.setItem('score', JSON.stringify('This is a test!'));
  expect(LocalStorage.readLocalStorage()).toBe('This is a test!');
});

it('Clears all content from local storage', () => {
  localStorage.setItem('score', JSON.stringify('This is a test!'));
  LocalStorage.clearLocalStorage();
  expect(JSON.parse(localStorage.getItem('score'))).toBe(null);
});
