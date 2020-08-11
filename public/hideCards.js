//Hide recipe cards if there are none
let cardInfo = document.querySelector('h1 a')
let cards = document.getElementsByClassName('cards')

if (cardInfo.innerHTML === "") {
    cards[0].style.visibility = 'hidden'
    console.log("BUCETA")

}
