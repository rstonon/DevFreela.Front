function checkIfAnyRoleIsChecked() {
    let list = document.getElementsByName("role");
    let counter = 0;
    

    for (let radioButton of list) {
        if (radioButton.checked === false) {
            counter++;
        }
    }

    return counter !== list.length; // false | true
}

function cadastrar() {
    // Se ele entrou aqui, o form está válido


    // Pegar as informações
    if (checkIfAnyRoleIsChecked() === false) {
        alert('Marque alguma Role');
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'client',
        fullname: document.querySelector('#fullname').value,
        birthdate: document.querySelector('#birthdate').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    // Enviar para a API
    fetch("https://6335fc538aa85b7c5d2692ab.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(response => {
        alert('Cadastrado com sucesso!')
    });
}