const btnScan = document.querySelector(".btn_scan");
const btnDel = document.getElementById("btn_del");
const inputCadastrados = document.getElementById("cadastrados");
const qrReaderDiv = document.getElementById("qr-reader");
const listaCadastrados = document.getElementById("lista-cadastrados");

let cadastrados = [];// Array para armazenar os itens cadastrados

// Função para atualizar a lista exibida
function atualizarLista() {
    listaCadastrados.innerHTML = "";
    cadastrados.forEach((item, index) => {
        const itemDiv = document.createElement("div");//
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.marginBottom = "2px";

        const li = document.createElement("li");
        li.textContent = item;
        li.style.flex = "1";

        // Cria o botão de deletar
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Excluir";
        btnDelete.style.marginLeft = "10px";
        btnDelete.style.background = "#563ce7ff";
        btnDelete.style.color = "#fff";
        btnDelete.style.border = "none";
        btnDelete.style.borderRadius = "5px";
        btnDelete.style.cursor = "pointer";
        btnDelete.onclick = () => {
            cadastrados.splice(index, 1);
            atualizarLista();
        };

        // Adiciona o item e o botão à div do item
        itemDiv.appendChild(li);
        itemDiv.appendChild(btnDelete);
        listaCadastrados.appendChild(itemDiv);

        // Atualiza o contador
        const contador = cadastrados.length;
        inputCadastrados.value = `${contador} cadastrados`;
        if (contador == 1) {
            inputCadastrados.value = `${contador} cadastrado`;
        }
        
        
        
        
    });
    
    if (cadastrados.length === 0) {
    inputCadastrados.value = "";
    }
}


btnScan.addEventListener("click", () => {
    qrReaderDiv.style.display = "block";
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 200
        },
        (decodedText, decodedResult) => {
            cadastrados.push(decodedText);
            inputCadastrados.value = " ";
            atualizarLista();
            html5QrCode.stop();
            qrReaderDiv.style.display = "";
        },
        (errorMessage) => {
            // Ignorar erros de leitura
        }
    ).catch(err => {
        alert("Erro ao acessar a câmera: " + err);
    });
});

btnDel.addEventListener("click", () => {
    cadastrados.pop();
    atualizarLista();
});