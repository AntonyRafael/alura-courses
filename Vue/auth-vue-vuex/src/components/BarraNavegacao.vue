<template>
  <nav class="navbar navbar-expand-lg navbar-bytebank">
    <a class="navbar-brand" href="#">ByteBank</a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon">s</span>
    </button>
    <div class="collapse navbar-collapse">
      <BarraNavegacaoLogado v-if="usuarioEstaLogado" />
      <BarraNavegacaoDeslogado v-else />
    </div>
  </nav>
</template>

<script>
import BarraNavegacaoLogado from "@/components/BarraNavegacaoLogado";
import BarraNavegacaoDeslogado from "@/components/BarraNavegacaoDeslogado";
import { mapGetters } from "vuex"

export default {
  components: {
    BarraNavegacaoLogado,
    BarraNavegacaoDeslogado,
  },

  computed: {
    ...mapGetters(['usuarioEstaLogado'])
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
