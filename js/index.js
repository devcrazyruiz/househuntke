
const modalHTML = `
  <div id="booking-modal" style="
    display:none; position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.75); z-index:1000; justify-content:center; align-items:center;
  ">
    <div style="
      background:rgb(42,42,46); border-radius:12px; padding:32px; width:90%; max-width:420px;
      border:1px solid rgba(147,210,212,0.3); position:relative;
    ">
      <button id="close-modal" style="
        position:absolute; top:12px; right:16px; background:none; border:none;
        color:antiquewhite; font-size:22px; cursor:pointer;
      ">&times;</button>
      <h2 style="color:antiquewhite; margin-bottom:8px;">Book Property</h2>
      <p id="modal-property-name" style="color:rgba(147,210,212,0.8); margin-bottom:20px; font-size:14px;"></p>
      <input id="modal-name" type="text" placeholder="Full Name" style="
        width:100%; padding:10px; margin-bottom:12px; border-radius:8px;
        background:rgb(32,32,34); border:1px solid rgba(147,210,212,0.3); color:antiquewhite;
        box-sizing:border-box;
      "/><br/>
      <input id="modal-email" type="email" placeholder="Email Address" style="
        width:100%; padding:10px; margin-bottom:12px; border-radius:8px;
        background:rgb(32,32,34); border:1px solid rgba(147,210,212,0.3); color:antiquewhite;
        box-sizing:border-box;
      "/><br/>
      <input id="modal-phone" type="tel" placeholder="Phone Number" style="
        width:100%; padding:10px; margin-bottom:20px; border-radius:8px;
        background:rgb(32,32,34); border:1px solid rgba(147,210,212,0.3); color:antiquewhite;
        box-sizing:border-box;
      "/><br/>
      <button id="confirm-booking" style="
        width:100%; padding:12px; border-radius:8px; border:none;
        background:blueviolet; color:white; font-size:16px; cursor:pointer;
      ">Confirm Booking</button>
      <p id="modal-error" style="color:#ff6b6b; margin-top:10px; font-size:13px; display:none;"></p>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalHTML);

// Toast notification
const toastHTML = `
  <div id="toast" style="
    display:none; position:fixed; bottom:30px; right:30px; z-index:2000;
    background:blueviolet; color:white; padding:14px 22px; border-radius:10px;
    font-size:14px; box-shadow:0 4px 20px rgba(0,0,0,0.5); max-width:280px;
  "></div>
`;
document.body.insertAdjacentHTML("beforeend", toastHTML);

function showToast(message, duration = 3500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), duration);
}

// Attach booking buttons
let currentPropertyName = "";

document.querySelectorAll(".book").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Get property description from sibling <p>
    const card = btn.closest(".Nairobi");
    const desc = card ? card.querySelector("p") : null;
    currentPropertyName = desc ? desc.textContent.trim() : "Selected Property";

    document.getElementById("modal-property-name").textContent =
      currentPropertyName;
    document.getElementById("modal-error").style.display = "none";
    document.getElementById("modal-name").value = "";
    document.getElementById("modal-email").value = "";
    document.getElementById("modal-phone").value = "";

    const modal = document.getElementById("booking-modal");
    modal.style.display = "flex";
  });
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("booking-modal").style.display = "none";
});

// Close modal on backdrop click
document.getElementById("booking-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("booking-modal")) {
    document.getElementById("booking-modal").style.display = "none";
  }
});

document.getElementById("confirm-booking").addEventListener("click", () => {
  const name = document.getElementById("modal-name").value.trim();
  const email = document.getElementById("modal-email").value.trim();
  const phone = document.getElementById("modal-phone").value.trim();
  const errorEl = document.getElementById("modal-error");

  if (!name || !email || !phone) {
    errorEl.textContent = "Please fill in all fields.";
    errorEl.style.display = "block";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.textContent = "Please enter a valid email address.";
    errorEl.style.display = "block";
    return;
  }

  document.getElementById("booking-modal").style.display = "none";
  showToast(`✅ Booking confirmed for "${name}"! We'll be in touch soon.`);
});

// ---- Review Form ----

const reviewBtn = document.querySelector(".review .book");
if (reviewBtn) {
  reviewBtn.addEventListener("click", () => {
    const fieldset = document.querySelector(".feildset");
    const nameInput = fieldset.querySelector('input[type="text"]');
    const emailInput = fieldset.querySelector('input[type="email"]');
    const textarea = fieldset.querySelector("textarea");

    if (!nameInput.value.trim() || !emailInput.value.trim() || !textarea.value.trim()) {
      showToast("⚠️ Please fill in all review fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      showToast("⚠️ Please enter a valid email address.");
      return;
    }

    nameInput.value = "";
    emailInput.value = "";
    textarea.value = "";
    showToast("🙏 Thank you for your review!");
  });
}

// ---- Smooth scroll for nav links ----

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ---- Scroll reveal for property cards ----

function revealOnScroll() {
  const cards = document.querySelectorAll(".Nairobi");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

// Set initial hidden state
document.querySelectorAll(".Nairobi").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Run once on load for above-fold cards

// ---- Active nav highlight ----

document.querySelectorAll(".ul-list a").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".ul-list a")
      .forEach((l) => l.classList.remove("active-nav"));
    this.classList.add("active-nav");
  });
});

// ---- Image lazy load fallback ----

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.background = "rgba(147,210,212,0.1)";
    this.style.border = "1px dashed rgba(147,210,212,0.3)";
    this.alt = "Image not available";
  });
});

console.log("HouseHunt KE scripts loaded ✅");