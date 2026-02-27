const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const fortuneText = document.getElementById("fortuneText");
const newCardBtn = document.getElementById("newCard");

canvas.width = 340;
canvas.height = 230;

let isDrawing = false;

/* Random fortune */
function randomFortune() {
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

/* Setup new card */
function setupCard() {

  fortuneText.textContent = randomFortune();

  ctx.globalCompositeOperation = "source-over";

  const gradient = ctx.createLinearGradient(0,0,340,230);
  gradient.addColorStop(0,"#f2f2f2");
  gradient.addColorStop(1,"#dcdcdc");

  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#888";
  ctx.font = "18px sans-serif";
  ctx.fillText("✨ Scratch gently ✨", 80, 120);
}

/* Scratch logic */
function scratch(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
}

/* Mouse */
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", e => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  scratch(e.clientX - rect.left, e.clientY - rect.top);
});

/* Touch */
canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  scratch(touch.clientX - rect.left, touch.clientY - rect.top);
});

/* New card */
newCardBtn.addEventListener("click", setupCard);

setupCard();