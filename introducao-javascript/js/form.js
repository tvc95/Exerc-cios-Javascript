/// Unidade 4 - Aula 1 (Escutando Eventos)

//Maneira 1 - Função nomeada
//title.addEventListener("click", mostraMensagem);
//function mostraMensagem(){
//	console.log("Olá! Eu fui clicado!");
//}

//outra maneira de trabalhar com listeners é chamar uma função anonima:
// title.addEventListener("click", function (){
// 	console.log("Olá! Eu fui clicado!");
// });

// Trabalhando com o botão "adicionar":
var botaoAdd = document.querySelector("#adicionar-paciente");
botaoAdd.addEventListener("click", function (event){
	event.preventDefault();					//previne o comportamento padrão do botão (recarregar pagina)
	
	// Pegando e extraindo informações do paciente do form
	var form = document.querySelector("#form-adiciona");
	var paciente = obterInfo(form);
	console.log(paciente);

	var erros = validaPaciente(paciente);

	console.log(erros);
	if(erros.length > 0){
		exibeMsgsErro(erros);
	    return;
	}

	if(!validaPaciente(paciente)) {
		console.log("Dados do paciente (peso ou altura) inválidos!");
	} else {
		// adicionando o paciente na tabela
		addPacienteNaTabela(paciente);

		form.reset();	// limpa os campos do formulário

		var msgsErro = document.querySelector("#msgs-erro");
		msgsErro.innerHTML = "";

	}

});

function addPacienteNaTabela(paciente) {
	// adicionando o paciente na tabela
	// Montando a tr e a td do Paciente
	var pacienteTr = montaTrPaciente(paciente);
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);
}


// Função responsável por obter os dados do paciente presentes no formulário
function obterInfo(form) {

	// Criação de um objeto em javascript
	var paciente = {
		// Propriedades do objeto
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}

	return paciente;
}

//Função que recebe o paciente e monta uma "tr" com os dados recebidos
function montaTrPaciente(paciente) {
	// Criar um novo paciente (tr e td do paciente)
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");

	// Adicionando os td's dentro da tr
	pacienteTr.appendChild(montaTdPaciente(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTdPaciente(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTdPaciente(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTdPaciente(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTdPaciente(paciente.imc, "info-imc"));

	return pacienteTr;

}

//Função que recebe um dado do paciente e monta uma "td" com os dados recebidos
function montaTdPaciente(dado, classname){
	var td = document.createElement("td");
	td.textContent = dado;
	td.classList.add(classname);

	return td;
}

function validaPaciente(paciente) {
	var erros = [];

	if(!validaPeso(paciente.peso)) {
		erros.push("ERRO: o peso é inválido");
	} 

	if(!validaAltura(paciente.altura)){
		erros.push("ERRO: a altura é inválida");
	}

	if(paciente.gordura < 0) {
		erros.push("ERRO: o percentual de gordura é inválido");
	}

	if(paciente.nome.length == 0 || paciente.gordura.length == 0 || paciente.peso.length == 0 || paciente.altura.length == 0) {
		erros.push("ERRO: há dados não preenchidos no formulário!");
	}

	return erros;
}

function exibeMsgsErro(erros) {
	var ul = document.querySelector("#msgs-erro");
	ul.innerHTML = "";	//LIMPA AS MENSAGENS DE ERRO

	erros.forEach(function(erro) {
		var li = document.createElement("li");
		li.textContent = erro;

		ul.appendChild(li);

	});

}