class DateHelper {

	construtor() {
		throw new Error('A classe DateHelper não pode ser instanciada.');
	}

	//Métodos estáticos podem ser invocados diretamente da classe.
	//Você não precisa criar uma instância da classe para chamá-los!
	static textoParaData(texto) {
		if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
			throw new Error('A data deve estar no formato AAAA-MM-DD');
		}

		return new Date(...texto.split('-').map(function(item, indice) {
			if(indice == 1) {
				return item - 1;

			}
			return item;
		}));

	}

	static dataParaTexto(data) {
		//return data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();
		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; //template strings

	}
}


/*//'...' spread operator
		 Adicionamos ... (reticências) posicionado antes do this. Com este spread operator, 
		indicamos que o array será desmembrado - e o primeiro item do array, e cada parâmetro do 
		Date será posicionado na mesma ordem no construtor. 
		let data = new Date(...
			this._inputData.value.split('-')
			.map(function(item, indice) {
				if(indice == 1) {
					return item - 1;
				}
				return item;
			}));
*/