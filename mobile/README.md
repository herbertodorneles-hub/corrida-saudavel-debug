# Corrida Saudável 3D — gerar o APK (Android)

Existem 2 caminhos. **Opção A é a mais fácil** (não precisa instalar nada).

## Opção A — PWABuilder (online, gera o pacote da Play Store pra você)
1. Abra https://www.pwabuilder.com
2. Cole o link: `https://viral-jogador.preview.emergentagent.com/game.html` e clique **Start**.
3. Clique em **Package for stores → Android → Generate Package**.
   - Package ID: `com.corridasaudavel.app` · App name: `Corrida Saudável 3D`
4. Baixe o .zip gerado. Dentro vem:
   - `*.apk` → instalar direto no celular pra testar
   - `*.aab` → enviar no **Google Play Console** (https://play.google.com/console)
   - `signing.keystore` + `signing-key-info.txt` → **guarde com cuidado**, precisa pra toda atualização
   - `assetlinks.json` → para tirar a barra de endereço, ele precisa ficar em
     `/.well-known/assetlinks.json` do seu domínio (fale comigo que eu publico lá).
> Observação: o PWABuilder lê o link público. Para a Play Store, o ideal é usar o link definitivo
> após o deploy (o link de preview pode mudar).

## Opção B — Capacitor + Android Studio (APK 100% offline, o jogo vai dentro do app)

Este projeto empacota o `game.html` (single-file) num app Android usando o **Capacitor 7**, sem reescrever nada.
A pasta `android/` já vem gerada, com orientação retrato travada e permissão de internet (para o ranking).

## O que você precisa (uma vez só)
1. **Node.js 20+** → https://nodejs.org
2. **Android Studio** (Ladybug ou mais novo) → https://developer.android.com/studio
   - Na primeira abertura, deixe ele instalar o **Android SDK** e o **JDK 21** embutido.

## Gerar o APK (passo a passo)
```bash
cd mobile
npm install                 # instala o Capacitor
npm run sync                # copia game.html -> www/index.html e sincroniza com android/
npm run open                # abre o projeto no Android Studio
```
No Android Studio:
1. Espere o **Gradle Sync** terminar (barra inferior).
2. Menu **Build → Build App Bundle(s) / APK(s) → Build APK(s)**.
3. Clique em **locate** no aviso: o arquivo fica em
   `android/app/build/outputs/apk/debug/app-debug.apk`.
4. Mande o APK para o celular (WhatsApp, Drive, cabo) e instale
   (permita "instalar apps de fontes desconhecidas").

Atalho sem abrir o Android Studio (com SDK instalado e `ANDROID_HOME` configurado):
```bash
npm run build:debug
```

## Atualizar o jogo
Sempre que o `game.html` mudar: coloque a versão nova em `mobile/game.html` (ou mantenha em
`../frontend/public/game.html`) e rode `npm run sync` de novo, depois gere o APK.

## Ícone e splash
O ícone fonte está em `assets/icon.png` (1024×1024). Para gerar todos os tamanhos Android:
```bash
npm run icons
```

## Publicar na Play Store (opcional)
Use **Build → Generate Signed App Bundle / APK**, crie uma keystore (guarde a senha!) e envie o `.aab`
no Google Play Console (taxa única de US$ 25).

## Ranking online no APK
O jogo detecta que está rodando no app (Capacitor) e usa o servidor
`https://viral-jogador.preview.emergentagent.com` para o ranking. Sem internet, o jogo funciona normal
e só esconde o ranking. Se você publicar o backend em outro domínio, troque a constante `REMOTE`
dentro do `game.html` (procure por `const REMOTE=`).
