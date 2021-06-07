var botaoAdicionar = document.querySelector("#buscar-paciente");

botaoAdicionar.addEventListener("click", function(){
    var xhr = new XMLHttpRequest(); /*Fazer requisções HTML HTTP */
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); /* Indo até o endereço e colando o link */
    
    xhr.addEventListener("load", function(){ /* Quando os dados estiverem todos lidos ele executa a função */
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){ /* Quando tudo da certo */
            
            erroAjax.classList.add("invisivel")

            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);/* Vai ler o código em questão e converter ele em JS da forma que ele realmente é, que nesse caso é um array de objetos */

            pacientes.forEach(function(paciente){
                adicionaPacientesNaTabela(paciente);
            });
        } else { /* Quando dá algum erro no carregamento */
            console.log(xhr.status);
            console.log(xhr.responseText);

            erroAjax.classList.remove("invisivel")
        }

        
    });

    

    xhr.send();
})