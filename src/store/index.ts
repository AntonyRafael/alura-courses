import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXLUIR_PROJETO,
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  EXLUIR_TAREFA,
} from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXLUIR_PROJETO](state, idDoProjeto: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != idDoProjeto);
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex(
        (tarefa) => tarefa.id == tarefa.id
      );
      state.tarefas[indice] = tarefa;
    },
    [EXLUIR_TAREFA](state, idDaTarefa) {
      state.tarefas.filter((tarefa) => tarefa.id != idDaTarefa);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
