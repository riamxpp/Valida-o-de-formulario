export default class ValidarCEP {
  constructor(cep, cidade) {
    this.element = cep;
    this.cidade = cidade
    this.myTag = []
  }

  limpar(cep){
    return cep.replace(/\D/g, '');
  }

  construir(cep){
    return cep.replace(/(\d{5})(\d{3})/g, '$1-$2');
  }

  subtituir(cep){
    const cepLimpo = this.limpar(cep)
    return this.construir(cepLimpo);
  }

  addEventoChange(){
    this.element.addEventListener('change', () => {
      this.validandoNaMudança(this.element)
    })
  }

  async validandoNaMudança(cep){
    if(this.validandoCep(cep.value)){
      cep.classList.remove('erro'); 
      if(cep.nextElementSibling) {
        this.myTag = []
        cep.parentNode.removeChild(cep.parentNode.lastChild);
      }
      await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
      .then(response => response.json())
      .then(json => {
        this.cidade.value = json.localidade;
      });
      cep.value = this.subtituir(cep.value);

    }else {
      const span = document.createElement('span');
      span.innerText = 'Cep inválido';
      span.style.color = 'red';

      cep.classList.add('erro'); 
      if(this.myTag.length === 0){
        this.myTag.push(span);
        cep.parentNode.appendChild(span);
      }
      this.cidade.value = ''
    }
  }

  validandoCep(cep){
    const matchCep = cep.match(/\d{5}[-.\s]?\d{3}/g);
    
    return (matchCep && matchCep[0] === cep)
  }

  init(){
    this.addEventoChange();
    return this
  }
}
