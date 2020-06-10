var botaoBuscar = document.querySelector("#buscar-paciente");

botaoBuscar.addEventListener("click", function(){
	console.log("Buscando pacientes...");

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");
	xhr.addEventListener("load", function (){
		var erroAjax = document.querySelector("#erro-ajax");
		if(xhr.status == 200) {
			erroAjax.classList.add("invisible");
			var resposta = xhr.responseText;
			// console.log(resposta);
			// console.log(typeof resposta);

			var pacientes = JSON.parse(resposta);
			// console.log(pacientes);
			// console.log(typeof pacientes);

			pacientes.forEach(function(paciente) {
				addPacienteNaTabela(paciente);
			});
		} else {
			console.log(xhr.status);
			console.log(xhr.responseText);
			erroAjax.classList.remove("invisible");
		}

		

	});
	xhr.send();
});

//http://api-pacientes.herokuapp.com/pacientes