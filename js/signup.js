const database =firebase.database();
const auth = firebase.auth();
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
                    correo: correo.value,
                    password: password.value
                };
                database.ref('parcial2/users/'+userDB.id).set(userDB).then(
                    ()=>{
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
    isSigningUp=true;
    auth.createUserWithEmailAndPassword(correo.value, password.value);
});