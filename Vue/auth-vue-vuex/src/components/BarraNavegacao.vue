<template>
  <nav class="navbar navbar-expand-lg navbar-bytebank">
    <a class="navbar-brand" href="#">ByteBank</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <BarraNavegacaoLogado v-if="usuarioestaLogado" />
      <BarraNavegacaoDeslogado v-else />
    </div>
  </nav>
</template>

<script>
import BarraNavegacaoLogado from "@/components/BarraNavegacaoLogado";
import BarraNavegacaoDeslogado from "@/components/BarraNavegacaoDeslogado";

export default {
  components: {
    BarraNavegacaoLogado,
    BarraNavegacaoDeslogado,
  },

  computed: {
    usuarioestaLogado() {
      return Boolean(localStorage.getItem("token"));
    },
  },
};
</script>

<style>
.navbar {
  background: #27ae60;
}
.navbar-bytebank a {
  color: #fff;
}
.navbar-bytebank a:hover {
  color: #000;
}
</style>
