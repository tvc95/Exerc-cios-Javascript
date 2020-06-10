var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event){
	// var alvoEvento = event.target;			//TD = dado
	// var paiDoAlvo = alvoEvento.parentNode;	//TR = paciente

	event.target.parentNode.classList.add("fadeOut");
	setTimeout(function(){
		event.target.parentNode.remove();
	}, 500);

});

