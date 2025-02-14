const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const fs = require('fs');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth()
});

const app = express();
const port = 3000;

const dataDir = path.resolve(__dirname, 'data');
const visualizacaoUnicaDir = path.resolve(__dirname, 'visualizacao_unica');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(visualizacaoUnicaDir)) fs.mkdirSync(visualizacaoUnicaDir, { recursive: true });

const saveMessage = (msg) => {
    const messagesFile = path.join(dataDir, 'messages.json');
    let messages = [];

    if (fs.existsSync(messagesFile)) {
        messages = JSON.parse(fs.readFileSync(messagesFile));
    }

    messages.push({
        from: msg.from,
        body: msg.body || '',
        timestamp: msg.timestamp
    });

    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
};

client.on('qr', qr => {
    console.log('[QR CODE] Escaneie o QR Code para conectar:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('[BOT PRONTO] Bot conectado com sucesso!');
});

client.on('message', async msg => {
    console.log(`[MENSAGEM RECEBIDA] de [${msg.from}] - [MENSAGEM: ${msg.body || 'Mídia Recebida'}]`);
    saveMessage(msg);

    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        let mediaPath;

        switch (msg.type) {
            case 'audio':
            case 'ptt':
                mediaPath = path.join(dataDir, `${msg.id.id}.ogg`);
                break;
            case 'image':
                mediaPath = path.join(dataDir, `${msg.id.id}.jpg`);
                break;
            case 'video':
                mediaPath = path.join(dataDir, `${msg.id.id}.mp4`);
                break;
            case 'sticker':
                mediaPath = path.join(dataDir, `${msg.id.id}.webp`);
                break;
            case 'document':
                mediaPath = path.join(dataDir, `${msg.id.id}${msg.filename ? path.extname(msg.filename) : '.file'}`);
                break;
            default:
                mediaPath = path.join(dataDir, `${msg.id.id}${path.extname(msg.filename || '')}`);
        }

        fs.writeFileSync(mediaPath, Buffer.from(media.data, 'base64'));
        console.log(`[MÍDIA SALVA] Tipo: ${msg.type} - Caminho: ${mediaPath}`);
    }

    if (msg.hasMedia && msg.isViewOnce) {
        const media = await msg.downloadMedia();
        let mediaPath = path.join(visualizacaoUnicaDir, `${msg.id.id}`);

        if (msg.type === 'image') {
            mediaPath += '.jpg';
        } 
        else if (msg.type === 'video') {
            mediaPath += '.mp4';
        } 
        else if (msg.type === 'sticker') {
            mediaPath += '.webp';
        }

        fs.writeFileSync(mediaPath, Buffer.from(media.data, 'base64'));
        console.log(`[VISUALIZAÇÃO ÚNICA SALVA] Tipo: ${msg.type} - Caminho: ${mediaPath}`);
    }
});

client.on('message', async msg => {
    if (msg.body.startsWith('!remover') && msg.isGroupMsg) {
        let chat = await msg.getChat();
        let mentions = msg.mentionedIds;

        if (mentions.length > 0) {
            for (let userId of mentions) {
                try {
                    await chat.removeParticipants([userId]);
                    console.log(`[ADMIN] Usuário [${userId}] removido do grupo [${chat.name}]`);
                } catch (error) {
                    console.log(`[ERRO] Não foi possível remover [${userId}] do grupo [${chat.name}]: ${error.message}`);
                }
            }
        } else {
            msg.reply('Mencione o usuário para remover.');
        }
    }
});

client.initialize();

app.get('/', (req, res) => {
    res.send('<h1>Escaneie o QR Code no terminal para conectar o bot</h1>');
});

app.listen(port, () => {
    console.log(`[SERVIDOR] Rodando em http://localhost:${port}`);
});
