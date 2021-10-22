export default class ValidarTelefone {
  constructor(telefone){
    this.element = telefone
    this.mySpan = []
  }

  limpar(telefone){
    return telefone.replace(/\D/g, '');
  }

  construir(telefone){
    return telefone.replace(/([\(]?\d{2}[\)\s]?[\s]?)(\d{5}[\s-]?)(\d{4})/g, '$1 $2-$3');
  }

  substituir(telefone){
    const meuTelefone = this.limpar(telefone);
    return this.construir(meuTelefone);
  }

  addChangeEvento(){
    this.element.addEventListener('change', () => {
      this.validandoNaMudança(this.element);
    })
  }

  valida(telefone){
    const matchTelefone = telefone.match(/\(?\d{2}\)?\s?\d{5}[\-\s]?\d{4}/g);
    console.log(matchTelefone);
    return (matchTelefone && matchTelefone[0] === telefone)
  }

  validandoNaMudança(telefone){
    if(this.valida(telefone.value)){
      telefone.value = this.substituir(telefone.value);

      telefone.classList.remove('erro');
      if(telefone.nextElementSibling){
        this.mySpan = []
        telefone.parentNode.removeChild(telefone.parentNode.lastChild)
      }

    }else { 
      const span = document.createElement('span');
      telefone.classList.add('erro');
      span.style.color = 'red'
      span.innerText = 'Número inválido.'
      console.log();
      if(this.mySpan.length === 0){
        this.mySpan.push(span);
        telefone.parentNode.appendChild(span)
      }
    }
  }

  init(){
    this.addChangeEvento();
    return this
  }
}
