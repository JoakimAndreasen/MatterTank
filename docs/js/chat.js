
function setupChat(socket) {
    messageInput.addEventListener("keyup", function(event) {
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

    sendContainer.addEventListener('submit', e => {
        e.preventDefault()

        const message = messageInput.value
        if(message != ""){
            socket.emit('send-chat-message', message)
            appendMessage(message, "right")
            messageInput.value = ''
        }
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
}

export { setupChat }