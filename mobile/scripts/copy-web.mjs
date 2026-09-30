// Copia o jogo single-file para www/index.html (o Capacitor empacota a pasta www).
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const candidates = [resolve(root, "game.html"), resolve(root, "../frontend/public/game.html")];
const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error("game.html não encontrado. Coloque o arquivo na raiz desta pasta (mobile/game.html).");
  process.exit(1);
}
mkdirSync(resolve(root, "www"), { recursive: true });
copyFileSync(src, resolve(root, "www/index.html"));
console.log(`✔ ${src} → www/index.html`);

// Trilha MP3 "Os 8 Amigos da Natureza" (o jogo busca em music/os-8-amigos-da-natureza.mp3)
const mp3Name = "os-8-amigos-da-natureza.mp3";
const mp3 = [resolve(root, "music", mp3Name), resolve(root, "../frontend/public/music", mp3Name)].find((p) => existsSync(p));
if (mp3) {
  mkdirSync(resolve(root, "www/music"), { recursive: true });
  copyFileSync(mp3, resolve(root, "www/music", mp3Name));
  console.log(`✔ ${mp3} → www/music/${mp3Name}`);
} else {
  console.warn("⚠ MP3 não encontrado — o jogo usará a trilha procedural.");
}
