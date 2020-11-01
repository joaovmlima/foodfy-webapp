//Funcionamento dos botões de expandir detalhes das receitas
const buttonIngredient = document.querySelector('#ingredients #buttonIngredients')
const buttonPrepareMethod = document.querySelector('#prepareMethod #buttonMethod')
const buttonAditionalInfo = document.querySelector('#aditionalInfo button')

function changeButton(buttonId) {
  if (document.getElementById(buttonId).innerHTML === 'ESCONDER') {
    document.getElementById(buttonId).innerHTML = 'MOSTRAR'
  } else {
    document.getElementById(buttonId).innerHTML = 'ESCONDER'
  }
}

if (buttonIngredient != null) {
  buttonIngredient.addEventListener('click', function () {
    document.querySelector('#ingredients ul').classList.toggle('hide')

    changeButton('buttonIngredients')
  })
}

if (buttonPrepareMethod != null) {
  buttonPrepareMethod.addEventListener('click', function () {
    document.querySelector('#prepareMethod ul').classList.toggle('hide')

    changeButton('buttonMethod')
  })
}

if (buttonAditionalInfo != null) {
  buttonAditionalInfo.addEventListener('click', function () {
    document.querySelector('#aditionalInfo p').classList.toggle('hide')

    changeButton('buttonAditional')
  })
}

//Fields dinamicos dos ingredientes
const addIngredient = document.querySelector('.addIngredient')

if (addIngredient != null) {
  addIngredient.addEventListener('click', function () {
    var input = document.createElement('INPUT')
    document.getElementById('ingredients').appendChild(input).setAttribute('name', 'ingredients')
  })
}

//Fields dinamicos dos metodos de preparo
const addMethod = document.querySelector('.addMethod')

if (addMethod != null) {
  addMethod.addEventListener('click', function () {
    var input = document.createElement('INPUT')
    document.getElementById('prepareMethod').appendChild(input).setAttribute('name', 'preparation')
  })
}

//Confirmação para deletar uma receita
const deleteForm = document.getElementById('deleteForm')

if (deleteForm != null) {
  deleteForm.addEventListener('submit', () => {
    confirmation = confirm('Deseja excluir a receita?')
    if (!confirmation) {
      event.preventDefault()
    }
  })
}

//Esconde os cards se receita se não houver receita cadastrada
let cardInfo = document.querySelector('h1 a')
let cards = document.getElementsByClassName('cards')

if (cardInfo != null) {
  if (cardInfo.innerHTML === '') {
    cards[0].style.visibility = 'hidden'
  }
}

//Upload de fotos

const PhotosUpload = {
  input: '',
  preview: document.querySelector('#img-preview'),
  uploadLimit: 5,
  files: [],

  handleFileInput(event) {
    const { files: fileList } = event.target
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(div)
      }
      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    const photosDiv = []
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == 'photo') photosDiv.push(item)
    })

    const totalPhotos = fileList.length + photosDiv.length
    if (totalPhotos > uploadLimit) {
      alert('Você atingiu o limite máximo de fotos')
      event.preventDefault()
      return true
    }

    return false
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file))

    return dataTransfer.files
  },

  getContainer(image) {
    const div = document.createElement('div')

    div.classList.add('photo')
    div.onclick = PhotosUpload.removePhoto
    div.appendChild(image)
    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },

  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = 'close'
    return button
  },

  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
    photoDiv.remove()
  }
}
