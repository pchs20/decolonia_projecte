/*
    Data actual i formatejar-la
        const temps = Date.now();
        const avui = new Date(temps);
        avui.toDateString();
*/

const url = 'https://decolonia.herokuapp.com/forum';
var tots = [];

$(window).on("load",  async () => {
    try {
        tots =  ( await axios.get(`${url}`) ).data;
    }
    catch (error) {
        console.log(error)
    }

    $('#form-forum').on("submit", handleSubmitGetFormData);
    showData();
});

// PART DE REBRE DADES

let handleSubmitGetFormData = async (e) => {
    e.preventDefault();

    // Alerta de camps obligatoris o recepció missatge correcte

    const element = document.getElementById('form-alert');
    const wrapper = document.getElementById('main-forum');
    const form = document.getElementById("form-fieldset");
    const fields = [...form.elements];
    
    const popAlert = () => {
        if(element) return;
        let section = document.createElement('section');
        let alert = document.createElement('div');
        section.id = "form-alert";
        section.className = "col-6 py-5";
        alert.className = "alert alert-danger text-center";
        alert.innerHTML = "Tots els camps són obligatoris!";
        section.appendChild(alert);
        wrapper.insertBefore(section, document.getElementById('wrapper-form-forum'));
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
    alert(`Hem rebut el teu comentari ${user}, moltes gràcies :)`);

    // Introduir les dades rebudes a la bd
    const temps = Date.now();
    const avui = new Date(temps);

    // Després cal guardar les dades rebudes a la bd
    var forum = {
        id: tots[tots.length-1].id + 1,     // Evitar repetits tenint en compte que es poden eliminar missatges pels admins
        nom: fields[0].value,
        val: parseInt(fields[1].value),
        coment: fields[2].value,
        data: avui.toDateString()
    };

    try {
        await axios.post(`${url}`, forum);
    } catch (error) {
        console.log(error)
    }

    // Tornar
    window.location.href = "forum.html"
};


// PART DE MOSTRAR DADES
const showData = () => {
    for (let i = tots.length-1; i >= 0 && i >= tots.length-20; --i) {
        const comment = tots[i];
        $('#wrapper-general').append (
            `
            <article class="col-xs-12 col-md-10 col-xl-6">
                <div class="card">
                    <div class="card-header">${comment.nom}</div>
                    <div class="card-body">
                      <blockquote class="blockquote mb-0">
                        <p>${comment.coment}</p>
                        <footer class="blockquote-footer">Valorat amb ${comment.val} sobre 100 a data ${comment.data}</footer>
                      </blockquote>
                    </div>
                  </div>
            </article>
            `
        );
    }
}