import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, X } from 'lucide-react';
import botAvatar from '../../assets/img/bot-avatar.jpg';
import './ChatbotWeb.css';

interface Mensagem {
  id: string;
  texto: string;
  remetente: 'user' | 'bot';
  horario: string;
}

// 1. Dicionário de respostas programadas
const RESPOSTAS_PROGRAMADAS: { [chave: string]: string } = {
  perfil: "Para acessar seu Perfil, clique na sua foto no canto superior direito do menu principal.",
  documento: "Seus documentos estão listados na tela principal. Você pode filtrá-los usando a barra de busca!",
  status: "Os status dos documentos podem ser: Aprovado (verde), Em Análise (amarelo) e Pendente (vermelho).",
  enviar: "Para enviar um novo documento, clique no botão azul com o sinal de '+' no canto inferior direito.",
  ajuda: "Posso te ajudar com dúvidas sobre: Perfil, Documentos, Status ou Envio de arquivos. O que precisa?",
};

// 2. Lógica para buscar a resposta correta
const obterRespostaBot = (mensagemUsuario: string): string => {
  const textoMinusculo = mensagemUsuario.toLowerCase();

  // Procura se alguma palavra-chave está presente na mensagem do usuário
  for (const chave in RESPOSTAS_PROGRAMADAS) {
    if (textoMinusculo.includes(chave)) {
      return RESPOSTAS_PROGRAMADAS[chave];
    }
  }

  // Resposta padrão caso ele não reconheça a palavra
  return "Desculpe, ainda não sei responder sobre isso. Tente perguntar sobre 'perfil', 'documentos', 'status' ou 'ajuda'!";
};

export default function ChatbotWeb() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: '1',
      texto: 'Olá! Sou o Doc, o assistente do CentralDocs. Como posso te ajudar com seus documentos hoje?',
      remetente: 'bot',
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputTexto, setInputTexto] = useState('');
  const [isDigitando, setIsDigitando] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [mensagens, isDigitando, isOpen]);

  const enviarMensagem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputTexto.trim()) return;

    const novaMensagemUsuario: Mensagem = {
      id: Date.now().toString(),
      texto: inputTexto,
      remetente: 'user',
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    const textoEnviado = inputTexto;
    setInputTexto('');
    setIsDigitando(true);

    setTimeout(() => {
      const textoResposta = obterRespostaBot(textoEnviado);

      const respostaBot: Mensagem = {
        id: (Date.now() + 1).toString(),
        texto: textoResposta,
        remetente: 'bot',
        horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMensagens((prev) => [...prev, respostaBot]);
      setIsDigitando(false);
    }, 1000);
  };

  return (
    <div className="chatbot-floating-container">
      {isOpen && (
        <div className="chatbot-window w-full max-w-md h-[600px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans">
          
          {/* Header do Chat */}
          <div className="chatbot-header bg-slate-950 px-5 py-4 border-b border-slate-800 flex justify-between items-center">
            <div className="chatbot-header-info flex items-center gap-3">
              <div className="chatbot-avatar-box">
                <img src={botAvatar} alt="Doc" className="chatbot-avatar-img-header" />
              </div>
              <div>
                <h3 className="chatbot-header-title text-sm font-semibold text-white">Doc</h3>
                <span className="chatbot-status text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="chatbot-pulse-dot w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chatbot-action-btn"
                title="Fechar"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="chatbot-messages-area flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {mensagens.map((msg) => {
              const isUser = msg.remetente === 'user';
              return (
                <div
                  key={msg.id}
                  className={`chatbot-msg-row flex items-end gap-2 ${isUser ? 'user justify-end' : 'bot justify-start'}`}
                >
                  {!isUser && (
                    <img src={botAvatar} alt="Doc" className="chatbot-avatar-img-msg" />
                  )}

                  <div
                    className={`chatbot-bubble max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.texto}</p>
                    <span
                      className={`chatbot-msg-time block text-[9px] mt-1 text-right ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.horario}
                    </span>
                  </div>

                  {isUser && (
                    <div className="chatbot-avatar-small w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indicador de Digitação */}
            {isDigitando && (
              <div className="chatbot-typing-container flex items-center gap-2 text-slate-400 text-xs">
                <img src={botAvatar} alt="Doc" className="chatbot-avatar-img-msg" />
                <div className="chatbot-typing-bubble bg-slate-800 border border-slate-700/60 rounded-2xl px-4 py-3 rounded-bl-none flex items-center gap-1">
                  <span className="chatbot-typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="chatbot-typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="chatbot-typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Campo de Entrada (Input) */}
          <form onSubmit={enviarMensagem} className="chatbot-form p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              className="chatbot-input flex-1 bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              disabled={!inputTexto.trim()}
              className="chatbot-send-btn bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-3 rounded-xl transition flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Botão Flutuante (FAB) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="chatbot-toggle-btn"
        title="Assistente Doc"
        aria-label="Abrir assistente virtual Doc"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
