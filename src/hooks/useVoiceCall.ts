import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AgentConfig {
  name: string;
  systemInstruction: string;
  voice: string;
  temperature: number;
  maxOutputTokens: number;
}

interface CallState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

export const useVoiceCall = () => {
  const [callState, setCallState] = useState<CallState>({
    isConnected: false,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
  });

  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: 'Assistente IA',
    systemInstruction: 'Você é um assistente virtual amigável e útil. Responda de forma concisa e natural.',
    voice: 'pt-BR',
    temperature: 0.7,
    maxOutputTokens: 150,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);

  const startCall = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      throw new Error('Reconhecimento de voz não suportado neste navegador');
    }

    const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = agentConfig.voice;

    recognition.onstart = () => {
      setCallState(prev => ({ ...prev, isConnected: true, isListening: true }));
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      
      if (transcript.trim()) {
        setCallState(prev => ({ ...prev, isListening: false, isProcessing: true }));
        
        // Add user message to history
        setConversationHistory(prev => [...prev, {
          role: 'user',
          content: transcript,
          timestamp: new Date()
        }]);

        try {
          // Send to Gemini via edge function
          const { data, error } = await supabase.functions.invoke('voice-chat', {
            body: { 
              text: transcript,
              agentConfig: agentConfig 
            }
          });

          if (error) throw error;

          const aiResponse = data.response;
          
          // Add AI response to history
          setConversationHistory(prev => [...prev, {
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
          }]);

          // Speak the response
          await speakText(aiResponse);
          
        } catch (error) {
          console.error('Error processing voice input:', error);
          await speakText('Desculpe, houve um erro. Tente novamente.');
        }
        
        setCallState(prev => ({ ...prev, isProcessing: false, isListening: true }));
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setCallState(prev => ({ ...prev, isListening: false }));
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [agentConfig]);

  const speakText = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        setCallState(prev => ({ ...prev, isSpeaking: true }));
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = agentConfig.voice;
        utterance.rate = 1;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setCallState(prev => ({ ...prev, isSpeaking: false }));
          resolve();
        };

        utterance.onerror = () => {
          setCallState(prev => ({ ...prev, isSpeaking: false }));
          resolve();
        };

        synthesisRef.current = utterance;
        speechSynthesis.speak(utterance);
      } else {
        resolve();
      }
    });
  }, [agentConfig.voice]);

  const endCall = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (synthesisRef.current) {
      speechSynthesis.cancel();
      synthesisRef.current = null;
    }

    setCallState({
      isConnected: false,
      isListening: false,
      isSpeaking: false,
      isProcessing: false,
    });
  }, []);

  const updateAgentConfig = useCallback((newConfig: Partial<AgentConfig>) => {
    setAgentConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
  }, []);

  return {
    callState,
    agentConfig,
    conversationHistory,
    startCall,
    endCall,
    updateAgentConfig,
    clearHistory,
  };
};