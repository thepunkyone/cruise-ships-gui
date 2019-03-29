class Controller {
    constructor() {

    }
    initialiseSea() {
        let counter = 1;
        function changeBackground() {
            const viewport = document.querySelector('#viewport');
            if (counter % 2 === 0) {
                viewport.style.backgroundImage = `url("images/water1.png")`;
                counter++;
            } else {
                viewport.style.backgroundImage = `url("images/water0.png")`;
                counter++;
            }
        }
        setInterval(changeBackground, 1000);
    }
}