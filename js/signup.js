const database =firebase.database();
const auth = firebase.auth();
const username = document.getElementById('username');
const correo = document.getElementById('correo');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const regBtn = document.getElementById('regBtn');

var isSigningUp = false;

auth.onAuthStateChanged(
    (user)=>{
        if(user !==null){
            if(isSigningUp){
                let userDB = {
                    id: user.uid,
                    username: username.value,
                    correo: correo.value,
                    password: password.value,
                    voto: 0
                };
                database.ref('parcial2/users/'+userDB.id).set(userDB).then(
                    ()=>{
                        username.value='';
                        correo.value='';
                        password.value='';
                        repassword.value='';
                        window.location.href='index.html'
                    }
                );
            }else{
                window.location.href='index.html'
            }
        }
    }
);

regBtn.addEventListener('click',()=>{

    if(username.value===''||correo.value===''||password.value===''||repassword.value===''){
        alert("Ingrese todos los datos");
        return;
    }

    isSigningUp=true;
    auth.createUserWithEmailAndPassword(correo.value, password.value);
});