// Type: 'create' / 'edit'
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const screenType = params.id ? 'edit' : 'create';

function createOrEdit() {
    // Se ele entrou aqui, o form está válido

    let payload = {
        totalCost: document.querySelector('#totalCost').value,
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        clientId: localStorage.getItem('idClient'),
    }

    // Enviar para a API
    fetch(`https://6335fc538aa85b7c5d2692ab.mockapi.io/api/projects${screenType === 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        
        if(screenType === 'edit') {
            Swal.fire({
                title: 'Editado com sucesso!',
                // text: "Editado com sucesso!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
    
                    window.location.href = "list.html";
                }
              })
        } else {
            Swal.fire({
                title: 'Cadastrado com sucesso!',
                // text: "Cadastrado com sucesso!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
    
                    window.location.href = "list.html";
                }
              })
        }

        // window.location.href = "list.html";
    });
}

window.onload = function() {
    setScreenTypeTexts();
    fillInputs();
}

function fillInputs() {
    if (screenType === 'edit')
    {
        fetch(`https://6335fc538aa85b7c5d2692ab.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector('#title').value = project.title;
            document.querySelector('#totalCost').value = project.totalCost;
            document.querySelector('#description').value = project.description;
        });
    }
}

function setScreenTypeTexts() {
    if (screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }


    if (screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}