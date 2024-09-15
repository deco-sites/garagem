import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      // Obtém os dados JSON do request
      const data = await req.json();
      const { nomeCompleto, creci, telefone, email, faturamentoMensal, carteiraImovel } = data;

      // Enviar os dados para o endpoint do Zapier
      const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/16331030/24oinhf/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!zapierResponse.ok) {
        throw new Error('Erro ao enviar dados para o Zapier');
      }

      const headers = new Headers();

      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } catch (error) {
      console.error('Erro no processamento:', error);
      return new Response(JSON.stringify({ error: 'Erro ao processar os dados' }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};