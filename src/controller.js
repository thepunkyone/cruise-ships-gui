(function exportController() {

  class Controller {
    constructor() {

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
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }

}());
