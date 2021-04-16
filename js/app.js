window.onload = () => {
    document.getElementById(`white`).hidden = true;
    document.getElementById(`cali`).hidden = true;

    document.getElementById(`white-rice-b`).addEventListener(`click`, () => {
        document.getElementById(`cali`).hidden = true;
        document.getElementById(`white`).hidden = false;
    });

    document.getElementById(`cali-rice-b`).addEventListener(`click`, () => {
        document.getElementById(`white`).hidden = true;
        document.getElementById(`cali`).hidden = false;
    });

    let input = document.querySelector(`input`);

    input.addEventListener(`input`, () => {
        let output = input.value;
        if(!document.getElementById(`white`).hidden){
            document.getElementById(`cups-rice-w`).textContent = input.value;
            document.getElementById(`cups-water-w`).textContent = input.value*2;
            document.getElementById(`tbsp-oil-w`).textContent = input.value;
        }
        if(!document.getElementById(`cali`).hidden){
            document.getElementById(`cups-rice-c`).textContent = input.value;
            document.getElementById(`cups-water-c`).textContent = input.value*1.6;
            document.getElementById(`tbsp-oil-c`).textContent = input.value/0.8;
        }

    }, false);

};
