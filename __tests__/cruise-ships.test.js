const Ship = require('../src/cruise-ships');

describe('Ship constructor', () => {
  let dover;
  let calais;
  let itinerary;
  let cruiseShip;
  const port = {
    addShip: jest.fn(),
    removeShip: jest.fn()
  };

  beforeEach(() => {
    dover = { name: 'Dover', ships: [], ...port };
    calais = { name: 'Calais', ships: [], ...port };
    itinerary = { ports: [dover, calais] };
    cruiseShip = new Ship(itinerary);
  });
  it('cruiseShip is an object', () => {
    expect(cruiseShip).toBeInstanceOf(Object);
  });
  it('cruiseShip has a currentPort property', () => {
    expect(cruiseShip.currentPort).toEqual(dover);
    expect(cruiseShip.previousPort).toBeFalsy();
  });
  it('cruiseShip is added to currentPort\'s ships', () => {
    expect(dover.addShip).toHaveBeenCalledWith(cruiseShip);
  });
  it('cruiseShip has a setSail method', () => {
    cruiseShip.setSail();
    expect(dover.removeShip).toHaveBeenCalledWith(cruiseShip);
    expect(cruiseShip.currentPort).toBeFalsy();
    expect(cruiseShip.previousPort).toEqual(dover);
  });
  it('cruiseShip has a dock method', () => {
    cruiseShip.setSail();
    cruiseShip.dock();
    expect(calais.addShip).toHaveBeenCalledWith(cruiseShip);
    expect(cruiseShip.currentPort).toBeTruthy();
    expect(cruiseShip.currentPort).toEqual(calais);
  });
  it('setSail method throws an error if itinerary has been completed', () => {
    cruiseShip.setSail();
    cruiseShip.dock();
    expect(() => cruiseShip.setSail()).toThrowError('Itinerary has been completed! Assign a new itinerary to continue.');
  });
});
