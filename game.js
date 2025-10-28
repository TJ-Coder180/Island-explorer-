const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 200, size: 30, color: "blue", power: null };
let fruit = { x: 300, y: 200, size: 20, color: "orange", type: "Flame" };
let enemy = { x: 500, y: 200, size: 30, color: "red", health: 3 };

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (e.key === "ArrowRight") player.x += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === " ") attack();
}

function attack() {
  if (player.power && Math.abs(player.x - enemy.x) < 50) {
    enemy.health -= 1;
    console.log("Enemy hit! Health:", enemy.health);
  }
}

function checkFruitPickup() {
  if (Math.abs(player.x - fruit.x) < 30) {
    player.power = fruit.type;
    fruit.x = -100; // Hide fruit
    console.log("Picked up fruit:", player.power);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Draw fruit
  ctx.fillStyle = fruit.color;
  ctx.fillRect(fruit.x, fruit.y, fruit.size, fruit.size);

  // Draw enemy
  if (enemy.health > 0) {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  } else {
    ctx.fillStyle = "gray";
    ctx.fillText("Enemy Defeated!", enemy.x - 20, enemy.y - 10);
  }

  checkFruitPickup();
  requestAnimationFrame(draw);
}

draw();
