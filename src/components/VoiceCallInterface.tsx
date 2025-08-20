import React, { useState, useEffect } from 'react'; // Importe o useEffect aqui
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useVoiceCall } from '@/hooks/useVoiceCall';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Settings, 
  User, 
  MessageSquare,
  Trash2
} from 'lucide-react';

const VoiceCallInterface = () => {
  const { toast } = useToast();
  const {
    callState,
    agentConfig,
    conversationHistory,
    startCall,
    endCall,
    updateAgentConfig,
    clearHistory,
  } = useVoiceCall();

  const [showSettings, setShowSettings] = useState(false);

  // --- CÓDIGO ADICIONADO PARA LISTAR AS VOZES NO CONSOLE ---
  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log("Vozes disponíveis no seu navegador:", voices);
        const ptBrVoices = voices.filter(voice => voice.lang === 'pt-BR');
        console.log("Vozes filtradas (PT-BR):", ptBrVoices);
      } else {
        console.log("Aguardando o carregamento das vozes...");
      }
    };

    // A lista de vozes pode carregar de forma assíncrona
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    } else {
      getVoices();
    }
  }, []);
  // ----------------------------------------------------------

  const handleStartCall = async () => {
    try {
      await startCall();
      toast({
        title: "Chamada iniciada",
        description: `Conectado com ${agentConfig.name}`,
      });
    } catch (error) {
      toast({
        title: "Erro na chamada",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive",
      });
    }
  };

  const handleEndCall = () => {
    endCall();
    toast({
      title: "Chamada encerrada",
      description: "Desconectado do agente",
    });
  };

  const getCallStatusColor = () => {
    if (callState.isSpeaking) return "bg-blue-500";
    if (callState.isProcessing) return "bg-yellow-500";
    if (callState.isListening) return "bg-green-500";
    return "bg-gray-500";
  };

  const getCallStatusText = () => {
    if (callState.isSpeaking) return "IA falando...";
    if (callState.isProcessing) return "Processando...";
    if (callState.isListening) return "Ouvindo...";
    return "Desconectado";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Chamada de IA
          </h1>
          <p className="text-muted-foreground">
            Converse com seu assistente virtual por voz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Call Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Call Status Card */}
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-20 h-20 rounded-full ${getCallStatusColor()} flex items-center justify-center animate-pulse`}>
                  <User className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {agentConfig.name}
                  </h2>
                  <Badge variant="secondary" className="mt-2">
                    {getCallStatusText()}
                  </Badge>
                </div>

                {/* Call Status Icons */}
                <div className="flex items-center space-x-4 text-muted-foreground">
                  {callState.isListening ? (
                    <Mic className="w-5 h-5 text-green-500" />
                  ) : (
                    <MicOff className="w-5 h-5" />
                  )}
                  {callState.isSpeaking && (
                    <Volume2 className="w-5 h-5 text-blue-500 animate-pulse" />
                  )}
                </div>

                {/* Call Controls */}
                <div className="flex space-x-4">
                  {!callState.isConnected ? (
                    <Button
                      onClick={handleStartCall}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Iniciar Chamada
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEndCall}
                      size="lg"
                      variant="destructive"
                    >
                      <PhoneOff className="w-5 h-5 mr-2" />
                      Encerrar Chamada
                    </Button>
                  )}

                  <Button
                    onClick={() => setShowSettings(!showSettings)}
                    size="lg"
                    variant="outline"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </Card>

            {/* Conversation History */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Histórico da Conversa
                </h3>
                {conversationHistory.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                )}
              </div>

              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {conversationHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhuma conversa ainda. Inicie uma chamada para começar!
                    </p>
                  ) : (
                    conversationHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <Card className={`p-4 transition-all duration-300 ${showSettings ? 'opacity-100' : 'opacity-50'}`}>
              <h3 className="text-lg font-semibold mb-4">Configurações do Agente</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agentName">Nome do Agente</Label>
                  <Input
                    id="agentName"
                    value={agentConfig.name}
                    onChange={(e) => updateAgentConfig({ name: e.target.value })}
                    disabled={callState.isConnected}
                  />
                </div>

                <div>
                  <Label htmlFor="systemInstruction">Personalidade</Label>
                  <Textarea
                    id="systemInstruction"
                    value={agentConfig.systemInstruction}
                    onChange={(e) => updateAgentConfig({ systemInstruction: e.target.value })}
                    disabled={callState.isConnected}
                    rows={4}
                    placeholder="Descreva como o agente deve se comportar..."
                  />
                </div>

                <Separator />

                <div>
                  <Label>Temperatura: {agentConfig.temperature}</Label>
                  <Slider
                    value={[agentConfig.temperature]}
                    onValueChange={([value]) => updateAgentConfig({ temperature: value })}
                    min={0}
                    max={1}
                    step={0.1}
                    disabled={callState.isConnected}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Controla a criatividade das respostas
                  </p>
                </div>

                <div>
                  <Label>Máximo de Tokens: {agentConfig.maxOutputTokens}</Label>
                  <Slider
                    value={[agentConfig.maxOutputTokens]}
                    onValueChange={([value]) => updateAgentConfig({ maxOutputTokens: value })}
                    min={50}
                    max={500}
                    step={25}
                    disabled={callState.isConnected}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Controla o tamanho das respostas
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-4 bg-muted/50">
          <h4 className="font-semibold mb-2">Como usar:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Configure o agente antes de iniciar a chamada</li>
            <li>• Clique em "Iniciar Chamada" e permita acesso ao microfone</li>
            <li>• Fale naturalmente - o agente irá responder por voz</li>
            <li>• O histórico da conversa será exibido em tempo real</li>
            <li>• Use "Encerrar Chamada" para finalizar</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default VoiceCallInterface;