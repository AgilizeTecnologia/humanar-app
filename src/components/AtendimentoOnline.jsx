import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, FileText, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AtendimentoOnline = () => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! Bem-vindo ao atendimento online da Secretaria de Defesa do Consumidor do DF. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('produto') || input.includes('defeito')) {
      return 'Entendo que você está com problema em um produto. De acordo com o Art. 18 do CDC, você tem direito a reparo, troca ou devolução do valor. Pode me fornecer mais detalhes sobre o produto e o defeito?';
    }

    if (input.includes('serviço') || input.includes('atendimento')) {
      return 'Problemas com serviços são protegidos pelo CDC. Você pode me contar mais sobre o serviço contratado e qual foi o problema específico?';
    }

    if (input.includes('cobrança') || input.includes('valor')) {
      return 'Cobranças indevidas são uma violação grave dos direitos do consumidor. Você tem os comprovantes dessa cobrança? Pode me informar o valor e quando ocorreu?';
    }

    if (input.includes('contrato') || input.includes('cancelar')) {
      return 'Para cancelamento de contratos, você tem direitos específicos. Em compras online, há o direito de arrependimento de 7 dias (Art. 49 do CDC). Pode me informar qual tipo de contrato deseja cancelar?';
    }

    if (input.includes('prazo') || input.includes('tempo')) {
      return 'Os prazos variam conforme o tipo de problema: 30 dias para produtos não duráveis, 90 dias para produtos duráveis, e 7 dias para arrependimento em compras online. Sobre qual prazo você gostaria de saber mais?';
    }

    if (input.includes('nota fiscal') || input.includes('comprovante')) {
      return 'A nota fiscal é um documento importante, mas não é o único meio de prova. Você pode usar comprovantes de pagamento, mensagens, emails e outros documentos. Tem algum desses comprovantes?';
    }

    if (input.includes('garantia')) {
      return 'A garantia legal é de 30 dias para produtos não duráveis e 90 dias para produtos duráveis, além da garantia contratual oferecida pelo fabricante. Sobre qual produto você tem dúvidas de garantia?';
    }

    if (input.includes('devolução') || input.includes('reembolso')) {
      return 'Você tem direito à devolução do valor pago em diversas situações: produto com defeito, não entrega, arrependimento (compras online). Qual é a sua situação específica?';
    }

    if (input.includes('procon')) {
      return 'O PROCON é o órgão de defesa do consumidor. Você pode registrar reclamações presencialmente ou online. Posso ajudá-lo a preparar sua reclamação. Qual é o problema que você gostaria de relatar?';
    }

    if (input.includes('obrigado') || input.includes('valeu')) {
      return 'Por nada! Estou aqui para ajudar. Se tiver mais alguma dúvida sobre seus direitos como consumidor, é só perguntar!';
    }

    if (input.includes('ajuda') || input.includes('dúvida')) {
      return 'Claro! Estou aqui para esclarecer suas dúvidas sobre direitos do consumidor. Você pode me perguntar sobre: produtos com defeito, cobranças indevidas, cancelamento de contratos, prazos, garantias, e muito mais. Como posso ajudar?';
    }

    // Resposta padrão
    return 'Entendo sua situação. Para melhor orientá-lo, pode fornecer mais detalhes sobre o problema? Por exemplo: qual produto/serviço, nome da empresa, quando ocorreu o problema, e o que você já tentou fazer para resolver?';
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated()) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Autenticação Necessária</h3>
              <p className="text-yellow-700 mt-1">
                Por favor, faça login para acessar o atendimento online.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Atendimento Online</h1>
          <p className="text-blue-100">
            Tire suas dúvidas sobre direitos do consumidor com nosso assistente virtual
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[70%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-br from-green-500 to-green-600'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <UserIcon className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div
                      className={`flex items-center mt-1 text-xs text-gray-500 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[70%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Dicas para um melhor atendimento:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Descreva seu problema de forma clara e objetiva</li>
          <li>• Informe o nome da empresa e o tipo de produto/serviço</li>
          <li>• Mencione quando ocorreu o problema e o que você já tentou fazer</li>
          <li>• Tenha em mãos documentos como nota fiscal e comprovantes</li>
        </ul>
      </div>
    </div>
  );
};

export default AtendimentoOnline;

