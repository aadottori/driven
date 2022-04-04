let area_escolhida;
        function lerClasse(id){
            area_escolhida = document.getElementById(id).className.split(" ")[1];
            return area_escolhida;
        }
    
        let prato_escolhido, bebida_escolhida, sobremesa_escolhida;
        let valores = {};

        function lerProduto(id){
            area_escolhida = lerClasse(id)
            div_produto_escolhido = document.getElementById(id);
            produto_escolhido = div_produto_escolhido.id;
            if (area_escolhida==="prato") {
                prato_escolhido = produto_escolhido;
            } else if (area_escolhida==="bebida") {
                bebida_escolhida = produto_escolhido;
            } else if (area_escolhida==="sobremesa") {
                sobremesa_escolhida = produto_escolhido;
            }

            todas_as_opcoes = document.getElementsByClassName(`${area_escolhida}`);

            for (let opcao_produto in todas_as_opcoes) {
                let produto = todas_as_opcoes[opcao_produto]
                
                if (typeof(produto)!="object") {continue}

                if (produto.id === produto_escolhido) {
                    document.getElementById(produto.id).style.borderColor = "green";
                } else {
                    document.getElementById(produto.id).style.borderColor = "#ffffff";
                }
            }
            
            valor = Number(div_produto_escolhido.innerText.split("\n")[div_produto_escolhido.innerText.split("\n").length -1].split(" ")[1].replace(",", "."));
            
            valores[area_escolhida] = {"produto_escolhido": produto_escolhido,
                                        "valor": valor};
            
            if (verificaSelecao()){
                document.getElementById("botao-finalizar").textContent = 'Fechar pedido';
                document.getElementById("botao-finalizar").style.backgroundColor = "#32B72F"
                document.getElementById("botao-finalizar").disabled = false;
                preencheConfirmacao(valores);

            };
            
            return valores;

        }
    
        function verificaSelecao() {
            if (prato_escolhido==undefined || bebida_escolhida==undefined || sobremesa_escolhida==undefined) {
                return false;
            }
            return true;
        }
   
        function calculaValorTotal(valores) {
            let total = 0;
            for (produto in valores) {
                total+=valores[produto]["valor"];
            }
            return total;
        }
    
        function preencheConfirmacao(valores) {
            document.getElementById("display-prato").innerHTML = valores["prato"]["produto_escolhido"];
            document.getElementById("display-prato-valor").innerHTML = dinheiroPontoParaVirgula(valores["prato"]["valor"]);
            document.getElementById("display-bebida").innerHTML = valores["bebida"]["produto_escolhido"];
            document.getElementById("display-bebida-valor").innerHTML = dinheiroPontoParaVirgula(valores["bebida"]["valor"]);
            document.getElementById("display-sobremesa").innerHTML = valores["sobremesa"]["produto_escolhido"];
            document.getElementById("display-sobremesa-valor").innerHTML = dinheiroPontoParaVirgula(valores["sobremesa"]["valor"]);
            document.getElementById("display-total-valor").innerHTML = `R$ ${dinheiroPontoParaVirgula(calculaValorTotal(valores))}`;

        }
    
        function dinheiroPontoParaVirgula(number) {
            return number.toFixed(2).replace(".", ",");
        }
    
        function createMessage(prato, bebida, sobremesa, total, nome, endereco) {
        message = `Olá, gostaria de fazer o pedido:
        - Prato: ${prato}
        - Bebida: ${bebida}
        - Sobremesa: ${sobremesa}
        Total: R$ ${dinheiroPontoParaVirgula(total)}
        
        Nome: ${nome}
        Endereço: ${endereco}`
        }

        let nome, endereco;
        function pedeNomeEndereco() {
            if (document.getElementById("botao-finalizar").disabled == false) {
                nome = prompt("Digite seu nome: ")
                endereco = prompt("Digite seu endereço: ")                
            }

        }
        function enviaMensagem() {
            message = createMessage(prato_escolhido, bebida_escolhida, sobremesa_escolhida, calculaValorTotal(valores))
        }