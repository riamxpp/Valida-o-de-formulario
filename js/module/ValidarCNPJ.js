export default class ValidaCNPJ {
  constructor(cnpj){
    this.element = cnpj
    this.mySpan = []
  }
  limpar(cnpj){
    return cnpj.replace(/\D/g, '');
  }

  construir(cnpj){
    const regex = /(\d{2})[.-\s]?(\d{3})[.-\s]?(\d{3})[.-\s\/]?(\d{4})[.-\s]?(\d{2})/g
    return cnpj.replace(regex, '$1.$2.$3/$4-$5');
  }

  substituir(cnpj){
    const cnpjLimpo = this.limpar(cnpj);
    return this.construir(cnpj);
  }

  addEventoChange(){
    this.element.addEventListener('change', () => {
      this.ativaNaMudança(this.element);
    })
  }

  valida(cnpj){
    const cnpjValido = cnpj.match(/\d{2}[.-\s]?\d{3}[.-\s]?\d{3}[.-\s\/]?\d{4}[.-\s]?\d{2}/g);
    return (cnpjValido && cnpjValido[0] === cnpj);
  }

  ativaNaMudança(cnpj){
    if(this.valida(cnpj.value)){
      cnpj.value = this.substituir(cnpj.value);
      cnpj.classList.remove('erro');

      if(cnpj.nextElementSibling){
        this.mySpan = [];
        cnpj.parentNode.removeChild(cnpj.parentNode.lastChild);
      }
    }else {
      const span = document.createElement('span');
      cnpj.classList.add('erro');
      span.innerText = 'CNPJ inválido';
      span.style.color = 'red';

      if(this.mySpan.length === 0){
        this.mySpan.push(span);
        cnpj.parentNode.appendChild(span);
      }
    }
  }

  init(){
    this.addEventoChange();
    return this
  }
}
