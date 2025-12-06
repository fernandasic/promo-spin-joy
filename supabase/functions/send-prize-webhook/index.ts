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
    const webhookUrl = Deno.env.get('WEBHOOK');
    
    if (!webhookUrl) {
      console.error('WEBHOOK secret not configured');
      return new Response(
        JSON.stringify({ error: 'Webhook URL not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { nome, telefone, premio, premio_id } = await req.json();

    console.log('Sending prize to webhook:', { nome, telefone, premio, premio_id });

    const payload = {
      nome,
      telefone,
      premio,
      premio_id,
      data: new Date().toISOString(),
    };

    console.log('Payload:', JSON.stringify(payload));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('Webhook response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}: ${responseText}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Prize sent successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending to webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
