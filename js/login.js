const url = 'https://decolonia.herokuapp.com/admins';

$(window).on("load",  async () => {
    $('#form-login').on("submit", handleSubmitGetFormData);
});

let handleSubmitGetFormData = async (e) => {
    e.preventDefault();

    const element = document.getElementById('form-alert');
    const wrapper = document.getElementById('main-login');
    const form = document.getElementById("form-login");
    const fields = [...form.elements];
    
    const cleanAlert = () => {
        if(!element) return;
        wrapper.removeChild(element);
    };

    const popAlert = (tipus) => {
        //if (element && element.name == tipus) return;
        let section = document.createElement('section');
        let alert = document.createElement('div');
        section.id = "form-alert";
        section.name = tipus;
        section.className = "col-12 pt-5";
        alert.className = "alert alert-danger text-center";
        if (tipus == "camps") alert.innerHTML = "Tots els camps són obligatoris!";
        else if (tipus == "user") alert.innerHTML = "No hi ha cap admin amb aquest nom!";
        else alert.innerHTML = "Contrasenya incorrecta!";       // tipus == "pwd"
        section.appendChild(alert);
        wrapper.insertBefore(section, wrapper.firstChild);
    };

    fields.pop(); 
    const found = fields.find( e => e.value.trim() === '' || e.value === null);
    if( found ) {
        cleanAlert();
        return popAlert("camps");       // Alerta de camps obligatoris
    }
    
    const usuari = fields[0].value;
    const contra = fields[1].value;
    var tots;

    try {
        tots = ( await axios.get(`${url}`) ).data;
    }
    catch (error) {
        console.log(error);
    }


    const usu = tots.find( user => user.user === usuari);
    if (!usu) {
        cleanAlert();
        return popAlert("user");      // Alerta usuari no trobat
    }
    else if (usu.pwd !== contra) {
        cleanAlert();
        return popAlert("pwd");        // Alerta contra incorrecta
    }
    else {
        cleanAlert();
    }

    alert(`Benvinguda / benvingut ${usu.nom}`);


    

    // Redirigir
    window.location.href = "admin.html"
};