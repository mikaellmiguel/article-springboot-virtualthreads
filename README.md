## Article: Java Virtual Threads

- **Propósito:**: Este repositório acompanha o artigo que compara o comportamento de aplicações Java usando o modelo de threads tradicional (modelo "tradicional") versus o uso de *threads virtuais* (virtual threads). Os testes de carga foram executados com o `k6` e os resultados brutos estão na pasta `results/`.

**Organização do repositório**
- **`threadsvirtuais/`**: Código-fonte da aplicação Spring Boot usada nos testes.
	- Controller principal: [src/main/java/com/cin/threadsvirtuais/controllers/ThreadController.java](threadsvirtuais/src/main/java/com/cin/threadsvirtuais/controllers/ThreadController.java#L1-L40)
- **`teste-carga/`**: script de carga `k6` usado para todas as execuções.
	- Script K6: [teste-carga/script.js](teste-carga/script.js#L1-L80)
- **`results/`**: arquivos JSON com os resultados das execuções de carga.

**Resultados (`results/`)**
- Os arquivos no diretório `results/` seguem a convenção de nomes onde os prefixos identificam o modo testado:
	- **`rs*.json`**: resultados obtidos com o *modelo tradicional* (threads padrão do JVM).
	- **`rv*.json`**: resultados obtidos com *threads virtuais*.
- Exemplos: [results/rs100.json](results/rs100.json), [results/rv100.json](results/rv100.json).

**Script de carga (k6)**
- Local: [teste-carga/script.js](teste-carga/script.js#L1-L80)
- O script usa o executor `ramping-vus` e realiza um ramp-up até 1000 VUs conforme definido nas `stages`.
- Endpoint testado: `GET http://localhost:8080/thread/test` (mesmo endpoint para ambos os modos).

**Endpoint e comportamento da aplicação**
- Endpoint: `GET /thread/test` (ver [ThreadController.java](threadsvirtuais/src/main/java/com/cin/threadsvirtuais/controllers/ThreadController.java#L1-L40)).
- Comportamento: o endpoint faz um `Thread.sleep(200)` para simular operação bloqueante e retorna `OK`.

**Como reproduzir os testes (resumo)**
- 1) Iniciar a aplicação Spring Boot (pasta `threadsvirtuais/`). No Windows:

```powershell
cd threadsvirtuais
.\mvnw.cmd spring-boot:run
```

- 2) Executar o `k6` apontando o script e salvar o resultado JSON em `results/`. Exemplo:

```bash
k6 run --out json=results/rs100.json teste-carga/script.js
```

- Para testar o modo de *threads virtuais*, execute a aplicação configurada/compilada para usar virtual threads (conforme o procedimento experimental que você adotou para o artigo) e nomeie a saída como `results/rv*.json` ao rodar o `k6`.

**Notas**
- O repositório contém os artefatos de build em `target/` e configurações auxiliares (`Dockerfile`, `docker-compose.yml`, `prometheus.yml`).
- Ajustes finos (por exemplo versão do Java necessária para threads virtuais) não estão documentados aqui — mantenha Java compatível com virtual threads (Java 21+ ou conforme sua configuração) quando reproduzir os testes com `rv`.

Se quiser, eu adiciono instruções detalhadas para rodar a aplicação com virtual threads (flags JVM, perfis de Spring, ou Docker) e exemplos exatos de comandos `k6` usados para cada arquivo de `results/`.

