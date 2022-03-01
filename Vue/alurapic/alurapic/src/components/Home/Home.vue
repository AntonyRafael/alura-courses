<template>
  <div>
    <h1 class="centralizado">{{ title }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="Pesquise uma imagem..."
    />
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto of fotosComFiltro"
        :key="foto.title"
      >
        <meu-painel :titulo="foto.titulo">
          <iamgem-responsiva
            v-meu-transform:scale.animate="1.1"
            class="imagem-responsiva"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <router-link :to="{ name: 'alterar', params: { id: foto._id } }">
            <meu-button type="button" rotulo="Alterar" />
          </router-link>

          <meu-button
            type="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/imagemResponsiva.vue";
import Button from "../shared/button/Button.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "iamgem-responsiva": ImagemResponsiva,
    "meu-button": Button
  },
  data() {
    return {
      title: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
  methods: {
    remove(foto) {
      this.service.apaga(foto._id).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso";
        },
        err => {
          this.mensagem = err.message;
        }
      );
      // this.$http.delete(`/v1/fotos/${foto._id}`).then(
      //   () => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso";
      //   },
      //   err => {
      //     console.error(err);
      //     this.mensagem = "Falha na exclusão, tente novamente !";
      //   }
      // );
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    this.service.lista().then(
      fotos => (this.fotos = fotos),
      err => {
        this.mensagem = err.message;
      }
    );

    // this.$http
    //   .get("v1/fotos")
    //   .then(res => res.json())
    //   .then(fotos => (this.fotos = fotos));
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
