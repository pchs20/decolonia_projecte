/*
    Data actual i formatejar-la
        const temps = Date.now();
        const avui = new Date(temps);
        avui.toDateString();
*/

const url_cont= 'https://decolonia.herokuapp.com/contacte';
const url_forum = 'https://decolonia.herokuapp.com/forum';
var cont = [];
var forum = [];

$(window).on("load",  async () => {
    try {
        cont =  ( await axios.get(`${url_cont}`) ).data;
        forum =  ( await axios.get(`${url_forum}`) ).data;
    }
    catch (error) {
        console.log(error)
    }

    showContacte();
    showForum();
    $('#wrapper-forum button').on("click", esborrarForum);
});


// PART DE CONTACTE
const showContacte = () => {
    for (let i = cont.length-1; i >= 0 && i >= cont.length-20; --i) {
        const contacte = cont[i];
        $('#wrapper-contacte').append (
            `
            <article class="col-xs-12 col-md-10 col-xl-6">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h5>Missatge de ${contacte.nom}</h5>
                        <div class="justify-content-end">
                            <a class="px-1 s" href="tel:${contacte.telf}" target="__blank" rel="noopener noreferrer"><i class="fas fa-phone-square-alt fa-2x"></i></a>
                            <a class="px-1 s" href="mailto: ${contacte.correu}"   target="_blank" rel="noopener noreferrer"><i class="fas fa-envelope-square fa-2x"></i></a>
                        </div>
                    </div>
                    <div class="card-body">
                      <blockquote class="blockquote mb-0">
                        <p><b>Dia:</b> ${contacte.data}</p>
                        <p><b>Localitat:</b> ${contacte.loc}</p>
                        <p><b>Missatge:</b> ${contacte.miss}</p>
                      </blockquote>
                    </div>
                  </div>
            </article>
            `
        );
    }
    if (cont.length == 0) {
        $('#wrapper-contacte').append (
            `
            <h6>No tens cap missatge nou!</h6>
            `
        );
    }
}


// PART DE FÒRUM

    // Mostrar fòrum
const showForum = () => {
    for (let i = forum.length-1; i >= 0 && i >= forum.length-20; --i) {
        const foro = forum[i];
        $('#wrapper-forum').append (
            `
            <article class="col-xs-12 col-md-10 col-xl-6">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <h5>Comentari de ${foro.nom}</h5>
                        <div class="justify-content-end">
                            <button id ="${foro.id}" class="px-1 s" href="tel:600630115" target="__blank" rel="noopener noreferrer"><i class="fas fa-trash-alt fa-2x"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                      <blockquote class="blockquote mb-0">
                        <p><b>Dia:</b> ${foro.data}</p>
                        <p><b>Valoració:</b> ${foro.val}</p>
                        <p><b>Comentari:</b> ${foro.coment}</p>
                      </blockquote>
                    </div>
                  </div>
            </article>
            `
        );
    }
    if (forum.length == 0) {
        $('#wrapper-forum').append (
            `
            <h6>No hi ha cap missatge al fòrum!</h6>
            `
        );
    }
}

    // Editar fòrum (esborrar)
const esborrarForum = async (boto) => {
    try {
        await axios.delete(`${url_forum}/${boto.currentTarget.id}`)
    }
    catch(error) {
        console.log(error);

    }
    
    window.location.href = "admin.html";
}