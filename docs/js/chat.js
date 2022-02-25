const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


var input = document.getElementById("message-input");

input.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
      console.log('test')
    // event.preventDefault();
    // document.getElementById("send-button").click();
  }
});

appendMessage('You joined')

socket.on('chat-message', data => {
    appendMessage(`${data.username}: ${data.message}`, 'left')
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    appendMessage(message, "right")
    messageInput.value = ''
})

function appendMessage(message, side) {
    const messageElement = document.createElement('div')
    if (side === 'left') {
        messageElement.style.textAlign = 'left'
    } else if (side === 'right') {
        messageElement.style.textAlign = 'right'
    }
    messageElement.innerText = message
    messageContainer.append(messageElement)
}