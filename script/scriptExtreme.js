const canvas = document.getElementById('cartesian-plane')
const ctx = canvas.getContext('2d')
const resultDiv = document.getElementById('result')
const newGameBtn = document.getElementById('new-game')
const resultModal = document.getElementById('result-modal')
const modalMessage = document.getElementById('modal-message')
const closeModalBtn = document.getElementById('close-modal')

let targetX, targetY // Coordenadas-alvo

// Função para desenhar o plano cartesiano com marcas de referência
function drawCartesianPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const unitSize = 40 // Cada unidade é 40px
    const halfWidth = canvas.width / 2
    const halfHeight = canvas.height / 2

    const numUnitsX = Math.floor(canvas.width / (2 * unitSize)) // Unidades no eixo X
    const numUnitsY = Math.floor(canvas.height / (2 * unitSize)) // Unidades no eixo Y

    // Desenhar as linhas de grade
    ctx.strokeStyle = '#808080'
    ctx.lineWidth = 1
    for (let x = 0; x <= canvas.width; x += unitSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += unitSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
    }

    // Desenhar os eixos X e Y
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, halfHeight) // Eixo X
    ctx.lineTo(canvas.width, halfHeight)
    ctx.moveTo(halfWidth, 0) // Eixo Y
    ctx.lineTo(halfWidth, canvas.height)
    ctx.stroke()

    // Adicionar números nos eixos
    ctx.font = '14px Arial'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Números no eixo X
    for (let x = -numUnitsX; x <= numUnitsX; x++) {
        if (x !== 0) { // Não desenhar o zero no eixo X
            ctx.fillText(x, halfWidth + x * unitSize, halfHeight - 15)
        }
    }
    // Números no eixo Y
    for (let y = -numUnitsY; y <= numUnitsY; y++) {
        if (y !== 0) { // Não desenhar o zero no eixo Y
            ctx.fillText(y, halfWidth - 15, halfHeight - y * unitSize)
        }
    }
}

// Função para gerar coordenadas aleatórias
function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 20) - 9 // Entre -9 e 9
    const y = Math.floor(Math.random() * 20) - 9 // Entre -9 e 9
    return { x, y }
}

// Função para iniciar um novo jogo
function startNewGame() {
    drawCartesianPlane()
    const coordinates = generateRandomCoordinates()
    targetX = coordinates.x
    targetY = coordinates.y
    // coordinateDisplay.textContent = `Coordenada alvo: (${targetX}, ${targetY})` // Removido
}

// Função para verificar se o clique está correto
function checkClick(event) {
    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    const adjustedX = Math.round((clickX - canvas.width / 2) / 40) // Cada unidade 40px
    const adjustedY = Math.round((canvas.height / 2 - clickY) / 40)

    if (adjustedX === targetX && adjustedY === targetY) {
        showModal("Acertou! A coordenada é correta.✔️")
        startNewGame() // Atualiza a coordenada após o acerto
    } else {
        showModal(`Errou!❌ Você clicou em (${adjustedX}, ${adjustedY}).`)
    }
}

// Função para exibir o modal com a mensagem
function showModal(message) {
    modalMessage.textContent = message
    resultModal.style.display = 'block'
}

// Função para fechar o modal
function closeModal() {
    resultModal.style.display = 'none'
}

// Adicionar eventos
canvas.addEventListener('click', checkClick)
newGameBtn.addEventListener('click', startNewGame)
closeModalBtn.addEventListener('click', closeModal)

// Inicializar o jogo
startNewGame()
