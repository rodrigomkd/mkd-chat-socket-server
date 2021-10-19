const socket = io()

//DOM
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener('click', function() {
    console.log("send event");
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('chat:typing', username.value);
});

socket.on('server:message', function (data) {
    output.innerHTML += 
        `<p>
            <strong>${data.username}: </strong>${data.message}
        </p>`;
});

socket.on('server:typing', function (data) {
    actions.innerHTML = 
        `<p>
            <em>${data} is typing a message...</em>
        </p>`;
});