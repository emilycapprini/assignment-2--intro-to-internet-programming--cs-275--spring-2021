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
};
