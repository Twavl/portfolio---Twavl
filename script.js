document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('.tabs');
  const tabButtons = tabs.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const loader = document.getElementById('tab-loader');
  const loaderText = loader.querySelector('.loader-text');

  tabs.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('.tab-button');
    if (!clickedButton || clickedButton.classList.contains('active')) return;

    const tabId = clickedButton.dataset.tab;
    const tabName = clickedButton.textContent;
    const currentContent = document.querySelector('.tab-content.active');

    loaderText.textContent = `Initializing ${tabName}...`;
    loader.classList.add('visible');
    if (currentContent) {
      currentContent.classList.add('loading');
    }

    setTimeout(() => {
      tabButtons.forEach(button => button.classList.remove('active'));
      clickedButton.classList.add('active');

      if (currentContent) {
        currentContent.classList.remove('active');
        currentContent.classList.remove('loading');
      }
      const newContent = document.getElementById(tabId);
      if (newContent) {
        newContent.classList.add('active');
      }

      loader.classList.remove('visible');
    }, 500); 
  });


  const DISCORD_USER_ID = '1250157689460490324';

  const statusElement = document.querySelector('.discord-status');
  const statusTextElement = document.getElementById('status-text');
  const discordLinkElement = document.getElementById('discord-link');

  if (discordLinkElement) {
    discordLinkElement.href = `https://discordapp.com/users/${DISCORD_USER_ID}`;
  }

  async function fetchDiscordStatus() {
    if (DISCORD_USER_ID === '250157689460490324') {
      statusTextElement.textContent = 'Set Discord ID';
      return;
    }
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
      const { data } = await response.json();

      if (data) {
        const { discord_status, activities, spotify } = data;
        statusElement.className = `discord-status ${discord_status}`;
        
        const game = activities.find(activity => activity.type === 0);
        const customStatus = activities.find(activity => activity.type === 4);
        
        let statusText = discord_status.charAt(0).toUpperCase() + discord_status.slice(1);

        if (game) {
          statusText = `Playing ${game.name}`;
        } else if (spotify) {
          statusText = `Listening to ${spotify.song}`;
        } else if (customStatus && customStatus.state) {
          statusText = customStatus.state;
        }

        statusTextElement.textContent = statusText;

      } else {
         statusElement.className = `discord-status offline`;
         statusTextElement.textContent = 'Offline';
      }
    } catch (error) {
      console.error('Error fetching Discord status:', error);
      statusElement.className = `discord-status offline`;
      statusTextElement.textContent = 'Error';
    }
  }

  fetchDiscordStatus();
  setInterval(fetchDiscordStatus, 30000);

  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const inputLine = document.getElementById('terminal-input-line');
  const bootSequence = [
    { text: 'initializing portfolio.exe...', type: 'prompt' },
    { text: 'loading assets... [OK]', type: 'output' },
    { text: 'compiling skills... [OK]', type: 'output' },
    { text: 'deploying ghost-protocol... [OK]', type: 'output' },
    { text: 'boot sequence complete. Welcome!', type: 'prompt' },
    { text: 'Type `/help` to see available commands.', type: 'help' },
  ];

  function typeToTerminal(lines, callback) {
    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
      if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
      }

      const line = lines[lineIndex];
      const lineElement = document.createElement('div');
      lineElement.className = line.type;

      if (charIndex === 0) {
        inputLine.before(lineElement);
      }
      
      const currentLineElement = inputLine.previousSibling;
      if (charIndex < line.text.length) {
        currentLineElement.textContent += line.text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 15 + Math.random() * 15);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeChar, 75);
      }
    }
    typeChar();
  }

  function handleCommand(command) {
    const output = [];
    command = command.toLowerCase().trim();
    const historyLine = document.createElement('div');
    historyLine.innerHTML = `<span class="prompt">&gt;</span><span style="padding-left: 10px;">${command}</span>`;
    inputLine.before(historyLine);

    const [commandName, ...args] = command.split(' ');

    switch(commandName) {
      case '/help':
        output.push({ text: 'Available commands:', type: 'output' });
        output.push({ text: '  /help              - Shows this help message', type: 'help' });
        output.push({ text: '  /neofetch          - Display system information', type: 'help' });
        output.push({ text: '  /socials           - Display social media links', type: 'help' });
        output.push({ text: '  /party             - Let\'s celebrate!', type: 'help' });
        output.push({ text: '  /hack              - Toggles hacker mode', type: 'help' });
        output.push({ text: '  /clear             - Clears the terminal', type: 'help' });
        break;

      case '/neofetch':
        const neofetchArt = [
          "                ,▄,.",
          "              ,█▄██.",
          "            ,█▄█▀█▀",
          "           ,█▄█▀,█",
          "          ,█▄█▀,█",
          "         ,█▄█▀,█",
          "████████████▄█▀,█████████",
          "▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
        ];
        neofetchArt.forEach(line => output.push({ text: line, type: 'output' }));
        output.push({ text: `Twavl@portfolio`, type: 'prompt' });
        output.push({ text: `-----------------`, type: 'prompt' });
        output.push({ text: `OS:    PortfolioOS x64`, type: 'help' });
        output.push({ text: `Host:  GitHub Pages`, type: 'help' });
        output.push({ text: `Likes: Gaming, Music, Coding`, type: 'help' });
        output.push({ text: `Pkmn:  Haunter`, type: 'help' });
        output.push({ text: `Discord: .twavl (ID: ${DISCORD_USER_ID})`, type: 'help' });
        output.push({ text: `GitHub:  https://github.com/Twavl`, type: 'help' });
        break;

      case '/socials':
        output.push({ text: 'Find me here:', type: 'output' });
        output.push({ text: `Discord: .twavl (ID: ${DISCORD_USER_ID})`, type: 'help' });
        output.push({ text: `GitHub:  https://github.com/Twavl`, type: 'help' });
        break;
      
      case '/party':
        output.push({ text: '🎉 Party time! 🎉', type: 'output' });
        startParty();
        break;

      case '/hack':
        document.body.classList.toggle('hack-theme');
        const isHacking = document.body.classList.contains('hack-theme');
        output.push({ text: `Hacker mode ${isHacking ? 'ACTIVATED' : 'DEACTIVATED'}.`, type: 'prompt' });
        break;
      
      case '/clear':
        const children = Array.from(terminalBody.children);
        children.forEach(child => {
          if (child.id !== 'terminal-input-line') {
            terminalBody.removeChild(child);
          }
        });
        break;
        
      default:
        output.push({ text: `Command not found: ${command}`, type: 'error' });
    }
    
    if (output.length > 0) {
      typeToTerminal(output);
    }
    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function startParty() {
    let container = document.querySelector('.confetti-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'confetti-container';
      document.body.appendChild(container);
    }
    
    const colors = ['#a366ff', '#c299fc', '#e0e0ff', '#ffffff'];
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  }

  inputLine.style.display = 'none'; 
  typeToTerminal(bootSequence, () => {
    inputLine.style.display = 'flex';
    terminalInput.focus();
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(terminalInput.value);
      }
    });
  });


  console.log(
    "%cHaunter was here...",
    "color: #a366ff; font-family: 'Fira Mono', monospace; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #a366ff;"
  );


  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 1
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#c299fc';

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = 'rgba(194, 153, 252, 0.15)';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
  }

  function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
  }

  animate();
});
