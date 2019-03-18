function bind(method, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	return function() {
		var a = args.concat(Array.prototype.slice.call(arguments, 0));
		return method.apply(context, a);
	}
}

var guitar = document.querySelector('.guitar');
var priceGuitar = document.querySelector('.price-guitar');

var product1 = {
	name: 'Fender Stratocaster',
	price: 1000
}

var product2 = {
	name: 'Gibson SG',
	price: 750
}

function sendMessageAboutBuying(buyer, cash) {
	if (this.price > cash) {
		alert(`${buyer}, у Вас не достаточно средств для покупки ${this.name}`);
	} else {
		alert(`${buyer}, поздравляем вас с приобретением ${this.name}`);
	}
}

guitar.addEventListener('change', function() {
	if (guitar.value == 'Fender Stratocaster') {
		priceGuitar.innerText = '$' + product1.price;
	} else {
		priceGuitar.innerText = '$' + product2.price;
	}
});

var btn = document.querySelector('.buy');
btn.addEventListener('click', function() {
	var product;
	if (guitar.value == 'Fender Stratocaster') {
		product = product1;
	} else {
		product = product2;
	}

	//привязка функции send к контексту
	var sendMessage = bind(sendMessageAboutBuying, product);

	var buyerName = document.querySelector('.buyerName').value,
		cash = document.querySelector('.cash').value;
	sendMessage(buyerName, cash);
});