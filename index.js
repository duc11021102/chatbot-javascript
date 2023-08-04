const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox")


let message;
let API_KEY = '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';

// tao mot message <li/>
const createChat = (message, type) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add('chat', type);
    const chatContent = `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse =  () => {
    console.log("hi")
    const API_URL = "https://api.openai.com/v1/chat/completions";
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{ role: 'user', content: message }]
        })
    }).then((response) => {
        return response.json()
    }).then((responseData) => {
        console.log(responseData)
    }).catch((error) => {
        console.log(error)
    })

}

const submitHandler = () => {
    message = chatInput.value.trim();
    if (!message) {
        return;
    }
    // cho them mot message vao chat box 
    chatBox.appendChild(createChat(message, 'outgoing'));
    setTimeout(() => {
        chatBox.appendChild(createChat("Thinking...", "incoming"));
    }, 600)
    // generateResponse();
}

sendBtn.addEventListener("click", submitHandler);