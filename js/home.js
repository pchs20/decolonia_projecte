const url = 'https://decolonia.herokuapp.com/forum';
var tots = [];

$(window).on("load",  async () => {
    try {
        tots =  ( await axios.get(`${url}`) ).data;
    }
    catch (error) {
        console.log(error)
    }

    showData();
});


const showData = () => {
    for (let i = tots.length-1; i >= 0 && i >= tots.length-3; --i) {
        const comment = tots[i];
        $('#wrapper-forum').append (
            `
            <article class="col-12 col-md-11">
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
        $('article').insertBefore("#anar-forum");
    }
    if (tots.length == 0) {
        $('#wrapper-forum').append (
            `
            <h6> Encara no hi ha cap missatge al fòrum, vols ser la primera o el primer en afegir-ne un? </h6>
            `
        );
    }
}