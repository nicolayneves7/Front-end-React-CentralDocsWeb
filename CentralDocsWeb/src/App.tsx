import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Efficiency from "./components/Efficiency/Efficiency";
import CTA from "./components/Cta/Cta";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueceuSenha from "./pages/EsqueceuSenha/EsqueceuSenha";
import Documentos from "./pages/TelaDocumento/Documento";
import Institucional from "./pages/Institucional/Institucional";
import Perfil from "./pages/Perfil/Perfil";
import Acessibilidade from "./pages/Acessibilidade/Acessibilidade";
import PerguntasFrequentes from "./pages/PerguntasFrequentes/PerguntasFrequentes";
import CadastrarDocumento from "./pages/CadastrarDocumento/CadastrarDocumento";
import Configuracoes from "./pages/Configuracao/Configuracoes";
import Demonstracao from "./pages/Demonstracao/Demonstracao";

import ChatbotWeb from "./components/ChatbotWeb/ChatbotWeb";

import "./index.css";
import "./App.css";

function Home() {
  return (
    <div className="app-wrapper">
      <Header
        exibirMenuLateral={false}
        exibirNav={false}
        exibirBusca={false}
      />
      <Hero />
      <Efficiency />
      <CTA />
      <Footer />
    </div>
  );
}

function RotaPrivada({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AplicarTemaSalvo() {
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") || "claro";
    const perfilCorSalvo = localStorage.getItem("perfilCor") || "padrao";

    document.body.classList.remove("tema-claro", "tema-escuro");
    document.body.classList.add(`tema-${temaSalvo}`);

    document.body.classList.remove(
      "cor-padrao",
      "cor-monocromatico",
      "cor-protanopia",
      "cor-tritanopia"
    );
    document.body.classList.add(`cor-${perfilCorSalvo}`);
  }, []);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AplicarTemaSalvo />

      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/demonstracao" element={<Demonstracao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />

        {/* Rotas privadas */}
        <Route
          path="/documentos"
          element={
            <RotaPrivada>
              <Documentos />
            </RotaPrivada>
          }
        />

        <Route
          path="/institucional"
          element={
            <RotaPrivada>
              <Institucional />
            </RotaPrivada>
          }
        />

        <Route
          path="/perfil"
          element={
            <RotaPrivada>
              <Perfil />
            </RotaPrivada>
          }
        />

        <Route
          path="/acessibilidade"
          element={
            <RotaPrivada>
              <Acessibilidade />
            </RotaPrivada>
          }
        />

        <Route
          path="/perguntas-frequentes"
          element={
            <RotaPrivada>
              <PerguntasFrequentes />
            </RotaPrivada>
          }
        />

        <Route
          path="/documentos/novo"
          element={
            <RotaPrivada>
              <CadastrarDocumento />
            </RotaPrivada>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <RotaPrivada>
              <Configuracoes />
            </RotaPrivada>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ChatbotWeb />
    </BrowserRouter>
  );
}

export default App;