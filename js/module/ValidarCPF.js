export default class ValidarCPF {
  constructor(element){
    this.element = element;

    this.spanErro = []
  }
  // Substitui todos os valores não númericos por ''
  limpar(cpf){
    return cpf.replace(/\D/g, '')
  }
  // Substitui em cada captura o valor passado no replace
  constuir(cpf){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  // Utilizando os métodos criados a cima.
  substituir(cpf){
    const cpfLimpo = this.limpar(cpf);
    return this.constuir(cpfLimpo);
  } 
  // Adicionando evento de change ao meu input de CPF
  adicionarEvento(){
    this.element.addEventListener('change', () => {
      this.validaNaMudança(this.element);
    })
  }
  // Fazendo validação do valor passado no meu input
  validaNaMudança(cpfElement) {
    if(this.validar(cpfElement.value)){
      cpfElement.value =  this.substituir(cpfElement.value);
      cpfElement.classList.remove('erro');
      if(cpfElement.nextElementSibling) {
        cpfElement.parentNode.removeChild(cpfElement.parentNode.lastChild)
        this.spanErro = []
      };
    }else {
      const span = document.createElement('span');
      span.innerText = 'CPF inválido.';
      span.style.color = 'red';
      cpfElement.classList.add('erro');
      if(this.spanErro.length === 0){
        this.spanErro.push(span);
        cpfElement.parentNode.appendChild(span);
      }
    }
  }
  // Esse método observa o valor passado por o usuario e verifica se é valido.
  validar(cpf){
    const matchCpf = cpf.match(/(?:\d{3}[\.-\s]?){3}\d{2}/g);
    // retorna um array com o valor do match, então se o valor for maior que o do match a array fica com quantos itens couber. então Apenas o primeiro pode ser valido.
    return (matchCpf && matchCpf[0] === cpf)
  }
  init(){
    this.adicionarEvento();
    return this
  }
}


