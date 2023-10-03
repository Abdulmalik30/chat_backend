const socket = io('ws://localhost:3500/socket.io')

socket.addEventListener('open', () => {
console.log('connected to web socket')
})