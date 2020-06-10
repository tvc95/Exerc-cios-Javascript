class ListaNegociacoes {

	constructor() {
		this._negociacoes = [];
	}


	addNegociacao(negociacao) {
		this._negociacoes.push(negociacao);
	}

	get negociacoes(){
		return [].concat(this._negociacoes);
	}

	esvazia() {
		this._negociacoes = [];
	}


}