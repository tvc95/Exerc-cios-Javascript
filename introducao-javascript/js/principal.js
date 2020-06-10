var title = document.querySelector(".titulo");
//console.log(title);
//console.log(title.textContent);

title.textContent = "Aparecida Nutricionista";


var pacientes = document.querySelectorAll(".paciente"); //retorna um array de pacientes

for (var i = 0; i < pacientes.length; i++) {

	var tdPeso = pacientes[i].querySelector(".info-peso");
	var tdAltura = pacientes[i].querySelector(".info-altura");
	var tdImc = pacientes[i].querySelector(".info-imc");

	var peso = tdPeso.textContent;
	var altura = tdAltura.textContent;

	var pesoEhValido = validaPeso(peso);
	var alturaEhValida = validaAltura(altura);

	if(!pesoEhValido){
		console.log("peso inválido");
		tdImc.textContent = "peso inválido";
		pacientes[i].classList.add("paciente-invalido");
		//pacientes[i].style.color = "red";
		//pacientes[i].style.background = "black";
		//pacientes[i].style.backgroundColor = "lightcoral";
	} else if(!alturaEhValida){
		console.log("altura inválida");
		tdImc.textContent = "altura inválida";
		pacientes[i].classList.add("paciente-invalido");
		//pacientes[i].style.color = "red";
		//pacientes[i].style.background = "black";
		//pacientes[i].style.backgroundColor = "lightcoral";
	} else {
		var imc = calculaImc(peso, altura);
		tdImc.textContent = imc;
	}
}

function calculaImc(peso, altura) {
	var imc = 0;
	imc = peso / (altura * altura);
	return imc.toFixed(2);
}

function validaPeso(peso) {
	if(peso >= 0 && peso < 1000){
		return true;
	} else {
		return false;
	}
}

function validaAltura(altura) {
	if(altura >= 0 && altura < 3.00){
		return true;
	} else {
		return false;
	}
}

