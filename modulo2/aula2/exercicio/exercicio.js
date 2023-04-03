function saveLocal(lista) {
    localStorage.setItem("@todo", JSON.stringify(lista));
  }
  
  function getLocal() {
    return JSON.parse(localStorage.getItem("@todo")) || [];
  }

  function savePage() {
    const spanlist = document.querySelectorAll("li span");
    const lista = getData(spanlist);
    localStorage.setItem("@todo", JSON.stringify(lista));
    criaLista(getLocal())
  }

  function getData(el) {
      let data = []
    el.forEach((item) => {
        if (data.find(el => el.text === item.textContent) === undefined && item.textContent != "") {
            data.push({"text": item.textContent})
        }

    });

    return data
  }
  
  function criaLista(list) {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    list.map((item) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const span = document.createElement("span");

      //CSS!
      button.setAttribute('id', 'delete-btn');
      button.style.background = "red";
      button.style.padding = "10px";
      button.style.margin = "5px";
      button.innerText = "X"
      span.style.fontSize = "20px";
      //!!

      button.addEventListener('click', function() {
        ul.removeChild(li)
        savePage()
      }, false)
      span.contentEditable = true
      span.textContent = item.text;
      li.appendChild(button)
      li.appendChild(span);
      ul.appendChild(li);
    });
  }
  
  function onSubmit() {
    event.preventDefault();
    const textoEl = document.querySelector("input");
    const text = textoEl.value;
    const lista = getLocal();
    if (textoEl.value === "") return;
    if (lista.find((item) => item.text === text)) return;
    const item = { text: textoEl.value};
    lista.push(item);
    saveLocal(lista);
    criaLista(lista);
  
    textoEl.value = "";
  }

  
  window.onload = () => {
      const saveButton = document.getElementById('save')
      const loadButton = document.getElementById('load')
    
      saveButton.addEventListener('click', function() {
        savePage();
      }, false);
      
      loadButton.addEventListener('click', function() {
        const lista = getLocal();
        criaLista(lista);
      }, false);


    criaLista(getLocal());
  };