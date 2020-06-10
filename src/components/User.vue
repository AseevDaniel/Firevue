<template>
  <div class="all">
    <router-link to="/">
      <button type="button" style="float: right" name="button">Back</button>
    </router-link>

    <h1>PROFILE</h1>
      <div class="info">
        <p>
          <span style="font-weight: bold">User name:</span> {{ $route.params.name }}
          <br>
          <span style="font-weight: bold">User email:</span> {{ $route.params.email }}
        </p>
        <button class="emailLink" type="button" @click="emailLink($route.params.email)" name="button">Send mail</button>

      </div>
  </div>
</template>

<script>

export default {
 name: 'user',
 data () {
   return {
   }
 },
 mounted(){
 },
 computed: {
   curEmail(){
     return this.email
   }
 },
 methods: {
   emailLink(email){
     location.href = "mailto:" + email
   },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  width: 100%;
  font-family: 'Montserrat', "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", arial, sans-serif;

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
  max-width: 600px;
  font-size: 30px;
  margin: 0 auto;
  padding: 0 5px;
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
  margin-right: 10px;
  margin-top: 10px;
}
.info{
  border: 1px solid #eee;
  border-radius: 5px;
  p{
    margin-left: 20px;
  }
  .emailLink{
    font-size: 20px;
    background: #1976D2;
    padding: 0;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: .5s;
    width: 160px;
    height: 40px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
}

</style>
