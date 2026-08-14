let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

function adicionarDespesa() {

    const nome = document.getElementById("nome").value;
    const valor = Number(document.getElementById("valor").value);

    if (nome === "" || valor <= 0) {
        alert("Digite o nome e um valor válido.");
        return;
    }

    despesas.push({
        nome: nome,
        valor: valor
    });

    salvar();

    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";

    mostrarDespesas();
}

function salvar() {
    localStorage.setItem("despesas", JSON.stringify(despesas));
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
            <span>${despesa.nome}</span>
            <strong>R$ ${despesa.valor.toFixed(2)}</strong>
        `;

        lista.appendChild(item);
    });

    document.getElementById("total").innerText =
        `R$ ${total.toFixed(2)}`;
}

mostrarDespesas();