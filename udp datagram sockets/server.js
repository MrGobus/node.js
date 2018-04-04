const dgram = require("dgram")

class Server {

	constructor(param) {

		this.socket = dgram.createSocket("udp4")

		this.socket.on("error", (error)=>{
			console.log(`server error:\m${err.stack}`)
		})

		this.socket.on("message", (msg, rinfo)=>{
			console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
			this.socket.send(Buffer.from("bip bip bip... hello, it's server"), rinfo.port, rinfo.address)
		})

		this.socket.on("listening", ()=>{
			const address = this.socket.address()
			console.log(`server listening on ${address.address}:${address.port}`)
		})

		this.socket.bind(param.port, param.address)
	}

}

let server = new Server({
	address: "0.0.0.0",
	port: 6666
})
