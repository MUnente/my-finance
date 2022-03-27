function validate(formName) {
    let form = document.querySelectorAll(`#${formName} input`);
    let isValid = true;
    
    for (let field of form)
        if (!field.value)
            isValid = false;

    return isValid;
}

function accessPlatform(formName, reqType) {
    let form = document.querySelectorAll(`#${formName} input`);
    let objFields = {};
    const baseUrl = document.location.origin;

    for (let field of form)
        Object.defineProperty(objFields, field.id, { value: field.value, enumerable: true });

    fetch(`${baseUrl}/${reqType}`, {
        method: 'POST',
        // for each request it's necessary to send a header
        // saying the type of content that will be sent
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(objFields)
    }).then(response => {
        response.text().then(result => {
            document.querySelector('footer marquee')?.remove();

            let lblResult = document.createElement('marquee');
            lblResult.innerText = result;
            document.querySelector('footer').appendChild(lblResult);
        });
    }).catch(err => {
        console.error(err);
    });
}

window.onload = () => {
    let btnEnter = document.querySelector('#btnEnter');
    let btnRegister = document.querySelector('#btnRegister');

    // Onclick Events
    btnEnter.onclick = () => {
        const isValid = validate('frmLogin');

        if (isValid) accessPlatform('frmLogin', 'login');
        else alert("Complete all fields bellow");
    };
        
    btnRegister.onclick = () => {
        const isValid = validate('frmRegister');
            
        if (isValid) accessPlatform('frmRegister', 'register');
        else alert("Complete all fields bellow");
    };
};