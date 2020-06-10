var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function(){
	var pacientes = document.querySelectorAll(".paciente");

	if(this.value.length > 0) {
		console.log("tem algo digitado");

		pacientes.forEach(function(paciente) {
			var tdNome = paciente.querySelector(".info-nome");
			var nome = tdNome.textContent;
			var expRegular = new RegExp(campoFiltro.value, "i"); //i = case insensitive

			if(expRegular.test(nome)){
				paciente.classList.remove("invisible");
			} else {
				paciente.classList.add("invisible");
			}
		});

	} else { 
		pacientes.forEach(function(paciente) {
			paciente.classList.remove("invisible");
		});
	}

});
