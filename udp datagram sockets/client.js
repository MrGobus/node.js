const dgram = require("dgram")

class Client {

	constructor(param) {

		this.address = param.address
		this.port = param.port

		this.socket = dgram.createSocket("udp4")

		this.socket.on("message", (msg, rinfo)=>{
			console.log(`cliend got: ${msg} from ${rinfo.address}:${rinfo.port}`)
			client.close()
		})

		this.socket.on("listening", ()=>{
			const address = this.socket.address()
			console.log(`listening on ${address.address}:${address.port}`)
		})

	}

	say(msg, callback) {
		this.socket.send(Buffer.from(msg), this.port, this.address, callback)
	}

	close(callback) {
		this.socket.send(Buffer.from("disconnect"), this.port, this.address, ()=>{
			this.socket.close(callback)
		})
	}

}

let client = new Client({
	address: "127.0.0.1",
	port: 6666
})

client.say("hello, i am client")
