(function exportPort() {

  class Port {

    constructor(name) {
      this.name = name;
      this.ships = [];
    }

    addShip(ship) {
      this.ships.push(ship);
    }

    removeShip(ship) {
      if (this.ships.includes(ship)) {
        const i = this.ships.indexOf(ship);
        this.ships.splice(i, 1);
      } else {
        throw new Error(`${ship.name} not found at the port!`);
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }

}());
