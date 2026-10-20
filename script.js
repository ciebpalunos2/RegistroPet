// ===============================
// CADASTRO DO PET
// ===============================

const formPet = document.getElementById("formPet");

const listaPets = document.getElementById("listaPets");


formPet.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    const especie = document.getElementById("especie").value;

    const raca = document.getElementById("raca").value;

    const nascimento = document.getElementById("nascimento").value;


    listaPets.innerHTML = `
        <div class="pet-card">

            <h3>🐾 ${nome}</h3>

            <p>Espécie: ${especie}</p>

            <p>Raça: ${raca}</p>

            <p>Data de nascimento: ${nascimento}</p>

        </div>
    `;


    formPet.reset();

});


// ===============================
// CADASTRO DA VACINA
// ===============================

const formVacina = document.getElementById("formVacina");

const listaVacinas = document.getElementById("listaVacinas");

const areaAviso = document.getElementById("areaAviso");


formVacina.addEventListener("submit", function(event) {

    event.preventDefault();


    const nomeVacina = document.getElementById("nomeVacina").value;

    const dataAplicacao = document.getElementById("dataAplicacao").value;

    const proximaDose = document.getElementById("proximaDose").value;


    // Converte as datas para objetos Date

    const hoje = new Date();

    const dataProxima = new Date(proximaDose + "T00:00:00");


    // Calcula a diferença entre as datas

    const diferenca = dataProxima - hoje;


    // Converte milissegundos para dias

    const diasRestantes = Math.ceil(
        diferenca / (1000 * 60 * 60 * 24)
    );


    // Mostra os dados da vacina

    listaVacinas.innerHTML = `

        <div class="vacina-card">

            <h3>💉 ${nomeVacina}</h3>

            <p>
                Data da aplicação:
                ${formatarData(dataAplicacao)}
            </p>

            <p>
                Próxima dose:
                ${formatarData(proximaDose)}
            </p>

            <p>
                ${mensagemVacina(diasRestantes)}
            </p>

        </div>

    `;


    // Mostra o aviso

    mostrarAviso(diasRestantes, nomeVacina);


    formVacina.reset();

});


// ===============================
// FORMATAR DATA
// ===============================

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// ===============================
// MENSAGEM DA VACINA
// ===============================

function mensagemVacina(dias) {

    if (dias < 0) {

        return "⚠️ Vacina atrasada.";

    }

    if (dias === 0) {

        return "🚨 A vacina deve ser aplicada hoje!";

    }

    if (dias === 1) {

        return "🔔 A próxima dose é amanhã.";

    }

    if (dias <= 7) {

        return `🔔 Faltam ${dias} dias para a próxima dose.`;

    }

    return `📅 Faltam ${dias} dias para a próxima dose.`;

}


// ===============================
// AVISO
// ===============================

function mostrarAviso(dias, vacina) {

    if (dias < 0) {

        areaAviso.innerHTML = `
            <div class="aviso atrasada">

                <h2>⚠️ Vacina atrasada</h2>

                <p>
                    A vacina <strong>${vacina}</strong>
                    está atrasada.
                </p>

            </div>
        `;

    }

    else if (dias <= 7) {

        areaAviso.innerHTML = `
            <div class="aviso">

                <h2>🔔 Lembrete de vacinação</h2>

                <p>
                    A vacina <strong>${vacina}</strong>
                    está próxima!
                </p>

                <p>
                    Faltam <strong>${dias} dias</strong>
                    para a próxima dose.
                </p>

            </div>
        `;

    }

    else {

        areaAviso.innerHTML = `
            <div class="aviso tranquilo">

                <h2>✅ Vacinação em dia</h2>

                <p>
                    Ainda faltam ${dias} dias
                    para a próxima dose.
                </p>

            </div>
        `;

    }

}


// ===============================
// SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js")

        .then(function() {

            console.log(
                "Service Worker registrado com sucesso!"
            );

        })

        .catch(function(erro) {

            console.log(
                "Erro ao registrar o Service Worker:",
                erro
            );

        });

}
