const ___place_limit_buy_order = async (_order) => {
	// async place buy order to a crypto exchange endpoint
	// In this example I used:
	// npm i ccxt
}

module.exports = function (io) {
	
	io.on('connection', socket => {

		console.log('New client connected')
	
		/** Place Limit Buy Order */
		socket.on('place_limit_buy_order', async function (__order) {
			try {
				let place_order = await ___place_limit_buy_order(__order)
				socket.emit('place_order_confirmation', {
					success: true,
					status_code: 200,
					status_message: 'LIMIT_BUY_ORDER_PLACED',
					info: place_order
				})
			} catch (err) {
				// handle errors here, emit other events/errors in socket.io or whatever framework you use
				const error = new Error(err)
				socket.emit('place_order_error', {
					success: false,
					status_code: error.status_code, // 409
					status_message: error.message, // INSUFFICIENT_FUNDS
					info: error
				})
			}
		})

	})

}