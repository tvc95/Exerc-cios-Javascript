
////Exercícios: o primeiro proxy a gente nunca esquece + proxy modificando retorno de método
let funcionario = {email: 'abc@abc.com'}; //objeto da classe Funcionário

funcionarioProxy = new Proxy(funcionario, {
	get: function(target, property, receiver) {
		console.log("Armadilha aqui!");
		return '**' + Reflect.get(target, property, receiver) + '**';
	}
});

console.log(funcionarioProxy.email);

========

////Exercício: proxy e peculiaridade com getters
class Funcionario {

    constructor(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
}

funcionarioProxy = new Proxy(new Funcionario('dollyinho100%gostoso@gmail.com'), {
	get: function(target, property, receiver) {
		console.log("Armadilha aqui!");
		console.log(property);
		return Reflect.get(target, property, receiver);
	}
});

console.log(funcionarioProxy.email);

=========

////Exercício: Mais um proxy, agora para lidar escrita!

let funcionario = {email: 'abc@abc.com'}; //objeto da classe Funcionário

funcionarioProxy = new Proxy(funcionario, {
	set: function(target, property, value, receiver) {
		console.log(`Valor antigo: ${target[property]} \tValor novo: ${value}`);
		return Reflect.set(target, property, value, receiver);
	}
});

funcionarioProxy.email = 'dollyinho100%gostoso@gmail.com';

==========

////Exercício: proxy e peculiaridade com setters
class Funcionario {

    constructor(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
}

funcionarioProxy = new Proxy(new Funcionario('abc@def.com'), {
	set: function(target, property, value, receiver) {
		console.log(`Propriedade a ser alterada: ${property}`);
		console.log(`Valor antigo: ${target[property]} \tValor novo: ${value}`);
		return Reflect.set(target, property, value, receiver);
	}
});

funcionarioProxy.email = 'dollyinho100%gostoso@gmail.com';

===========

////Exercício: Proxy intercepta métodos?

class Pessoa {

    constructor(nome) {
        this._nome = nome;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    grita(frase) {
            return `${this._nome} grita ${frase}`;
    }
}

let pessoa = new Proxy(new Pessoa('Barney'), {

        get(target, prop, receiver) {
            if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {
         // essa função retornada irá substituir o método 'grita' no proxy!!! Ou seja, estamos usando o handler do proxy para modificar o próprio proxy, que loucura!
                return function() {
                    console.log(`Método chamado: ${prop}`);    
                    // Quando usarmos Reflect.apply, Reflect.get e Reflect.set precisamos retornar o resultado da operação com return
                    // arguments é uma variável implícita que dá acesso à todos os parâmetros recebidos pelo método/função
                    return Reflect.apply(target[prop], target, arguments);       
                }
            }
            // só executa se não for função
            return Reflect.get(target, prop, receiver);
        }
    });

pessoa.grita('Olá');