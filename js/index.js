const database =firebase.database();
const auth = firebase.auth();
const username = document.getElementById('username');
const correo = document.getElementById('correo');
const logoutBtn = document.getElementById('logoutBtn');
const peliculaContainer = document.getElementById('peliculaContainer');
const calificarBtn = document.getElementById('calificarBtn');

let arrayComponente = [];

let usuario;
let haVotado;

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
                    usuario=userDB.id;
                    haVotado=userDB.voto;

                    if(haVotado==1){
                        alert("Usted ya ha votado, redirigiendo al login...");
                        auth.signOut().then(
                            ()=>{
                                window.location.href="login.html";
                            }
                        ).catch(
                            (error)=>{
                                alert(error.message);
                            }
                        );
                    }
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
                id: pelisDB.id,
                nombre: pelisDB.nombre,
                votos: votosActuales+1
            };
            database.ref('parcial2/peliculas/'+pelisDB.id).set(peliPromedio);
        });
    }

    console.log("User UID>>>"+usuario);
    database.ref('parcial2/users/'+usuario).once(
        'value',
        (data)=>{
            let userDB = data.val();
            let userVoto={
                correo: userDB.correo,
                id: userDB.id,
                password: userDB.password,
                username: userDB.username,
                voto: 1
            };
            database.ref('parcial2/users/'+userVoto.id).set(userVoto);
        }
    );

    alert("Muchas gracias por votar, redirigiendo al login...");

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