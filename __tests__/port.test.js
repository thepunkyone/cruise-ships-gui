const Port = require('../src/port');

describe('Port constructor', () => {
  const port = new Port('Dublin');
  const mockShip = { name: 'mockShip' };
  const mockShip2 = { name: 'mockShip2' };
  const unknownShip = { name: 'Unknown'};

  it('port is an object', () => {
    expect(port).toBeInstanceOf(Object);
  });
  it('port has a name property and ships array', () => {
    expect(port.name).toEqual('Dublin');
    expect(port.ships).toEqual([]);
  });

  it('addShip method', () => {
    port.addShip(mockShip);
    expect(port.ships).toContain(mockShip);
    port.addShip(mockShip2);
    expect(port.ships).toEqual([mockShip, mockShip2]);
  });

  it('removeShip method', () => {
    port.removeShip(mockShip2);
    expect(port.ships).toEqual([mockShip]);
		expect(port.ships).not.toContain(mockShip2);
			
    port.removeShip(mockShip);
    expect(port.ships).toEqual([]);
    expect(port.ships).not.toContain(mockShip);

    expect(() => port.removeShip(unknownShip)).toThrowError('Unknown not found at the port!');
  });
});
