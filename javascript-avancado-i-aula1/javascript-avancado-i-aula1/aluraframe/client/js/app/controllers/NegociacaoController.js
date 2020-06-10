class NegociacaoController {

	constructor() {
		// $ (jquery) -- alias de um método
		let $ = document.querySelector.bind(document);	//cria um alias de um metodo
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._negociacoesView = new NegociacoesView($('#negociacoesView'));
		this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, ['addNegociacao', 'esvazia']);

		this._mensagemView = new MensagemView($('#mensagemView'));
		this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto']);
		
	}

	adiciona(event) {
		event.preventDefault();
		
		this._listaNegociacoes.addNegociacao(this._criaNegociacao());

		this._mensagem.texto = 'Negociação adicionada com sucesso';
		this._limpaFormulario();
		
		// console.log(DateHelper.dataParaTexto(negociacao.data));
		// console.log(this._listaNegociacoes.negociacoes);

	}

	importaNegociacoes() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');

		//configurações
		/*0: requisição ainda não iniciada
		  1: conexão com o servidor estabelecida
		  2: requisição recebida
		  3: processando requisição
		  4: requisição concluída / resposta pronta 
		  */
		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) {
				//recuperar os dados
				if(xhr.status == 200) {
					console.log('Obtendo as negociações do servidor...');
					JSON.parse(xhr.responseText).map(objeto => new Negociacao(
						new Date(objeto.data), objeto.quantidade, objeto.valor))
					.forEach(negociacao => this._listaNegociacoes.adiciona(negociação));
					this._mensagem.texto = 'Negociações importadas com sucesso.';

				} else {
					console.log(xhr.responseText);
					this._mensagem.texto = 'Não foi possível obter as negociações.';
				}
			}

		};

		xhr.send();
	}

	apaga() {
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas com sucesso';

	}

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value), 
			this._inputQuantidade.value, 
			this._inputValor.value
		);
	}

	_limpaFormulario() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputQuantidade.focus();
	}
}