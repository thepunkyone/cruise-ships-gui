const Itinerary = require('../src/itinerary');

describe('Itinerary constructor', () => {
  const dover = { name: 'Dover' };
  const calais = { name: 'Calais' };
  const itinerary = new Itinerary([dover, calais]);

  it('Itinerary has an array of ports', () => {
    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
