import http from 'k6/http';
import { check } from 'k6';

// 1. Definição das Opções do Teste
export const options = {

  executor: 'ramping-vus',

  stages: [

    { duration: '1m', target: 1000 },


    { duration: '2m', target: 1000 },


    { duration: '30s', target: 0 },
  ],

};


export function setup() {
    const inicio = new Date();
    console.log(`Início do teste: ${inicio.toISOString()}`);
    return { inicio }; // podemos passar dados para o teardown
}

export function teardown(data) {
    const fim = new Date();
    console.log(`Fim do teste: ${fim.toISOString()}`);
}

// 2. O Código do Teste (O que cada VU faz)
export default function () {
  // Define o endpoint que você quer testar
  const res = http.get('http://localhost:8080/thread/test');

  // Verifica se a request foi bem-sucedida (status 200)
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}