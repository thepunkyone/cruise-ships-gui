(function exportShip() {

  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary;
      this.currentPort = this.itinerary.ports[0];
      this.previousPort = null;
      this.currentPort.addShip(this);
    }

    setSail() {
      const i = this.itinerary.ports.indexOf(this.currentPort);
      if (i >= this.itinerary.ports.length - 1) {
        throw new Error('Itinerary has been completed! Assign a new itinerary to continue.');
      }
      this.previousPort = this.itinerary.ports[i];
      this.currentPort.removeShip(this);
      this.currentPort = null;
    }

    dock() {
      const indexPreviousPort = this.itinerary.ports.indexOf(this.previousPort);
      const i = indexPreviousPort + 1;
      this.currentPort = this.itinerary.ports[i];
      this.currentPort.addShip(this);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }

}());
