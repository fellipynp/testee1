let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

function adicionarDespesa() {

    const nome = document.getElementById("nome").value;
    const valor = Number(document.getElementById("valor").value);
    const data = document.getElementById("data").value;
    
    if (nome === "" || valor <= 0) {
        alert("Digite o nome e um valor válido e data.");
        return;
    }

    despesas.push({
        nome: nome,
        valor: valor
###     data: data               
    });

    salvar();

    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";

    mostrarDespesas();
}

function mostrarDespesas() {

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    let total = 0;

    despesas.forEach((despesa, index) => {

        total += despesa.valor;

        const item = document.createElement("div");

        item.className = "despesa";

        item.innerHTML = `
            <div>
                <strong>${despesa.nome}</strong>
                <br>
                R$ ${despesa.valor.toFixed(2)}
            </div>

            <div>
                <button onclick="editarDespesa(${index})">
                    ✏️
                </button>

                <button onclick="excluirDespesa(${index})">
                    🗑️
                </button>
            </div>
        `;

        lista.appendChild(item);
    });

    document.getElementById("total").innerText =
        `R$ ${total.toFixed(2)}`;
}

function editarDespesa(index) {

    const despesa = despesas[index];

    const novoNome = prompt(
        "Nome da despesa:",
        despesa.nome
    );

    if (novoNome === null || novoNome.trim() === "") {
        return;
    }

    const novoValor = prompt(
        "Valor da despesa:",
        despesa.valor
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(
        novoValor.replace(",", ".")
    );

    if (valor <= 0 || isNaN(valor)) {
        alert("Valor inválido.");
        return;
    }

    despesas[index].nome = novoNome;
    despesas[index].valor = valor;

    salvar();
    mostrarDespesas();
}

function excluirDespesa(index) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta despesa?"
    );

    if (!confirmar) {
        return;
    }

    despesas.splice(index, 1);

    salvar();
    mostrarDespesas();
}

function salvar() {

    localStorage.setItem(
        "despesas",
        JSON.stringify(despesas)
    );
}

function alternarTema() {

    document.body.classList.toggle("dark");

    const estaEscuro =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "modoEscuro",
        estaEscuro
    );

    atualizarBotaoTema();
}

function atualizarBotaoTema() {

    const botao = document.getElementById("tema");

    if (document.body.classList.contains("dark")) {
        botao.innerText = "☀️ Modo claro";
    } else {
        botao.innerText = "🌙 Modo escuro";
    }
}

if (localStorage.getItem("modoEscuro") === "true") {
    document.body.classList.add("dark");
}

mostrarDespesas();
atualizarBotaoTema();
