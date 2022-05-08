window.onload = function () {
    const btnShowCapital = document.querySelector('#redirectListCapital');

    function redirectPage() {
        console.log(window.location.href);
    }

    btnShowCapital.addEventListener('click', redirectPage);
};
