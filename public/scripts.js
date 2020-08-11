//Funcionamento dos botões de expandir detalhes das receitas

const buttonIngredient = document.querySelector('#ingredients #buttonIngredients')
const buttonPrepareMethod = document.querySelector('#prepareMethod #buttonMethod')
const buttonAditionalInfo = document.querySelector("#aditionalInfo button")

function changeButton(buttonId) {

    if (document.getElementById(buttonId).innerHTML === "ESCONDER") {
        document.getElementById(buttonId).innerHTML = "MOSTRAR"
    } else {
        document.getElementById(buttonId).innerHTML = "ESCONDER"
    }
}

if (buttonIngredient != null) {
    buttonIngredient.addEventListener("click", function () {
        document.querySelector('#ingredients ul')
            .classList.toggle('hide')

        changeButton("buttonIngredients")
    })
}

if (buttonPrepareMethod != null) {
    buttonPrepareMethod.addEventListener("click", function () {
        document.querySelector('#prepareMethod ul')
            .classList.toggle('hide')

        changeButton("buttonMethod")
    })
}

if (buttonAditionalInfo != null) {
    buttonAditionalInfo.addEventListener("click", function () {
        document.querySelector('#aditionalInfo p')
            .classList.toggle('hide')

        changeButton("buttonAditional")
    })
}

//Fields dinamicos dos ingredientes
const addIngredient = document.querySelector('.addIngredient')

addIngredient.addEventListener("click", function () {
    var input = document.createElement("INPUT");
    document.getElementById("ingredients").appendChild(input).setAttribute("name", "ingredients")
})

//Fields dinamicos dos metodos de preparo
const addMethod = document.querySelector('.addMethod')

addMethod.addEventListener("click", function () {
    var input = document.createElement("INPUT");
    document.getElementById("prepareMethod").appendChild(input).setAttribute("name", "preparation")
})

//Confirmação para deletar uma receita
const deleteForm = document.getElementById('deleteForm')

deleteForm.addEventListener('submit', () => {
    confirmation = confirm('Deseja excluir a receita?')
    if (!confirmation) {
        event.preventDefault()
    }
})