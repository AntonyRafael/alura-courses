import Home from "./components/Home/Home.vue";
// import Cadastro from "./components/Cadastro/Cadastro.vue";
const Cadastro = () => System.import("./components/Cadastro/Cadastro.vue");

export const routes = [
  { path: "", name: "home", component: Home, titulo: "Home", menu: true },
  {
    path: "/cadastro",
    name: "cadastro",
    component: Cadastro,
    titulo: "Cadastro",
    menu: true
  },
  {
    path: "/cadastro/:id",
    name: "alterar",
    component: Cadastro,
    titulo: "Cadastro",
    menu: false
  },
  { path: "*", component: Home, menu: false }
];
