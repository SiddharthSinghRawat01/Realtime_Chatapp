const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area')

do {
    name = prompt('please enter your name')
} while (!name);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scroll();

    socket.emit('message',msg)
}



function appendMessage(msg,type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}<h4/>
    <p>${msg.message}<p/>
    `

    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}

//Recive

socket.on('message', (msg)=>{
    appendMessage(msg,'incomming')
    scroll()
})

function scroll() {
    messagearea.scrollTop = messagearea.scrollHeight
}