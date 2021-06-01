var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');


  fileButton.addEventListener('change',function(e){
    var file = e.target.files[0];
    var storageRe = firebase.storage().ref('archivos/'+file.name);
    var task = storageRe.put(file); 

    task.on('state_changed',

      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        uploader.value = percentage;
      },

      function error(err){

      },

      function complete(){
      	alert("subida completada");
      	var user1 = firebase.auth().currentUser;
      	db = firebase.database();
      	const usersRef = db.ref().child('users');
      	const query = usersRef.orderByChild('uid').equalTo(user1.uid).limitToFirst(1);
      	alert(query + "es la uid");
      }


      )
  });