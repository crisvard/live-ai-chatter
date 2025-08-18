import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, agentConfig } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    console.log('Received request:', { text, agentConfig });
    console.log('GEMINI_API_KEY available:', !!GEMINI_API_KEY);
    
    if (!text) {
      console.error('No text provided');
      throw new Error('Text is required');
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment');
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Configure the agent personality and instructions
    const systemInstruction = agentConfig?.systemInstruction || 
      "Você é um assistente virtual amigável e útil. Responda de forma concisa e natural, como se estivesse conversando por telefone.";

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `${systemInstruction}\n\nUsuário: ${text}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: agentConfig?.temperature || 0.7,
        maxOutputTokens: agentConfig?.maxOutputTokens || 150,
      }
    };

    console.log('Sending request to Gemini API with payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', data);
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua mensagem.';
    console.log('Extracted AI response:', aiResponse);

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in voice-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});