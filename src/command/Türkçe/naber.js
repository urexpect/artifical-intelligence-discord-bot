const Discord = require('discord.js')

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

module.exports = {
    name: 'naber',
    aliases: ['nasılsın','nasılsın?','iyimisin','iyi misin','iyimisin?','iyi misin?'],
    dir: "Türkçe",
    cooldown: 1,
    permissions: [],
    
    run :async (client, message, args) => {  
         
      let yanitlar = [
          {
              cevap:"İyiyim sen nasılsın? 🙂",
              resim: false,
          },
          {
            cevap:"İyiyim kanka senden naber? 🙂",
            resim: false,
        },
          {
            cevap:"Şeyy aslında çok kötüyüm, bana seksen iki uygularsan iyileşebilirim.",
            resim: true,
            resim_url: "https://raw.githubusercontent.com/urexpect/depo/main/k0ppqbzkl4m71.webp?token=GHSAT0AAAAAABVG2L4V3Y4GERNIXK7X7JWOYU22EUQ"
        },{
            cevap:"Konuştun, vergi toretto geliyor.",
            resim: true,
            resim_url: "https://raw.githubusercontent.com/urexpect/depo/main/vergi.gif?token=GHSAT0AAAAAABVG2L4VMS6Z2X5QZ7L2AC5IYU22HNA"
        },{
            cevap:"İyi be kanka Türkçe üzerinde çalışmalar yapıyorum.",
            resim: false,
        },
      ]
      var sayi = yanitlar[randomIntFromInterval(0,(yanitlar.length-1))]
      if(sayi.resim === false)return message.reply({content: sayi.cevap})
      
      const embed = new Discord.MessageEmbed()
      embed.setTitle(sayi.cevap)
      embed.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      embed.setImage(sayi.resim_url)
      embed.setColor("RANDOM")
      return message.reply({embeds: [embed]})
      
    }
}