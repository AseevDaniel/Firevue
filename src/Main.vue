<template>
  <div id="mainPage">
    <!--
  <div v-if="currnetUser" class="">
    <div v-if="showProducts" class="products">
     <article class="collection" v-for="(product, id) in products" :key="id">
      <div class="img">
        <img :src="product.image">
      </div>

      <h1>{{ product.name }}</h1>
      <h1>Price: {{ product.price }} dollars</h1>
      <button v-if="currnetUser == 'admin'" type="button" name="button" @click="deleteSome(product.id)">delete</button>
      <button type="button" name="button" @click="add(product)">Add to basket</button>
     </article>
    </div>
<hr>
    <button type="button" @click="showProducts = !showProducts" name="button">Show Products</button>

    <div v-if="currnetUser == 'admin'" class="">
      <button type="button" v-if="!createNew" name="button" @click="createNew = true">Create new</button>

      <div class="create" v-else>
        <input type="text" name="" value="" v-model="name">
        <input type="text" name="" value="" v-model="url">
        <input type="number" name="" value="" v-model="cost">
        <button type="submit" name="button" @click="create(name, url, cost)">Create</button>
      </div>
    </div>

    <button type="button" @click="showBasket = !showBasket" name="button">Show Basket</button>


    <div v-if="showBasket" class="basket">

      <div v-if="!basket.length"  class="">
        <h2 style="color: red">You have not added anything to the cart yet</h2>

      </div>

      <div class="products">
        <article class="collection" v-for="(item, id) in basket" :key="id">
          <div class="img">
            <img :src="item.image">
          </div>

          <h1>{{ item.name }}</h1>
          <h1>Price: {{ item.price }} dollars</h1>
          <button type="button" name="button" @click="deleteBasket(item)">delete from bs</button>
        </article>
      </div>

    </div>
  </div>

<hr>
-->
  <div v-if="currnetUser" class="chat">
    <h2 style="text-align: center; margin-top: 0; ">Space Whale CHAT</h2>
    <h2>Online users:
      <p v-for="(user, id) in onlineUsers" :key="id" class="bold" >
        {{user.name + ((onlineUsers[onlineUsers.length - 1] == user) ? '' : ',')}}
      </p>
    </h2>
    <br>
    <h2>Your name: <router-link :to="{path: `/user/${currnetUser}/${currnetEmail}`}" ><p class="bold" >{{currnetUser}}</p></router-link></h2>

    <button class="logout" type="button" @click="logOut()" name="button">Log out</button>
    <hr>
    <div>
      <div class="messages">
        <article class="collectMess" v-for="(message, id) in messages" :key="id">

         <h1>
           <p class="bold" style="cursor: pointer" @click="emailLink(message.email)" :class="{admin: (message.author == 'admin')}"><router-link :style="{ color: (message.author == 'admin' ? 'red' : '#42b983')}" :to="{path: `/user/${message.author}/${message.email}`}" >{{ message.author }}</router-link></p>:
           <p style="display: inline" v-if="message.message">{{message.message}}</p> <img v-if="message.img" :src="message.img" alt="">
           <button class="del" v-if="isYourMessage(message.author) || currnetUser == 'admin'" @click="deleteMes(message.id, message.author)">&#215;</button>
         </h1>

        </article>
        <h2>Enter your message:
          <input class="inputMessage" style="display: inline" type="text" name="" value="" v-model="yourMessage" @keyup.enter="enterMessage()">
          <button class="file" style="display: inline" type="button">&#128269;<input @change="sendImg()" id="file" accept="image/*" ref="myFiles" type="file" name="" value=""> </button>
        </h2>

       </div>
    </div>


  </div>

  <div v-if="!currnetUser"  class="auth">
    <div class="">
      <div v-if="!signUp" class="enterName">
        <h1 style="text-align: center">Sign in</h1>
        <div class="regOrLog">
          <h2>Enter your email: <input style="display: inline" type="text" name="" value="" v-model="userEmail">
          </h2>
          <h2>Enter your password: <input style="display: inline" type="password" name="" value="" @keyup.enter="enter()" v-model="userPassword" >
          </h2>
        </div>
        <p class="error" v="error">{{error}}</p>
        <button @click="enter()">Log in</button>
        <a @click="signUp = true; error = ''"><h3>Or sign up</h3></a>
      </div>
      <div v-if="signUp" class="enterName">
        <h1 style="text-align: center">Sign up</h1>
        <div class="regOrLog">
          <h2>Enter email: <input style="display: inline" type="email" name="" value="" v-model="newUserEmail" >
          </h2>
          <h2>Enter name: <input style="display: inline" type="text" name="" value="" v-model="newUserName" >
          </h2>
          <h2>Enter password: <input style="display: inline" type="password" name="" value="" v-model="newUserPassword" >
          </h2>
          <h2>Repeat password: <input style="display: inline" type="password" name="" value="" @keyup.enter="createUser()" v-model="repeatUserPassword" >
          </h2>
        </div>
        <p class="error" v="error">{{error}}</p>
        <button @click="createUser()">Sign up</button>
        <a @click="signUp = false; error = ''"><h3>Or sign in</h3></a>
      </div>
    </div>
  </div>


  </div>
</template>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-analytics.js"></script>


<!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->


  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-firestore.js"></script>


<script>

export default {
  name: 'mainPage',
  data () {
    return {
      products: {},
      messages: {},
      users: {},
      onlineUsers: {},
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      userName: '',
      userEmail: '',
      userPassword: '',
      newUserName: '',
      newUserEmail: '',
      newUserPassword: '',
      repeatUserPassword: '',
      yourMessage: '',
      signUp: false,
      name: '',
      nameDelete: '',
      url: '',
      test: 'asdsads',
      cost: 0,
      createNew: false,
      deleteNew: false,
      basket: [],
      showBasket: false,
      showProducts: false,
      error: '',
      enteredImg: false,
      img: '',
      srcImage: '',
      uid: '',
      onlineId: 1,
    }
  },
  firestore () {
    return {
      products: this.db.collection('products').orderBy('name'),
      messages: this.db.collection('messages').orderBy('date'),
      users: this.db.collection('users').orderBy('login'),
      onlineUsers: this.db.collection('onlineUsers').orderBy('name'),
    }
  },
  mounted(){
    console.log('Current user: ' + this.currnetUser);
    console.log('Current email: ' + this.currnetEmail);
    console.log(this.onlineUsers);

    // for (var i = 0; i < this.users.length; i++) {
    //   this.onlineDel(this.users[i])
    // }

    //this.getUserUid()
  },
  computed: {
    currnetUser(){
      return this.$store.state.user
    },
    currnetEmail(){
      return this.$store.state.email
    },
  },
  methods: {
    // create(name, url, cost) {
    //   this.db.collection("products")
    //     .add({ name: name, image: url, price: Number(cost) })
    //     .then(() => {
    //       console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //       console.error("Error writing document: ", error);
    //     });
    //     this.name = ''
    //     this.url = ''
    //     this.cost = 0
    //     this.createNew = false;
    // },
    // deleteSome(id) {
    //    console.log(id);
    //    this.db.collection("products")
    //      .doc(id)
    //      .delete()
    //      .then(() => {
    //        console.log("Document successfully deleted!");
    //      })
    //      .catch((error) => {
    //        console.error("Error removing document: ", error);
    //      });
    // },
    // add(e){
    //    console.log(e);
    //    if (this.basket.indexOf(e) + 1){
    //    }else{
    //      this.basket.push(e)
    //    }
    //    console.log(this.basket);
    // },
    // deleteBasket(item){
    //    console.log(item);
    //    console.log(this.basket.indexOf(item));
    //    this.basket.splice(this.basket.indexOf(item), 1)
    // },
    async createUser() {
       this.newUserName.trim()
       this.newUserEmail.trim()
       this.newUserPassword.trim()
       this.newUserPassword.trim()

       const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       var bool = re.test(String(this.newUserEmail).toLowerCase());

       if (this.newUserPassword && this.newUserName && this.newUserEmail){
         if (bool){
           if (this.newUserPassword == this.repeatUserPassword){
             if (this.newUserPassword.length > 5){
               for (let i = 0; i < Object.values(this.users).length; i++){
                 if (Object.values(this.users)[i].email == this.newUserEmail){
                   this.error = 'this email is not available'
                   return
                 }
               }
               await this.$firebase.auth().createUserWithEmailAndPassword(this.newUserEmail, this.newUserPassword)
                 .then(() => {
                   console.log('good')
                   //this.nn()
                 })
                 .catch(function(error) {
                   // Handle Errors here.
                   console.log(error)
                   // ...
                 });
                await this.db.collection("users")
                 .add({ login: this.newUserName, email: this.newUserEmail, password: this.newUserPassword})
                 .then(() => {
                   console.log("Document successfully written!");
                   this.changeUser(this.newUserName)
                   this.changeEmail(this.newUserEmail)
                   this.onlineAdd(this.newUserName)
                 })
                 .catch((error) => {
                   console.error("Error writing document: ", error);
                 });
                 this.newUserName = ''
                 this.newUserEmail = ''
                 this.newUserPassword = ''
                 this.repeatUserPassword = ''
                 this.error = ''
                 console.log(this.$store.state.user);
                 console.log(this.$store.state.email);
             }else{
               this.error = 'Password must include more than 6 symbols'
             }
           }else{
             this.error = 'Password do not match'
           }
         }else{
           this.error = 'Email is not valid'
         }
       }else{
         this.error = 'All fields is required'
       }
    },
    async enter(){
      this.userEmail.trim()
      this.userPassword.trim()
      for (let i = 0; i < Object.values(this.users).length; i++){
          if (Object.values(this.users)[i].email == this.userEmail){
            if (Object.values(this.users)[i].password == this.userPassword){
              //
              this.userName = Object.values(this.users)[i].login
              await this.$firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPassword)
                .then(() => {
                  console.log('good')
                  //this.nn()
                  this.changeUser(Object.values(this.users)[i].login)
                  this.changeEmail(this.userEmail)
                  this.onlineAdd(Object.values(this.users)[i].login)
                  console.log(this.userName);
                  this.userName = ''
                  this.userEmail = ''
                  this.error = ''
                  this.userPassword = ''
                  console.log(this.$store.state.user);
                  console.log(this.$store.state.email);
                  return
                })
                .catch(function(error) {
                  console.log(error)
                });
            }
          }
        }
        this.error = 'wrong login or password'
    },
    changeUser(user) {
      this.$store.commit('changeUser', user)
    },
    changeEmail(email) {
      this.$store.commit('changeEmail', email)
    },
    async getUserUid(){
      if (this.currnetUser){
        var vm = this
        await this.$firebase.auth().onAuthStateChanged( user => {
          vm.uid = user.uid
          console.log(user.uid);
        });
        console.log(vm.uid);
      }
    },
    userInfo(){
      this.$firebase.auth().onAuthStateChanged( user => {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        //this.changeUser(user.email)
        console.log(user.uid);
      });
    },
    logOut(){

      this.onlineDel(this.currnetUser)
      this.error = ''
      this.changeUser('')
      this.changeEmail('')
    },
    enterMessage() {
      this.$firebase.auth().onAuthStateChanged( user => {
        var author = this.$store.state.user
        var authorEmail = this.$store.state.email
        var message = this.yourMessage
        var date = new Date()
        if (this.yourMessage){
          this.db.collection("messages")
            .add({ date: date, author: author, message: message, email: authorEmail})
            .then(() => {
               console.log("Message successfully send!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          this.yourMessage = ''
          this.srcImage = ''
        }
      });
    },
    sendImg() {
      this.yourMessage = ''
      var input = this.$refs.myFiles
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        let promise = new Promise( (resolve, reject) => {
          reader.onload = function(e) {
            this.srcImage = e.target.result
            resolve (this.srcImage)
          }
        })
        promise.then( result => {
          var author = this.$store.state.user
          var authorEmail = this.$store.state.email
          var date = new Date()
          this.db.collection("messages")
            .add({ date: date, author: author, img: result, email: authorEmail})
            .then(() => {
              console.log("Img successfully send!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
         })
         reader.readAsDataURL(input.files[0]);
      }
    },
    isYourMessage(auth){
      return (auth == this.$store.state.user)
    },
    deleteMes(id) {
      this.db.collection("messages")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Online successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
     },
     onlineAdd(name){
       console.log('its method onlineAdd');
       for (var i = 0; i < this.onlineUsers.length; i++) {
         if (this.onlineUsers[i].name = name) {
           return
         }
       }
       this.db.collection("onlineUsers")
         .add({ name: name })
         .then(() => {
           console.log("Online successfully add!");
         })
         .catch((error) => {
           console.error("Error writing document: ", error);
         });
     },
     onlineDel(name){
        var id
        console.log(Object.values(this.onlineUsers));
        for (var i = 0; i < this.onlineUsers.length; i++) {
          console.log(this.onlineUsers[i].name);
          console.log(this.onlineUsers[i].id);
          if (this.onlineUsers[i].name == name) {
            id = this.onlineUsers[i].id
            this.db.collection("onlineUsers").doc(this.onlineUsers[i].id).delete().then(() => {
              console.log(Object.values(this.onlineUsers));
              console.log("Document successfully deleted!");
            }).catch( error => {
              console.error("Error removing document: ", error);
            });
          }
        }
       // console.log(this.refOnline.equalTo(name, 'name'));
       // this.db.collection("onlineUsers")
       //   .doc(this.refOnline.equalTo(name, 'name').setValue(null))
       //   .delete()
       //   .then(() => {
       //     console.log("Document successfully deleted!");
       //   })
       //   .catch((error) => {
       //     console.error("Error removing document: ", error);
       //   });
     },
   }
 }
 </script>

 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped lang="scss">
 @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
 #main{
   font-family: 'Montserrat', "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", arial, sans-serif;
   /*text-align: center;*/

 }
 body{
   width: 100%;
 }
 h1, h2 {
   font-weight: normal;
 }
 ul {
   list-style-type: none;
   padding: 0;
 }
 li {
   display: inline-block;
   margin: 0 10px;
 }
 a {
   color: #42b983;
 }
 .all{
   width: 99%;
 }
 .bold{
   font-weight: bold;
   display: inline;
 }
 .admin{
   color: red;
 }
 button{
   font-size: 14px;
   background: #1976D2;
   padding: 0;
   border: none;
   border-radius: 5px;
   color: white;
   cursor: pointer;
   transition: .5s;
   width: 120px;
   height: 28px;
   margin-bottom: 10px;
   margin-left: 10px;
 }
 input{
   width: 300px;
   border: 1px solid #ccc;
   border-radius: 5px;
   height: 30px;
   display: flex;
   margin: 0 auto;
   padding-left: 10px;
   font-size: 16px;
 }
 .file{
   position: relative;
   font-size: 25px;
   background: white;
   margin: 0;
   margin-left: 10px;
   width: 36px;
   height: 36px;
   cursor: pointer;
 }
 .file input{
   filter: opacity(0);
   position: absolute;
   padding: 0;
   width: 36px;
   height: 36px;
   top: 0;
   left: 0;
   cursor: pointer;
   pointer-events: all;
   z-index: 20;
 }
 .products{
   display: grid;
   grid-gap: 20px;
   grid-template-columns: repeat( 4, 4fr);
 }
 .collection{
   .img{
     margin: 0 auto;
     width: 110px;
     height: 110px;
     position: relative;
     img{
       position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
       max-width: 90px;
       max-height: 90px;
     }
   }

 }
 .create{

 }
 .chat, .auth{
   position: relative;
   margin: 0 auto;
   margin-top: 20px;
   max-width: 1200px;
   height: auto;
   border: 1px solid #ccc;
   border-radius: 10px;
   padding: 15px;
   text-align: left;
 }
 .collectMess {
   input{
     margin: 0;
   }
   h1{
     margin-left: 20px;
     margin-right: 20px;
     button{
       cursor: pointer;
       background-color: white;
       color: red;
       font-size: 30px;
       transition: .3s;
       margin: 0;
     }
     button:hover{
       background-color: white;
       color: #880000;
       width: 25px;
       font-size: 30px;
     }
     img{
       max-width: 500px;
       max-height: 250px;
     }
     p{
       word-wrap: break-word;
     }
   }

 }
 .messages{
   h2{
     margin-left: 20px;
     margin-right: 20px;
     .inputMessage{
       min-width: calc(400px + ((100vw - 800px)/3.3));
     }
   }
 }
 .del{
   width: 30px;
 }
 .enterName{
   text-align: right;
   padding-left: 15px;
   padding-right: 15px;
   a{
     cursor: pointer;
   }
   .regOrLog{
     margin: 0 auto;
     max-width: 600px;
     text-align: right;
   }
 }
 .logout{
   position: absolute;
   right: 20px;
   top: 15px;
   padding-bottom: 2px
 }
 .error{
   color: red;
   text-align: center;
 }
 </style>
