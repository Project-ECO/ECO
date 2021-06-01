function registrar() {

    var email= document.getElementById('reg-username').value;
    var contrasena= document.getElementById('new-password').value;
   
   firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...

    verificar();
    AgregarUserBD(uid);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ..
  });
   


}
function ingreso(){

    var email2= document.getElementById('login-username').value;
    var contrasena2= document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
  .then((userCredential2) => {
    // Signed in
    var user = userCredential2.user;
    // ...
    Cambiar()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}
function observador(){
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {

            logueado(user)
            console.log("activo");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...

          
        } else {
          // User is signed out
          console.log("incativo");
          // ...
        }
      });
}
observador();
function logueado(user){
    var user= user;

    var contenido= document.getElementById('contenido');
    if(user.uid){ 
      Cambiar();
    /* contenido.innerHTML =  ` 
    <button onclick="cerrar()">Cerrar sesion</button>
    
    ` */ ;}
       
    
   
}

function Cambiar(){
  window.location = "appointment.html";
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log("saliendo");

    })
    .catch(function(error){
        console.log("error");
    })
}

function generateId(){
  var db = firebase.database();
  const GenerateIdRef = db.ref().child('GeneratorId');

    
}

function AgregarUserBD(uid){
  var db = firebase.database();
  var user = db.ref('users');
  var UserConect = db.ref("/users");
  var conectados = UserConect.push({
    uid: uid
  });
}



function verificar(){
    var user = firebase.auth().currentUser;
   
    user.sendEmailVerification().then(function() {
  
  // Email sent.
  alert("se a enviado un correo de confirmacion");
}).catch(function(error) {
  // An error happened.
});
}