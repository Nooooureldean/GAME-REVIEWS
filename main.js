
var deom = document.getElementById('row');
var MMORPG = document.getElementById('home-tab');
var shooter = document.getElementById('profile-tab');
var SAILING = document.getElementById('contact-tab');
var PERMADEATH = document.getElementById('PERMADEATH');
var SUPERHERO = document.getElementById('SUPERHERO');
var PIXEL = document.getElementById('PIXEL');
var lightBoxContainer = document.getElementById('lightBoxContainer');
var lightBox = document.getElementById('lightBox');
var home = document.getElementById('container');
var navbar = document.getElementById('navbar');

MMORPG.addEventListener('click', function () {
    getGame('mmorpg');
});
shooter.addEventListener('click', function () {
    getGame('shooter');
});
SAILING.addEventListener('click', function () {
    getGame('sailing');
});
PERMADEATH.addEventListener('click', function () {
    getGame('permadeath');
});
SUPERHERO.addEventListener('click', function () {
    getGame('superhero');
});
PIXEL.addEventListener('click', function () {
    getGame('pixel');
});

async function getGame(typeGame) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a095cde9b5msh3a58ff56f3cca50p1ab6a1jsna76f84ac850c',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const url = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${typeGame}`, options);
    const response = await url.json();
    display(response, deom);
}

async function getGamedetails(id) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a095cde9b5msh3a58ff56f3cca50p1ab6a1jsna76f84ac850c',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const url = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const API = await url.json();
    displayDetails(API, lightBox);
}

function display(response, deom) {
    let cartona = ``;
    for (let index = 0; index < response.length; index++) {
        cartona += `<div class="col-md-3">
            <div class="card game-card" data-id="${response[index].id}">
                <img src="${response[index].thumbnail}" class="card-img-top w-100" alt="">
                <div class="card-body">
                    <div class='d-flex justify-content-between'>
                        <div>
                            <h5 class="card-title">${response[index].title}</h5>
                        </div>
                        <div>
                           <span class="badge text-bg-primary p-2">Free</span>
                        </div>
                    </div>
                    <p class="card-text lead opacity-50">${response[index].short_description.split(' ').splice(0, 6).join(' ')}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div class='badge badge-color'><span class="badge badge-color">${response[index].genre}</span></div>
                    <div class='badge badge-color'><span class="badge badge-color">${response[index].platform}</span></div>
                </div>
            </div>
        </div>`;
    }
    deom.innerHTML = cartona;
    attachCardListeners();
}

function attachCardListeners() {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const gameId = this.getAttribute('data-id');
            lightBoxContainer.classList.replace('d-none', 'd-flex');
            home.classList.replace('d-flex', 'd-none');
            navbar.classList.add('d-none');
            getGamedetails(gameId);
        });
    });
}

function displayDetails(API, lightBox) {
    let cartona = `
        <div class="col-md-12 d-flex justify-content-center align-items-center">
            <div class="mx-5">
                <h2>Details Game</h2>
                <img src="${API.thumbnail}" alt="" class="">
            </div>
            <div>
                <h1>Title: ${API.title}</h1>
                <h3>Category: <span class="badge text-bg-primary p-2">${API.genre}</span></h3>
                <h3>Platform: <span class="badge text-bg-primary p-2">${API.platform}</span></h3>
                <h3>Status: <span class="badge text-bg-primary p-2">${API.status}</span></h3>
                <p>${API.description}</p>
                <a href="${API.game_url}" class="btn btn-outline-warning" target="_blank">Show Game</a>
                <button onclick="closeLightbox()" class="btn btn-outline-secondary">Close</button>
            </div>
        </div>
    `;
    lightBox.innerHTML = cartona;
}

function closeLightbox() {
    lightBoxContainer.classList.add('d-none');
    lightBoxContainer.classList.remove('d-flex');
    home.classList.replace('d-none', 'd-flex');
    navbar.classList.remove('d-none');
}

// Initialize with default category
getGame('shooter');
