document.addEventListener('DOMContentLoaded', function() {
    // --- Existing Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // --- New Chatbot Logic ---
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (sendMessageBtn && chatInput && chatBody) {
        // Function to add a message to the chat body
        const addMessage = (message, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.textContent = message;
            chatBody.appendChild(messageDiv);
            // Scroll to the bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        // Function to call the Gemini API
        const getGeminiResponse = async (userMessage) => {
            // IMPORTANT: The API key is handled by the environment. Do not add it here.
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const prompt = `You are a helpful travel assistant for a website called StayNest. A user is asking: "${userMessage}". Provide a friendly and concise response.`;

            const payload = {
                contents: [{ parts: [{ text: prompt }] }]
            };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const result = await response.json();
                return result.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                return "Sorry, I'm having trouble connecting. Please try again later.";
            }
        };

        // Handle sending a message
        const handleSendMessage = async () => {
            const userMessage = chatInput.value.trim();
            if (userMessage === "") return;

            addMessage(userMessage, 'user');
            chatInput.value = ""; // Clear input field

            // Get and display the bot's response
            const botResponse = await getGeminiResponse(userMessage);
            addMessage(botResponse, 'bot');
        };

        sendMessageBtn.addEventListener('click', handleSendMessage);
        // Allow sending with the "Enter" key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});
const chatbox = document.getElementById("chatbox");
    const input = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", async () => {
      const message = input.value.trim();
      if (!message) return;

      // Show user message
      chatbox.innerHTML += `<div class="user">You: ${message}</div>`;

      // Send to backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      chatbox.innerHTML += `<div class="bot">Bot: ${data.reply}</div>`;

      input.value = "";
      chatbox.scrollTop = chatbox.scrollHeight; // Auto scroll
    });