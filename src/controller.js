(function exportController() {

  const shipDiv = document.getElementById('ship');

  class Controller {
    constructor(ship) {
      this.ship = ship;
      document.getElementById('sailbutton').addEventListener('click', () => this.setSail());
    }

    initialiseSea() {
      let counter = 1;
      function changeBackground() {
        const viewport = document.querySelector('#viewport');
        if (counter % 2 === 0) {
          viewport.style.backgroundImage = 'url("images/water1.png")';
          counter += 1;
        } else {
          viewport.style.backgroundImage = 'url("images/water0.png")';
          counter += 1;
        }
      }
      window.setInterval(changeBackground, 1000);
    }

    renderPorts(ports) {
      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';
      let portsElementWidthCounter = 0;

      ports.forEach((port) => {
        const portDiv = document.createElement('div');
        portDiv.classList.add('port');
        portDiv.setAttribute('data-portIndex', ports.indexOf(port));
        portsElement.appendChild(portDiv);
        portsElementWidthCounter += 256;
        portsElement.style.width = portsElementWidthCounter + 'px';
      });
    }

    renderShip() {
      const currentPortIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort);
      const currentPortObject = document.querySelector(`.port[data-portIndex="${currentPortIndex}"]`);
      shipDiv.style.top = `${currentPortObject.offsetTop + 32}px`;
      shipDiv.style.left = `${currentPortObject.offsetLeft - 32}px`;
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortObject = document.querySelector(`.port[data-portIndex="${nextPortIndex}"]`);

      if (!nextPortObject) {
        return alert('End of the line!');
      }

      ship.setSail();

      const sailInterval = setInterval(() => {
        const shipLeftPosition = parseInt(shipDiv.style.left, 10);
        if (shipLeftPosition === (nextPortObject.offsetLeft - 32)) {
          ship.dock();
          clearInterval(sailInterval);
        }
        shipDiv.style.left = `${shipLeftPosition + 1}px`;
      }, 20);
    }

  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }

}());
