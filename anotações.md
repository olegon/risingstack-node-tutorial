# Node.js Tutorial

## 01. Getting started with Node.js

Para rodar diferentes versões do Node na mesma máquina é interessante usar o [nvm](https://github.com/creationix/nvm)

O versionamento do Node.js é parecido com o do Linux: versão par (4, 6, 8, ...) significa versão estável e ímpar (5, 7, ...) significa versão experimental.

Na área de scripts do `package.json` é interessante ter dois script:

1. **start**: é invocado com `$ npm start`

2. **test**: é invocado com `$ npm test`



## 02. Using NPM

É apresentado o comando `$ npm install <package> <options>` com as opções `--save` e `--save-dev`, os "npm scripts" e "scoped packages", que podem ser instalados via `$ npm install @myorg/mypackage --save-dev`, por exemplo.



## 03. Understanding async programming in Node.js

É apresentado o uso de callback e sua característica do primeiro argumento ser sempre um erro (com um valor, caso haja erro, ou null)

Depois é falado sobre o [Event Loop](https://youtu.be/8aGhZQkoFbQ) e um pouco de Promises ES6.



## 04. Your first Node.js server

Apresentado middlewares, os objetos Request e Response, e um pouco de Express.js

Ah! Também é apresentado a variável de ambiente `DEBUG` o uso de `$ DEBUG=* node index.js` para obter informações de DEBUG. ;)



## 05. Node.js database

É falado um pouco sobre "MongoDB" e "PostgreSQL". Links interessantes no arquivo /whats-next.txt



## 06. Node.js request module

É dito um pouco sobre o módulo "request", que facilita o uso de requests, pois com Node.js puro é um pouco mais chato, e de sua versão baseada em promises "request-promise". É dado um desafio legal de integrar o site com uma API pública.



## 07. Node.js project structure

05 regras de ouro:

> Regra 01: Organize your files around features, not roles.

A ideia consiste em criar diretórios para diferentes áreas do projeto, como produto e usuário, por exemplo. Cada diretório possui seus arquivos de server e front-end.

> Regra 02: Don't put logic in index.js files

O arquivo index.js de cada módulo deve APENAS exportar funcionalidade de outros arquivos.

> Regra 03: Place your test files next to the implementation

A justifica é que testes TAMBÉM servem como documentação do código, então por isso é melhor eles ficarem próximos ao que é testado. Arquivos adicionais dos testes devem ficar em um diretório "test".

> Regra 04: Use a config directory

Todos as configurações devem ficar em um módulo de configuração

> Regra 05: Put your long npm scripts in a "script" directory



## 08. Node.js authentication using Passport.js

Bem simples. O legal é que a autenticação é feita com Redis :), mas o resumo é a própria documentação: http://passportjs.org/



## 09. Node.js unit testing tutorial

> "Tests are more than just safeguards - they provide a living documentation for your codebase.”

Os testes são separados em 3 categorias: unit tests, integration tests, end-to-end. Abaixo será apenas abordado unit tests.

> "You should write the test for the exposed methods, not for the internal workings of the given module."

Os pacotes mais usados são:
- Test Runner: mocha, tape
- Assertion library: chai, assert (nativo)
- Test spies, stubs  and mocks: sinon (for test setup)
- Code coverage information: istanbul


### O que são spies, stubs e mocks?

- Spies são utilizados para obter informações sobre o que aconteceu com uma função:

```javascript
it('calls subscribers on publish', function () {
    const callback = sinon.spy()

    PubSub.subscribe('message', callback)

    PubSub.publishSync('message')

    assertTrue(callback.called)
})
```


- Stubs funcionam como Spies, porém substituem a função com a finalidade de controlar o comportamento do código (como forçar uma exceção) ou prevenir chamadas HTTP.

```javascript
it('calls all subscribers, even if there are exceptions', function (){
    const message = 'an example message'
    const error = 'an example error message'
    const stub = sinon.stub().throws()
    const spy1 = sinon.spy()
    const spy2 = sinon.spy()

    PubSub.subscribe(message, stub)
    PubSub.subscribe(message, spy1)
    PubSub.subscribe(message, spy2)

    PubSub.publishSync(message, undefined)

    assert(spy1.called)
    assert(spy2.called)
    assert(stub.calledBefore(spy1))
})
```

- O restante não é muito informativo.



## 10. Debugging Node.js applications

Já foi dito dada a dica em um capítulo anterior:

> "(...) é apresentado a variável de ambiente "DEBUG" o uso de '$ DEBUG=* node index.js' para obter informações de DEBUG no stdout. ;)"

É dito sobre o uso de `$ node debug <file>`

E a grande dicar é usar o Chrome Dev Tools para debuggar Node.js através do pacote "node-inspector":

1. `$ npm install -g node-inspector`
2. `$ node-debug index.js --debug-brk`



## 11. Node.js security

Regras de segurança:

> Regra 01: não use 'eval'.

> Regra 02: sempre use "strict mode".

Isso evita os silent errors.

> Regra 03: tome cuidado ao lidar com erros.

Sempre faça log dos erros, mas nunca os exiba ao usuário.

> Regra 04: faça análise estática do código.

Use ESLint. Use Facebook's Flow!

> Regra 05: nunca rode processos com direitos de administrador.

É comum pessoas rodarem com direito de administrador para a aplicação ouvir nas portas 80/443, porém isso é um péssima prática, pois isso pode levar ao processo derrubar o sistema inteiro.

> Regra 06: não se esqueça do setup do cabeçalhos obrigatórios!

- Strict-Transport-Security: obriga a presença de HTTPS.
- X-Frame-Options: proteção contra Clickjacking (https://www.owasp.org/index.php/Clickjacking)
- X-XSS-Protection: nos navegadores mais atuais, habilita o filtro contra cross-site scripting (XSS)
- X-Content-Type-Options: prevents browsers from MIME-sniffing a response away from the declared content-type
- Content-Security-Policy: prevents a wide range of attacks, including Cross-site scripting and other cross-site injections
- Dica: use o pacote 'helmet':

```javascript
(function () {
    const express = require('express')
    const helmet = require('helmet')

    var app = express()

    app.use(helmet())

    // ...
})();
```

> Regra 07: cuidados com sessão do usuário.

Cookies de sessão devem ser Secure + HttpOnly.

> Regra 08: cuidados com o escopo do cookie.

- domain
- path
- expires
- Resumo-dica: use o pacote cookie-session.

> Regra 09: procure por vulnerabilidades com o pacote Retire.js

> Regra 10:  audite seus módulos com o pacote nsp (Node Security Platform CLI)
