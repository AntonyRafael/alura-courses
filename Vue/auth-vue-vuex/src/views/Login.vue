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
      <p class="alert alert-danger" v-if="mensagemErro">{{ mensagemErro }}</p>
      <button type="submit" class="btn btn-primary btn-block">Logar</button>
      <router-link :to="{ name: 'novo.usuario' }">Cadastre-se</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mensagemErro: "",
      usuario: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    efetuarLogin() {
      this.$store
        .dispatch("efetuarLogin", this.usuario)
        .then(() => {
          this.$router.push({ name: "gerentes" });
          this.mensagemErro = "";
        })
        .catch((erro) => {
          if (erro.request.status === 401) {
            this.mensagemErro = "Login ou senha inválido(s) !";
          }
        });
    },
  },
};
</script>

<style></style>
