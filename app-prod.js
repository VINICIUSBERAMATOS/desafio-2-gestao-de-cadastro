var dadosProduto = [];

dadosProduto = JSON.parse(localStorage.getItem("_dadosProduto")) || [];

if (dadosProduto) {
  InsereTabela();
}

function InsereTabela() {
  if (Array.isArray(dadosProduto)) {
    localStorage.setItem("_dadosProduto", JSON.stringify(dadosProduto));

    // $("#tbldadosProduto tbody").html("");

    let tbody = document.getElementById("tblbody");

    //Limpa as  linhas da tabela para inserir as novas
    tbody.innerText = "";

    dadosProduto.forEach(function (item) {
      let tr = tbody.insertRow();

      let tdId = tr.insertCell();
      let tdCodigo = tr.insertCell();
      let tdProduto = tr.insertCell();
      let tdCategoria = tr.insertCell();
      let tdDescricao = tr.insertCell();
      let tdValorUnid = tr.insertCell();
      let tdEstoque = tr.insertCell();
      let tdEditar = tr.insertCell();
      let tdExcluir = tr.insertCell();

      tdId.innerText = item.ID;
      tdCodigo.innerText = item.Codigo;
      tdProduto.innerText = item.Produto;
      tdCategoria.innerText = item.Categoria;
      tdDescricao.innerText = item.Descricao;
      tdValorUnid.innerText = item.ValorUnid;
      tdEstoque.innerText = item.Estoque;

      let btnEditar = document.createElement("button");
      btnEditar.type = "button";
      btnEditar.className = "btn btn-primary fa fa-edit";
      btnEditar.setAttribute("onClick", "EditarRegistro(" + item.ID + ")");

      let btnExcluir = document.createElement("button");
      btnExcluir.type = "button";
      btnExcluir.className = "btn btn-danger fa fa-trash";
      btnExcluir.setAttribute("onClick", "ExcluirRegistro(" + item.ID + ")");

      tdEditar.appendChild(btnEditar);
      tdExcluir.appendChild(btnExcluir);
    });
  }
}

function BtnSalvar() {
  //Evento do botão salvar
  let Id = document.getElementById("hdID").value;
  let Codigo = document.getElementById("txtCodProduto").value;
  let Produto = document.getElementById("txtProduto").value;
  let Categoria = document.getElementById("txtCategoria").value;
  let Descricao = document.getElementById("txtDescricao").value;
  let ValorUnid = document.getElementById("nrValorUnid").value;
  let Estoque = document.getElementById("nrEstoque").value;

  if (!Id || Id == "0") {
    let registro = {};
    registro.Codigo = Codigo;
    registro.Produto = Produto;
    registro.Categoria = Categoria;
    registro.Descricao = Descricao;
    registro.ValorUnid = ValorUnid;
    registro.Estoque = Estoque;

    registro.ID = dadosProduto.length + 1;
    dadosProduto.push(registro);
  } else {
    dadosProduto.forEach(function (item) {
      if (item.ID == Id) {
        item.Codigo = Codigo;
        item.Produto = Produto;
        item.Categoria = Categoria;
        item.Descricao = Descricao;
        item.ValorUnid = ValorUnid;
        item.Estoque = Estoque;
      }
    });
  }

  document.getElementById("hdID").value = "";
  document.getElementById("txtCodProduto").value = "";
  document.getElementById("txtProduto").value = "";
  document.getElementById("txtCategoria").value = "";
  document.getElementById("txtDescricao").value = "";
  document.getElementById("nrValorUnid").value = "";
  document.getElementById("nrEstoque").value = "";

  InsereTabela();

  alert("Registro salvo com sucesso.");
}

function ExcluirRegistro(id) {
  let confirmar = confirm("Deseja realmente excluir o registro?");

  if (confirmar) {
    for (let i = 0; i < dadosProduto.length; i++) {
      if (dadosProduto[i].ID == id) {
        dadosProduto.splice(i, 1);
      }
    }
    InsereTabela();
  }
}

function EditarRegistro(id) {
  $("#modalRegistro").modal("show");
  dadosProduto.forEach(function (item) {
    if (item.ID == id) {
      document.getElementById("hdID").value = item.ID;
      document.getElementById("txtCodProduto").value = item.Codigo;
      document.getElementById("txtProduto").value = item.Produto;
      document.getElementById("txtCategoria").value = item.Categoria;
      document.getElementById("txtDescricao").value = item.Descricao;
      document.getElementById("nrValorUnid").value = item.ValorUnid;
      document.getElementById("nrEstoque").value = item.Estoque;
    }
  });
}

function ValidaCampos(registros) {
  let mensagem = "";
  if (registros.Nome == "") {
    mensagem += "Informe o seu Nome Completo.";
  }
  return true;
}
