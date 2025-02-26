const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");

const prizes = [
    "🏆 LinkedIn Premium",
    "👕 T-Shirt",
    "☕ Coffee Cup",
    "🥤 2-Litre 7UP",
    "🍫 Silk Dairy Milk"
];

let angle = 0;
let spinning = false;

function drawWheel() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700"];
    const sliceAngle = (2 * Math.PI) / prizes.length;

    for (let i = 0; i < prizes.length; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((i + 0.5) * sliceAngle);
        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.fillText(prizes[i], 60, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;

    spinning = true;
    let spinTime = Math.random() * 3000 + 2000; 
    let spinInterval = setInterval(() => {
        angle += Math.random() * 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();
    }, 50);

    setTimeout(() => {
        clearInterval(spinInterval);
        spinning = false;
        let selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];

        alert("🎉 Congratulations! You won: " + selectedPrize);
        
        if (selectedPrize === "🏆 Free LinkedIn Premium") {
            setTimeout(() => {
                alert("🚨 WARNING: You are Hacked! Change your password immediately! 🚨");
            }, 300);
        }
    }, spinTime);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();
