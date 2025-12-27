const text = document.getElementById("reaction-text");

function calculate() {
  const current = Number(document.getElementById("current").value);
  const weightInput = Number(document.getElementById("weight").value);
  const weight = weightInput / 100;
  const target = Number(document.getElementById("target").value);

  const result = document.getElementById("result");
  const bar = document.getElementById("meter-bar");
  const meter = document.getElementById("meter");
  const image = document.getElementById("reaction");

  // ❌ INPUT VALIDATION
  if (
    isNaN(current) || isNaN(weightInput) || isNaN(target) ||
    current < 0 || current > 100 ||
    target < 0 || target > 100 ||
    weightInput <= 0 || weightInput > 100
  ) {
    result.textContent = "⚠️ Please enter valid numbers between 0 and 100.";
    
    // hide reactions if invalid
    text.classList.add("hidden");
    image.classList.add("hidden");
    meter.classList.add("hidden");

    return; // STOP HERE
  }

  // SHOW reactions after click
text.classList.remove("hidden");
image.classList.remove("hidden");
meter.classList.remove("hidden");

// reset animations (important!)
text.classList.remove("slide-up");
image.classList.remove("pop");
meter.classList.remove("fade-in");

// force reflow so animation can replay
void text.offsetWidth;

// apply animations
text.classList.add("slide-up");
image.classList.add("pop");
meter.classList.add("fade-in");


  // calculate needed grade
  const needed = (target - current * (1 - weight)) / weight;

  result.textContent =
    "You need " + needed.toFixed(1) + "% on the final.";

  let percent = Math.min(Math.max(needed, 0), 100);
  bar.style.width = percent + "%";
  // reset shake so it can replay
  image.classList.remove("shake");
  void image.offsetWidth;
  // reactions
  if (needed <= 50) {
    bar.style.background = "limegreen";
    image.src = "images/chill.png";
    text.textContent = "Light work";
  } else if (needed <= 65) {
    bar.style.background = "gold";
    image.src = "images/okay.png";
    text.textContent = "YOU MIGHT ACTUALLY DO THIS";
  } else if (needed <= 80) {
    bar.style.background = "orange";
    image.src = "images/sweating.png";
    text.textContent = "You're sweating a bit";
  } else if (needed <= 95) {
    bar.style.background = "red";
    image.src = "images/cooked.png";
    text.textContent = "You are COOKED. LOCK IN NOW";

    image.classList.remove("pop");
    void image.offsetWidth;
    image.classList.add("shake");

  } else {
    bar.style.background = "black";
    image.src = "images/dead.gif";
    text.textContent = "It is over. Start praying";

    image.classList.remove("pop");
    void image.offsetWidth;
    image.classList.add("shake");
  }
}

function resetCalculator() {
  // clear inputs
  document.getElementById("current").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("target").value = "";

  // reset result text
  document.getElementById("result").textContent = "Result will show here";

  // hide reactions
  document.getElementById("reaction-text").classList.add("hidden");
  document.getElementById("reaction").classList.add("hidden");
  document.getElementById("meter").classList.add("hidden");

  // reset meter bar
  const bar = document.getElementById("meter-bar");
  bar.style.width = "0%";
}

// ---------- KEYBOARD CONTROLS ----------
document.addEventListener("keydown", (e) => {
  // ENTER = calculate
  if (e.key === "Enter") {
    calculate();
  }

  // ESC = reset
  if (e.key === "Escape") {
    resetCalculator();
  }
});

