const database = firebase.database();
const auth = firebase.auth();
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

let usuario;

auth.onAuthStateChanged(
    (user)=>{
        if(user !== null){
            window.location.href='index.html'
        }
    }
);

loginBtn.addEventListener('click',()=>{

    auth.signInWithEmailAndPassword(correo.value, password.value).then(
        (data)=>{
            window.location.href = 'index.html';
        }
    ).catch(
        (error)=>{
            alert("Ingrese los datos correctamente");
            console.log(error);
        }
    ); 
});