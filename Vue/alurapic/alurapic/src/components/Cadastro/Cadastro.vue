<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          name="titulo"
          v-model="foto.titulo"
          id="titulo"
          autocomplete="off"
          v-validate
          data-vv-rules="required|min:3|max:30"
          data-vv-as="título"
        />
        <span v-show="errors.has('titulo')" class="error">{{
          errors.first("titulo")
        }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          id="url"
          autocomplete="off"
          v-model="foto.url"
          name="foto"
          v-validate
          data-vv-rules="required"
        />
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
        <span v-show="errors.has('foto')" class="error">{{
          errors.first("foto")
        }}</span>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" type="submit" />
        <router-link :to="{ name: 'home' }">
          <meu-botao rotulo="VOLTAR" type="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/imagemResponsiva.vue";
import Botao from "../shared/button/Button.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },
  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },
  methods: {
    grava() {
      this.$validator.validateAll().then(sucess => {
        if (sucess) {
          this.service.cadastra(this.foto).then(
            () => {
              if (this.id) this.$router.push({ name: "home" });
              this.foto = new Foto();
            },
            err => console.error(err)
          );
        }
      });
      // this.$http.post("v1/fotos", this.foto).then(
      //   () => (this.foto = new Foto()),
      //   err => console.error(err)
      // );
    }
  },
  created() {
    // this.resource = this.$resource("v1/fotos");
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.service.busca(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.error {
  color: rgb(182, 52, 37);
  font-size: 14px;
}
</style>
