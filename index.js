const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Gunakan LocalAuth untuk auto-login tanpa QR
const client = new Client({
    authStrategy: new LocalAuth({ 
        dataPath: './session_data' // Folder penyimpanan session
    })
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async (message) => {
    const allowedNumber = '6281285345160@c.us';

    if (message.from !== allowedNumber) {
        console.log(`Pesan dari ${message.from} diabaikan.`);
        return; // Tidak lanjutkan jika bukan dari nomor yang diizinkan
    }

    // Lanjut proses jika nomor sesuai
    console.log(`Pesan diterima dari ${message.from}: ${message.body}`);
    if (message.body === '!ping') {
        await message.reply('pong');
    }
});

// client.on('message', async (message) => {
//     console.log(message.body);

//     if (message.body === '!ping') {
//         await message.reply('pong');
//         return;
//     }

//     if (message.body.startsWith('!')) {
//         const command = message.body.slice(1).split(' ')[0];
//         const args = message.body.slice(1).split(' ').slice(1);

//         switch(command) {
//             case 'hello':
//                 await message.reply('Hello! How can I help you?');
//                 break;
//             case 'info':
//                 await message.reply(`Your number is: ${message.from}\nYou sent: ${args.join(' ')}`);
//                 break;
//             default:
//                 await message.reply('Unrecognized command. Try !ping, !hello, or !info.');
//         }
//     }
// });
