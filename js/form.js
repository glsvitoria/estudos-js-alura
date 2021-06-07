var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener("click", function(event){ /* Precisa colocar o parâmetro como event */
    event.preventDefault(); /* Para que o botão não faça a sua função padrão de enviar o formulário e recarregar a página, ele em vez disso siga a o que iremos determinar */

    var form = document.querySelector("#form-adiciona");
    //Extraindo informações do paciente form
    
    var paciente = obtemPacienteDoFormulario(form);
    
    var erros = validaPaciente(paciente);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return; //Se o if for verdadeiro, com o return ele sai automaticamente da função de cima
    }
    
    adicionaPacientesNaTabela(paciente);

    form.reset(); //Apagar o formulário depois de preencher ele todo
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

function adicionaPacientesNaTabela(paciente){

    //Cria a tr e ad td do paciente
    var pacienteTr = montaTr(paciente);

    //Adicionando o paciente na tabela
    var tabela = document.querySelector("#tabela-pacientes")

    tabela.appendChild(pacienteTr);

}

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr"); /* Criando a tr para o novo paciente */
    pacienteTr.classList.add("paciente"); //Adicionando as classes que tinham nos pacientes iniciais

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("Nome não pode ser em branco")
    }

    if(!validaPeso(paciente.peso) && paciente.peso != 0){
        erros.push("Peso é inválido");
    }

    if(paciente.peso.length == 0){
        erros.push("Peso não pode ser em branco")
    }

    if(!validaAltura(paciente.altura) && paciente.altura != 0){
        erros.push("Altura é inválida");      
    }

    if(paciente.altura.length == 0){
        erros.push("Altura não pode ser em branco")
    }

    if(paciente.gordura.length == 0){
        erros.push("Gordura não pode ser em branco")
    }    

    return erros;
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = ""; //A innerHTML serve para controlar o html dentro daquela tag, que nesse caso seriam as li's

    erros.forEach(function(erro){ //Um array de erros que para cada item do array ele executa a seguinte função, funciona como um for mas ele já sabe até onde ele tem que ir
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}