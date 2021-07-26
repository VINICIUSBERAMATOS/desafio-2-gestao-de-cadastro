var dadosCliente = [];

dadosCliente = JSON.parse(localStorage.getItem("_dadosCliente")) || [];

if (dadosCliente) {
  InsereTabela();
}

function InsereTabela() {
  if (Array.isArray(dadosCliente)) {
    localStorage.setItem("_dadosCliente", JSON.stringify(dadosCliente));

    // $("#tbldadosCliente tbody").html("");

    let tbody = document.getElementById("tblbody");

    //Limpa as  linhas da tabela para inserir as novas
    tbody.innerText = "";

    dadosCliente.forEach(function (item) {
      let tr = tbody.insertRow();

      let tdId = tr.insertCell();
      let tdNome = tr.insertCell();
      let tdEmail = tr.insertCell();
      let tdCpf = tr.insertCell();
      let tdTelefone = tr.insertCell();
      let tdEendereco = tr.insertCell();
      let tdBairro = tr.insertCell();
      let tdCidade = tr.insertCell();
      let tdEstado = tr.insertCell();
      let tdCep = tr.insertCell();
      let tdEditar = tr.insertCell();
      let tdExcluir = tr.insertCell();

      tdId.innerText = item.ID;
      tdNome.innerText = item.Nome;
      tdEmail.innerText = item.Email;
      tdCpf.innerText = item.CPF;
      tdTelefone.innerText = item.Telefone;
      tdEendereco.innerText = item.Endereco;
      tdBairro.innerText = item.Bairro;
      tdCidade.innerText = item.Cidade;
      tdEstado.innerText = item.Estado;
      tdCep.innerText = item.CEP;

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
  let Nome = document.getElementById("txtNome").value;
  let Email = document.getElementById("txtEmail").value;
  let Cpf = document.getElementById("txtCpf").value;
  let Telefone = document.getElementById("txtTelefone").value;
  let Endereco = document.getElementById("txtEndereco").value;
  let Bairro = document.getElementById("txtBairro").value;
  let Cidade = document.getElementById("txtCidade").value;
  let Estado = document.getElementById("txtEstado").value;
  let Cep = document.getElementById("txtCep").value;

  if (!Id || Id == "0") {
    let registro = {};
    registro.Nome = Nome;
    registro.Email = Email;
    registro.CPF = Cpf;
    registro.Telefone = Telefone;
    registro.Endereco = Endereco;
    registro.Bairro = Bairro;
    registro.Cidade = Cidade;
    registro.Estado = Estado;
    registro.CEP = Cep;

    registro.ID = dadosCliente.length + 1;
    dadosCliente.push(registro);
  } else {
    dadosCliente.forEach(function (item) {
      if (item.ID == Id) {
        item.Nome = Nome;
        item.Email = Email;
        item.CPF = Cpf;
        item.Telefone = Telefone;
        item.Endereco = Endereco;
        item.Bairro = Bairro;
        item.Cidade = Cidade;
        item.Estado = Estado;
        item.CEP = Cep;
      }
    });
  }

  document.getElementById("hdID").value = "0";
  document.getElementById("txtNome").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtCpf").value = "";
  document.getElementById("txtTelefone").value = "";
  document.getElementById("txtEndereco").value = "";
  document.getElementById("txtBairro").value = "";
  document.getElementById("txtCidade").value = "";
  document.getElementById("txtCep").value = "";

  InsereTabela();

  alert("Registro salvo com sucesso.");
}

function ExcluirRegistro(id) {
  let confirmar = confirm("Deseja realmente excluir o registro?");

  if (confirmar) {
    for (let i = 0; i < dadosCliente.length; i++) {
      if (dadosCliente[i].ID == id) {
        dadosCliente.splice(i, 1);
      }
    }
    InsereTabela();
  }
}

function EditarRegistro(id) {
  $("#modalRegistro").modal("show");
  dadosCliente.forEach(function (item) {
    if (item.ID == id) {
      document.getElementById("hdID").value = item.ID;
      document.getElementById("txtNome").value = item.Nome;
      document.getElementById("txtEmail").value = item.Email;
      document.getElementById("txtCpf").value = item.CPF;
      document.getElementById("txtTelefone").value = item.Telefone;
      document.getElementById("txtEndereco").value = item.Endereco;
      document.getElementById("txtBairro").value = item.Bairro;
      document.getElementById("txtCidade").value = item.Cidade;
      document.getElementById("txtEstado").value = item.Estado;
      document.getElementById("txtCep").value = item.CEP;
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
