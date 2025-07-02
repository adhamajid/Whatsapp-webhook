# Whatsapp-webhook
Integrasi API Whatsapp dengan webhook

Panduan ini akan memandu Anda melalui langkah-langkah awal untuk menyiapkan proyek bot WhatsApp menggunakan **Node.js** dan library **whatsapp-web.js**.

## 1. Membuat Proyek

Pertama, buat folder baru untuk proyek Anda dan navigasikan ke dalamnya melalui terminal atau command prompt:

```bash
mkdir whatsapp-bot
cd whatsapp-bot
````

Kemudian, inisialisasi proyek Node.js baru. Perintah ini akan membuat file `package.json` dengan konfigurasi default:

```bash
npm init -y
```

## 2. Menginstal whatsapp-web.js dan Dependensinya

Selanjutnya, instal library utama `whatsapp-web.js` beserta dependensi pendukung:

```bash
npm install whatsapp-web.js qrcode-terminal
```

* `whatsapp-web.js` adalah library utama untuk berinteraksi dengan WhatsApp Web.
* `qrcode-terminal` digunakan untuk menampilkan QR code di terminal saat proses autentikasi.

---

✅ **Lingkungan pengembangan Anda sekarang telah siap untuk mulai membuat kode bot WhatsApp!**

```

Jika kamu ingin menambahkan contoh kode awal, dokumentasi lanjutan, atau lisensi, saya bisa bantu juga.
```

- `whatsapp-web.js`: Library utama untuk berinteraksi dengan WhatsApp Web
- `qrcode-terminal`: Untuk menampilkan QR code autentikasi di terminal

---

## 3. Setting Up the Bot

Buat file `bot.js` di folder proyek Anda dan mulai dengan mengimpor module yang dibutuhkan:

```js
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
```

💡 *Scan QR code yang muncul di terminal dengan WhatsApp Anda untuk menghubungkan bot.*

---

## 4. Basic Bot Functionalities

### 📥 Menerima Pesan

Untuk mendeteksi pesan masuk:

```js
client.on('message', message => {
    console.log(message.body);
});
```

### 📤 Membalas Pesan

Contoh membalas pesan `!ping`:

```js
client.on('message', message => {
    if(message.body === '!ping') {
        message.reply('pong');
    }
});
```

### 📚 Menangani Beberapa Perintah

```js
client.on('message', async (message) => {
    if (message.body.startsWith('!')) {
        const command = message.body.slice(1).split(' ')[0];
        const args = message.body.slice(1).split(' ').slice(1);

        switch(command) {
            case 'ping':
                await message.reply('pong');
                break;
            case 'hello':
                await message.reply('Hello! How can I help you?');
                break;
            case 'info':
                await message.reply(`Your number is: ${message.from}\nYou sent: ${args.join(' ')}`);
                break;
            default:
                await message.reply('Unrecognized command. Try !ping, !hello, or !info.');
        }
    }
});
```

Untuk menjalankan bot:

```bash
node bot.js
```

---

## 5. Advanced Features

### ✅ Mengirim Pesan ke Kontak Spesifik

```js
async function sendMessageToContact(number, message) {
    const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
    await client.sendMessage(chatId, message);
}

client.on('message', async (message) => {
    if (message.body === '!send') {
        await sendMessageToContact('1234567890@c.us', 'Hello from the bot!');
        message.reply('Message sent to the specified contact.');
    }
});
```

### 🖼️ Mengirim Media

#### Gambar

```js
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

client.on('message', async (message) => {
    if (message.body === '!image') {
        const media = MessageMedia.fromFilePath('./image.jpg');
        await message.reply(media);
    }
});
```

#### Dokumen

```js
client.on('message', async (message) => {
    if (message.body === '!document') {
        const media = MessageMedia.fromFilePath('./document.pdf');
        await message.reply(media, undefined, { caption: 'Here is the requested document' });
    }
});
```

### 👥 Membuat Grup & Menambahkan Peserta

#### Membuat Grup

```js
async function createGroup(name, participants) {
    const group = await client.createGroup(name, participants);
    return group;
}

client.on('message', async (message) => {
    if (message.body.startsWith('!creategroup')) {
        const groupName = message.body.split(' ').slice(1).join(' ');
        const participants = ['1234567890@c.us', '0987654321@c.us'];

        try {
            const group = await createGroup(groupName, participants);
            message.reply(`Group "${groupName}" created successfully!`);
        } catch (error) {
            console.error('Error creating group:', error);
            message.reply('Sorry, I couldn\'t create the group.');
        }
    }
});
```

#### Menambahkan Peserta ke Grup

```js
client.on('message', async (message) => {
    if (message.body.startsWith('!addtogroup')) {
        const participantNumber = message.body.split(' ')[1];

        try {
            const chat = await message.getChat();
            if (chat.isGroup) {
                await chat.addParticipants([`${participantNumber}@c.us`]);
                message.reply('Participant added successfully!');
            }
        } catch (error) {
            console.error('Error adding participant:', error);
            message.reply('Sorry, I couldn\'t add the participant.');
        }
    }
});
```

---

## 🚀 Penutup

Dengan mengikuti panduan ini, Anda sekarang memiliki dasar untuk membuat bot WhatsApp dengan berbagai fitur dasar hingga lanjutan.  
Gunakan kreativitas Anda untuk membangun fitur lebih canggih lagi!

---

## 📄 License

MIT License © [adhamajid]

---

## 🙋‍♂️ Need Help?

Jika Anda memiliki pertanyaan atau ingin kontribusi ke proyek ini, silakan buat [issue](https://github.com/adhamajid/whatsapp-webhook/issues) atau kirim PR.
