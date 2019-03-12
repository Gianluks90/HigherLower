const message = document.querySelector(".message");
const score = document.querySelector(".score");
const button = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");

let curCardValue = 0;
let scoreValue = 0;
let deck = [];
const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suit = ["hearts", "diams", "clubs", "spades"];

for (let i = 0; i < button.length; ++i) {
    console.log(button[i]);
    button[i].addEventListener("click", playGame);
}

function toggleButtons() {
    button[0].classList.toggle("hideButton");
    button[1].classList.toggle("hideButton");
    button[2].classList.toggle("hideButton");
}

function playGame(e) {
    console.log(e.target);
    let temp = e.target.innerText;
    let myCard = drawCard();
    let win = false;
    console.log(temp);
    if (temp == "Start") {
        console.log("you clicked start");
        message.innerHTML = "Higher or Lower?";
        gameplay.innerHTML = "";
        makeCard(myCard);
        toggleButtons();
        return;
    }
    console.log(myCard);
    if (myCard.value == curCardValue) {
        win = "draw";
        message.innerHTML = "Draw";
    }
    else {
        if (temp == "Higher" && (myCard.value > curCardValue) || (temp == "Lower" && (myCard.value < curCardValue))) {
            scoreValue++;
            score.innerHTML = scoreValue;
            message.innerHTML = "Correct! Next?";
        }
        else {
            message.innerHTML = "Wrong! Gameover";
            toggleButtons();
            scoreValue = 0;
        }
    }
    makeCard(myCard);
}

function drawCard() {
    if (deck.length > 0) {
        let randomIndex = Math.floor(Math.random() * deck.length);
        let card = deck.splice(randomIndex, 1)[0];
        console.log(card);
        return card;
    }
    else {
        makeDeck();
        return drawCard();
    }
}

function makeDeck() {
    deck = [];
    for (let i = 0; i < suit.length; ++i) {
        for (let j = 0; j < rank.length; ++j) {
            let card = {};
            card.suit = suit[i];
            card.rank = rank[j];
            card.value = (j + 1);
            deck.push(card);
        }
    }
    console.log(deck);
}

function makeCard(card) {
    console.log(card);
    let html1 = card.rank + "<br>&" + card.suit + ";";
    let html2 = card.rank + "&" + card.suit + ";";
    let curCards = document.querySelectorAll(".card");

    let div = document.createElement("div");
    div.setAttribute("class", "card");
    div.style.left = (curCards.length * 25) + "px";
    curCardValue = card.value;
    if (card.suit == "hearts" || card.suit == "diams") {
        div.classList.add("red");
    }

    let span1 = document.createElement("span");
    span1.setAttribute("class", "tiny");
    span1.innerHTML = html2;
    div.appendChild(span1);

    let span2 = document.createElement("span");
    span2.setAttribute("class", "big");
    span2.innerHTML = html1;
    div.appendChild(span2);

    gameplay.appendChild(div);
}