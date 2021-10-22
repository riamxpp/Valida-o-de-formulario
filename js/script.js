import ValidarCPF from "./module/ValidarCPF.js";
import ValidarCEP from "./module/ValidarCEP.js";
import ValidarTelefone from "./module/ValidarTelefone.js";
import ValidaCNPJ from "./module/ValidarCNPJ.js";

const cpf = document.querySelector('#cpf')
const cpfValido = new ValidarCPF(cpf).init();

const cep = document.querySelector('#cep');
const cidade = document.querySelector('#cidade');
const cepValido = new ValidarCEP(cep, cidade).init(); 

const telefone = document.querySelector('#telefone');
const telefoneValido = new ValidarTelefone(telefone).init();

const cnpj = document.querySelector('#cnpj');
const cnpjValido = new ValidaCNPJ(cnpj).init();