import copy from '.';

const str = JSON.stringify;

describe('Copy', () => {
  test('Everything works', async () => {
    const object1 = { text: 'hello world' };
    const object2 = {};
    copy(object2, object1);
    expect(str(object2)).toBe(str(object1));
  });
});
