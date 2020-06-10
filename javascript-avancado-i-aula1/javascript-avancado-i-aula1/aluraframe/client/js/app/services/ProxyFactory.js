class ProxyFactory {
	static createProxy(object, properties, action) {
		return new Proxy(object, {
            get: function(target, property, receiver) {

                if(properties.includes(property) && ProxyFactory._ehFuncao(target[property])) {
                    
                    return function() {
                        console.log(`interceptando método ${property}`);
                        let retorno = Reflect.apply(target[property], target, arguments);
                        action(target);
                        return retorno;
                    }

                }

                return Reflect.get(target, property, receiver);
                
            },

            set: function(target, property, value, receiver) {
            	if(properties.includes(property)) {
            		action(target);
            	}
            	return Reflect.set(target, property, value, receiver);

            }
        });

	}

	static _ehFuncao(func) {
		return typeof(func) == typeof(Function);
	}
}