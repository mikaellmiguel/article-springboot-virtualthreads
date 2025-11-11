import http from 'k6/http';
import { sleep, check } from 'k6';

// 1. Definição das Opções do Teste
export const options = {
  // O executor 'ramping-vus' permite definir etapas (stages)
  // para aumentar e diminuir a carga.
  executor: 'ramping-vus',

  stages: [
    // Etapa 1: Ramp-up (Aumento)
    // Aumenta de 0 para 500 VUs em 30 segundos.
    { duration: '30s', target: 500 },

    // Etapa 2: Peak (Pico de Concorrência)
    // Mantém 500 VUs constantes por 1 minuto.
    // É aqui que você realmente testa a alta concorrência.
    { duration: '1m', target: 500 },

    // Etapa 3: Ramp-down (Redução)
    // Reduz de 500 de volta para 0 VUs em 15 segundos.
    { duration: '15s', target: 0 },
  ],

  // (Opcional) Limites para o teste falhar se a performance for ruim
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% das requests devem ser < 500ms
    'http_req_failed': ['rate<0.01'],   // Taxa de falha deve ser < 1%
  },
};

// 2. O Código do Teste (O que cada VU faz)
export default function () {
  // Define o endpoint que você quer testar
  const res = http.get('http://localhost:8080/thread/test');

  // Verifica se a request foi bem-sucedida (status 200)
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Pausa (think time) - Simula um usuário lendo a página
  // É crucial para um teste realista!
  sleep(1);
}