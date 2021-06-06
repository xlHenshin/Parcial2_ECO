const database =firebase.database();
const auth = firebase.auth();
const username = document.getElementById('username');
const correo = document.getElementById('correo');
const logoutBtn = document.getElementById('logoutBtn');
const peliculaContainer = document.getElementById('peliculaContainer');
const calificarBtn = document.getElementById('calificarBtn');

let valor1, valor2, valor3, valor4, valor5;
let arrayComponente = [];

auth.onAuthStateChanged(
    (user)=>{

        if(user !== null){

            console.log(user.uid);
            database.ref('parcial2/users/'+user.uid).once(
                'value',
                (data)=>{
                    let userDB = data.val();
                    username.innerHTML ="Username: " + userDB.username;
                    correo.innerHTML ="Correo: " + userDB.correo;
                }
            );
        }else{
            window.location.href='login.html';
        }
    }
);

logoutBtn.addEventListener('click', ()=>{
    auth.signOut().then(
        ()=>{
            window.location.href="login.html";
        }
    ).catch(
        (error)=>{
            alert(error.message);
        }
    );
});

database.ref('parcial2/peliculas').on('value', function(data){
    peliculaContainer.innerHTML='';
    data.forEach((id)=>{
        let valor = id.val();
        let pelicula = new Pelicula(valor);
        peliculaContainer.appendChild(pelicula.render());
        arrayComponente.push(pelicula);
    })
});

calificarBtn.addEventListener('click', ()=>{
    for (let i = 0; i < arrayComponente.length; i++) {
        console.log(">>>"+arrayComponente[i].pelicula.nombre);
        database.ref('parcial2/peliculas/'+arrayComponente[i].pelicula.id).once(
            'value',
            (data)=>{
            let pelisDB=data.val();

            let rateUsuario=parseInt(arrayComponente[i].valorVoto,10);
            let rateActual=parseInt(pelisDB.calificacion,10);
            let votosActuales=parseInt(pelisDB.votos,10);

            let promedio= (rateUsuario+(votosActuales*rateActual))/(rateActual+1);

            console.log("Promedio: "+promedio);

            let peliPromedio = {
                calificacion: promedio,
                votos: votosActuales+1
            };
            database.ref('parcial2/peliculas/'+pelisDB.id).set(peliPromedio);
        });
    }

    database.ref('parcial2/users/'+user.uid).once(
        'value',
        (data)=>{
            let userDB = data.val();

            let userVoto={
                voto: 1
            };
            database.ref('parcial2/users/'+userDB.id).set(userVoto);
        }
    );
});