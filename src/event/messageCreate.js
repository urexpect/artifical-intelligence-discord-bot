const { Collection } = require("discord.js");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



module.exports = async (client, message) => {
    if(message.author.bot) { return }

    const arr = Array.from(client.commandes).map(([name, value]) => (name))
    let prefix;
    if(message.content.startsWith(client.config.prefix[0]))prefix = client.config.prefix[0]+" ";
    if(message.content.startsWith(client.config.prefix[1]))prefix = client.config.prefix[1]+" ";
    if(message.content.startsWith(client.config.prefix[2]))prefix = client.config.prefix[2]+" ";
    if(message.mentions.has(client.user.id))return message.channel.send(`Neden bana yabancı gibi davranıyorsun?Benim de senin gibi isimlerim var.Eğer ismimle seslenmezsen cevap vermicem. Taam mı?👉🤓👈 
    \n\>Örnek: \`\`\`${client.config.prefix[randomIntFromInterval(0, 2)]} ${arr[randomIntFromInterval(0,arr.length-1)]}\`\`\``)
   

   
    if(!message.content.startsWith(prefix)&& message.content.startsWith(prefix.trim()))return message.channel.send(`Kanka sen yazmayı hangi hocadan öğrendin.İsmimden sonra boşluk koycan angut musun?💩Şaka len küsme bana! Ama dediğim gibi yap, Taam mı?👉🤓👈`)
   if(!message.content.startsWith(prefix)){ return }
    
   let args = message.content.slice(prefix.length).split(/ +/);
   let command = args.shift().toLowerCase();
   
    let cmd;
    
    if (client.commandes.has(command)) { cmd = client.commandes.get(command) }
    else if(client.aliases.has(command)) { cmd = client.commandes.get(client.aliases.get(command)) }
    if(!cmd) return;

    const props = require(`../command/${cmd.dir}/${cmd.name}`);
    
    // COOLDOWNS & ERREUR
    if (!cooldowns.has(props.name)) { cooldowns.set(props.name, new Collection()); }
    const now = Date.now();
    const timestamps = cooldowns.get(props.name);
    const cooldownAmount = (props.cooldown || 2) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Wait ${timeLeft.toFixed(1)} more second${timeLeft.toFixed(1)<2 ? '' : 's'} to use **${props.name}**`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // PERMISSION CHECKER
    if (props.permissions) {
        if (!message.member.permissions.has(props.permissions)) {
            return message.reply(`You're missing permissions : ${props.permissions.map(p => `**${p}**`).join(', ')}`)
        }
    }

    //LOADING COMMANDS
    cmd.run(client, message, args).catch(err => client.emit("error", err, message))
};
