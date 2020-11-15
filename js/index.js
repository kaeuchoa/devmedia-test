document.addEventListener('DOMContentLoaded', function () {
    const httpService = new HttpService();
    const pageControler = new PageControler(httpService);
    pageControler.renderPage()

    document.querySelector('.js-toggle-btn').addEventListener('click', e => {
        document.getElementsByClassName('nav__items')[0].classList.add('active');
    });

    document.querySelector('.js-nav-mask').addEventListener('click', e => {
        document.getElementsByClassName('nav__items')[0].classList.remove('active');
    });
})


class PageControler {

    API_URL = 'https://5fb053b67edddb0016468422.mockapi.io/card';

    constructor(httpService) {
        this.httpService = httpService;
        this.dom_toggleBtn = document.querySelector('.js-toggle-btn');
        this.dom_navMask = document.querySelector('.js-nav-mask');

        this.cardList = [];
    }

    _initCardPlaceHolders() {
        this.cardListComponent = new CardListComponent();
        this.cardListComponent.render();
    }

    _getCardsList() {
        this.httpService.get(this.API_URL)
            .then(cards => {
                cards.map(card => this.cardList.push(new Card(card.title, card.text)));
                this.cardListComponent.render(this.cardList);
            });
    }
    
    renderPage() {
        this._initCardPlaceHolders();
        this._getCardsList();
    }
}


class CardListComponent {
    constructor() {
        this.dom_cardList = document.querySelector('.js-card-list');
    }

    render(cards) {
        if (cards && cards.length) {
            this.dom_cardList.innerHTML = '';
            cards.map(card => this.dom_cardList.innerHTML += this._createCard(card));
        } else {
            for (let i = 0; i < 3; i++) {
                this.dom_cardList.innerHTML += this._createCard();
            }
        }
    }

    _createCard(card) {
        if (typeof card === 'undefined') {
            return CardComponent.render('', '');
        }
        return CardComponent.render(card.title, card.text);
    }
}


class CardComponent {
    static render(title, text) {
        let isLoadingClass = '';
        if (title === '' && text === '') {
            isLoadingClass = 'card--loading';
        }
        return `
        <li class="card ${isLoadingClass}">
            <div class="card__header">
                <span class="card__header__holder"></span>
                <span class="card__header__text">${title}</span>
            </div>
            
            <div class="card__body">
                <span class="card__body__holder"></span>
                <p class="card__body__text">${text}</p>
            </div>
            
            <div class="card__footer">
                <button type="button">Acessar</button>
            </div>
        </li>`;
    }
}


class HttpService {
    get(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(function (err) {
                console.error('Failed retrieving information', err);
            });
    }
}

class Card {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}