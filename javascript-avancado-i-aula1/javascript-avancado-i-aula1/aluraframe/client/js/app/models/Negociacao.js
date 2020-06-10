//Convenção javascript: todo arquivo de classe deve começar com letra maiúscula

class Negociacao {

	constructor(data, quantidade, valor) {
		// '_' --> convenção que essa propriedade só pode ser acessada pelos próprios métodos da classe! (atributo privado)
		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this);	// faz com que as propriedades não sejam alteradas!
	}

	get data() {
		return new Date(this._data.getTime());
	}

	get quantidade() {
		return this._quantidade;
	}

	get valor() {
		return this._valor;
	}

	get volume() {
		return this._quantidade * this._valor;
	}
}