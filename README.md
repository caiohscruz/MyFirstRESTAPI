## :computer: Projeto

A proposta deste projeto foi desenvolver uma API REST bem simples para começar a se familiarizar com webservices e com a arquitetura REST. Essa API será consumida por um outro projeto, [MyFirstRESTAPIConsumer](https://github.com/caiohscruz/MyFirstRESTAPIConsumer). Deixarei [aqui](https://youtu.be/RVVYuSteLdo) um link para um vídeo onde falo um pouco sobre o projeto e [aqui](https://myfirstrestapiconsumer.herokuapp.com/) um para a aplicação em funcionamento.

Posteriormente, inclui a autenticação de clientes com JWT, dessa forma, a API não irá tratar solicitações de clientes que não possuam um token válido. Em resposta a uma requisição de autenticação bem sucessida, a API fornece ao cliente um token que fica salvo no navegador, no localStorage, o qual tem uma válidade, exigindo autenticações com alguma regularidade.

Atenção, caso teste minha API REST diretamente com algo como o Postman ou pela aplicação mesmo que desenvolvi para consumi-la e acuse indisponibilidade do serviço, será necessário acessar o [site do projeto](https://my-first--rest-api.herokuapp.com/) para que ele saia da hibernação. Projetos ociosos são suspensos pelo Heroku, mas basta acessar a página para que sejam postos em atividade novamente.

## :satellite: De onde?

Adquiri um curso de NodeJS na Udemy,  [Formação NodeJS](https://www.udemy.com/course/formacao-nodejs/), que me pareceu ser bem completinho, esta aplicação foi proposta como quarto projeto, junto da [MyFirstRESTAPIConsumer](https://github.com/caiohscruz/MyFirstRESTAPIConsumer). Nas aulas, criou-se um array de objetos que foi utilizado como se banco de dados fosse, aqui eu não fiz isso, utilizei um banco de dados real. Além disso, realizei o deploy da aplicação e implementei uma homepage com algumas orientações sobre o uso da API.

## :rocket:Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- JavaScript
- NodeJS
- EJS
- Axios
- JWT
- Cors
- dotenv
- Sequelize
- Mysql2
- Express
