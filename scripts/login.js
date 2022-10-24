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
        Swal.fire({
            icon: 'error',
            title: 'Atenção...',
            text: 'Favor marcar alguma role!',
          })
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
        Swal.fire(
            'Bom trabalho!',
            'Cadastrado com sucesso!',
            'success'
          )

          Swal.fire({
            title: 'Bom trabalho!',
            text: "Cadastrado com sucesso!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {

                localStorage.setItem("user.name", response.fullname);
                localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
                localStorage.setItem("idClient", response.id);

                window.location.href = "list.html";
            }
          })
        
        

        // Redirect para List

    });
}