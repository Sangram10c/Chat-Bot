const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Function to add a message to the chat log
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Send user message
sendBtn.addEventListener("click", () => {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user");
    chatInput.value = "";
    sendMessageToBot(userMessage);
  }
});


function sendMessageToBot(userMessage) {
  const apiUrl = "http://127.0.0.1:5000/chat";
  
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  })
    .then(response => response.json())
    .then(data => {
      const botResponse = data.response || "No response from bot!";
      addMessage(botResponse, "bot");
    })
    .catch(error => {
      console.error("Error communicating with the backend:", error);
      addMessage("Error: Unable to get a response from the server.", "bot");
    });
}

// Fetch and display products
function fetchProducts() {
  fetch("http://127.0.0.1:5000/api/products")
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      displayProducts(data);
    })
    .catch(error => console.error("Error fetching products:", error));
}

// Display products in the UI
function displayProducts(products) {
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <h4>${product.name}</h4>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Description: ${product.description}</p>
    `;
    chatLog.appendChild(productDiv);
  });
}


window.onload = fetchProducts;
