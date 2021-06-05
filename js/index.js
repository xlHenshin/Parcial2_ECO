const database =firebase.database();
const auth = firebase.auth();
const username = document.getElementById('username');
const correo = document.getElementById('correo');
const logoutBtn = document.getElementById('logoutBtn');
const peliculaContainer = document.getElementById('peliculaContainer');

auth.onAuthStateChanged(
    (user)=>{

        if(user !== null){

            console.log(user.uid);
            database.ref('parcial2/users/'+user.uid).once(
                'value',
                (data)=>{
                    let userDB = data.val();
                    username.innerHTML = userDB.username;
                    correo.innerHTML = userDB.correo;
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
    })
});