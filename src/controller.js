(function exportController() {

  const shipDiv = document.getElementById('ship');

  class Controller {
    constructor(ship) {
      this.ship = ship;
      document.getElementById('sailbutton').addEventListener('click', () => this.setSail());
      this.renderDisplay();
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
        portDiv.className = 'port';
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

    renderMessage(message) {
      const messageDiv = document.createElement('div');
      messageDiv.id = 'message';
      messageDiv.innerHTML = message;

      document.getElementById('viewport').appendChild(messageDiv);
      window.setTimeout(() => {
        document.getElementById('viewport').removeChild(messageDiv);
      }, 2000);
    }

    renderDisplay() {
      const display = document.getElementById('display');
      const ship = this.ship;

      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const ports = ship.itinerary.ports;

      if (nextPortIndex < ports.length) {
        display.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const currentPort = document.createElement('p');
        currentPort.innerHTML = `Current port: ${ports[currentPortIndex].name}`;
        const nextPort = document.createElement('p');
        nextPort.innerHTML = `Next port: ${ports[nextPortIndex].name}`;
        fragment.appendChild(currentPort);
        fragment.appendChild(nextPort);
        display.appendChild(fragment);
      } else {
        display.innerHTML = '';
        const currentPort = document.createElement('p');
        currentPort.innerHTML = `Current port: ${ports[currentPortIndex].name}`;
        display.appendChild(currentPort);
      }
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortObject = document.querySelector(`.port[data-portIndex="${nextPortIndex}"]`);

      if (!nextPortObject) {
        this.renderMessage('End of the line!');
      }

      if (ship.currentPort !== null) {
        ship.setSail();
        this.renderMessage(`Now departing ${ship.itinerary.ports[nextPortIndex - 1].name}`);

        const sailInterval = setInterval(() => {
          const shipLeftPosition = parseInt(shipDiv.style.left, 10);
          if (shipLeftPosition === (nextPortObject.offsetLeft - 32)) {
            ship.dock();
            this.renderMessage(`Docking at ${ship.itinerary.ports[nextPortIndex].name}`);
            this.renderDisplay();
            clearInterval(sailInterval);
          }
          shipDiv.style.left = `${shipLeftPosition + 1}px`;
        }, 20);
      }
    }

  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }

}());
