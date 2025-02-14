# 🤖 Chatbot para WhatsApp com Node.js

## Sobre o Projeto

Este é um **chatbot para WhatsApp** desenvolvido em **Node.js** utilizando a biblioteca `whatsapp-web.js`. O sistema permite:

- 📩 **Armazenamento de mensagens recebidas e enviadas**
- 📋 **Registro de status de contatos**
- 📂 **Salvamento automático de dados na pasta `/data`**
- 🎭 **Armazenamento de mídias, incluindo figurinhas**

O projeto está em **fase de testes**, buscando se tornar um sistema estável para conectar seu WhatsApp escaneando um **QR Code**. Esse código QR aparecerá no terminal ou poderá ser acessado via uma rota web utilizando **Express.js**.

### 🚀 Funcionalidades em Desenvolvimento

- 📥 **Monitoramento completo de mensagens recebidas**
- 🔒 **Salvamento de mídias recebidas em "visualização única"** (futuramente, qualquer mídia recebida nesse modo será salva no computador ou servidor onde o bot está rodando)
- 🛠 **Comandos disponíveis:**
  - `!remover` → Mencione uma pessoa para ser removida do grupo (em fase de testes, pode não funcionar corretamente)

Novos comandos e funcionalidades serão adicionados conforme o desenvolvimento do projeto avança.

## 📥 Instalação no Windows

1. Certifique-se de ter o **Node.js** instalado.
2. No terminal, execute o seguinte comando para instalar as dependências:
   ```sh
   npm install
   ```
3. Para iniciar o bot, utilize:
   ```sh
   node app.js
   ```
4. Ao iniciar pela primeira vez, um **QR Code** será exibido no terminal. Escaneie com o seu WhatsApp para conectar.

## 🛠 Contribuições & Feedback

Estamos em **fase de testes**, então qualquer feedback, sugestão ou report de bug é bem-vindo!

📩 **Contato:** [t.me/pladixoficial](https://t.me/pladixoficial)
