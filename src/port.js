function Port(name) {
  this.name = name;
  this.ships = [];
}

Port.prototype.addShip = function (ship) {
  this.ships.push(ship);
};

Port.prototype.removeShip = function (ship) {
  if (this.ships.includes(ship)) {
    const i = this.ships.indexOf(ship);
  	this.ships.splice(i, 1);
  } else {
		throw new Error(`${ship.name} not found at the port!`);
	}
};

//Sam's method with a false positive:
// Port.prototype.removeShip = function removeShip(ship) {
//     this.ships.splice(this.ships.indexOf[ship], 1);
//   };

module.exports = Port;
