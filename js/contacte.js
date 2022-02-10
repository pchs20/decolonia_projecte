const url = 'https://decolonia.herokuapp.com/contacte';

$(window).on("load",  async () => {
    $('#form-contacte').on("submit", handleSubmitGetFormData);
});

let handleSubmitGetFormData = async (e) => {
    e.preventDefault();

    // Alerta de camps obligatoris o recepció missatge correcte

    const element = document.getElementById('form-alert');
    const wrapper = document.getElementById('main-contacte');
    const form = document.getElementById("form-contacte");
    const fields = [...form.elements];
    
    const popAlert = () => {
        if(element) return;
        let section = document.createElement('section');
        let alert = document.createElement('div');
        section.id = "form-alert";
        section.className = "col-12 pt-5";
        alert.className = "alert alert-danger text-center";
        alert.innerHTML = "Tots els camps són obligatoris!";
        section.appendChild(alert);
        wrapper.insertBefore(section, document.getElementById('wrapper-form-contacte'));
    };
    
    const cleanAlert = () => {
        if(!element) return;
        wrapper.removeChild(element);
    };

    fields.pop(); // eliminamos el botón
    const found = fields.find( e => e.value.trim() === '' || e.value === null);
    if( found ) {
        return popAlert();
    } else {
        cleanAlert();
    }
    
    const user = fields[0].value;
    alert(`Hem rebut el teu missatge ${user}, no trigarem a contestar-te :)`);


    // Introduir les dades rebudes a la bd
    try {
        // Primer he d'aconseguir el id que li toqui (el últim) al nou missatge rebut
        tots =  ( await axios.get(`${url}`) ).data;
        
        const temps = Date.now();
        const avui = new Date(temps);

        // Després cal guardar les dades rebudes a la bd
        var contacte = {
            id: tots.length,
            nom: fields[0].value,
            correu: fields[1].value,
            telf: parseInt(fields[2].value),
            loc: fields[3].value,
            miss: fields[4].value,
            data: avui.toDateString()
        };
        await axios.post(`${url}`, contacte);
    } catch (error) {
        console.log(error)
    }

    // Tornar
    window.location.href = "contacte.html"
};