<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="efetuarLogin">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" class="form-control" v-model="usuario.email" />
      </div>

      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" class="form-control" v-model="usuario.senha" />
      </div>

      <button type="submit" class="btn btn-primary btn-block">Logar</button>
      <router-link :to="{ name: 'novo.usuario' }">Cadastre-se</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    efetuarLogin() {
      this.$http
        .post("auth/login", this.usuario)
        .then((res) => {
          console.log(res);
          // localStorage.setItem("token", res.data.access_token);
          // this.$store.state.token = res.data.access_token
          // this.$store.state.usuario = res.data.user
          this.$store.commit("DEFINIR_USUARIO_LOGADO", {
            token: res.data.access_token,
            usuario: res.data.user,
          });
          this.$router.push({ name: "gerentes" });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
