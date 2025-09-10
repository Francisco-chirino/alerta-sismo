# Alerta Sismo

Esta es una aplicación web para alertas de sismo, diseñada para un proyecto universitario. Permite a los usuarios suscribirse a notificaciones push y emitir alertas que se envían a todos los suscriptores.

## Características

- Suscripción a notificaciones push.
- Botón para emitir alertas.
- Notificaciones en tiempo real a todos los usuarios suscritos.

## Requisitos

- Node.js (versión 14 o superior)
- Navegador moderno que soporte Service Workers y Push API (Chrome, Firefox, etc.)

## Instalación

1. Instala Node.js desde https://nodejs.org/
2. Clona o descarga este proyecto.
3. Abre una terminal en la carpeta del proyecto.
4. Ejecuta `npm install` para instalar las dependencias.
5. Ejecuta `npm start` para iniciar el servidor.

## Configuración

Antes de ejecutar, genera tus propias claves VAPID para las notificaciones push:

1. Instala web-push globalmente: `npm install -g web-push`
2. Genera claves: `web-push generate-vapid-keys`
3. Reemplaza las claves en `server.js` y `public/app.js`:
   - `publicKey` en ambos archivos.
   - `privateKey` en `server.js`.
   - `mailto` en `server.js` con tu email.

## Uso

1. Abre http://localhost:3000 en tu navegador.
2. Haz clic en "Suscribirse a Notificaciones" y permite las notificaciones.
3. Una vez suscrito, aparecerá el botón "Emitir Alerta".
4. Haz clic en "Emitir Alerta" para enviar una notificación a todos los suscriptores.

## Notas

- En producción, usa una base de datos para almacenar las suscripciones en lugar de memoria.
- Asegúrate de que el servidor esté accesible públicamente para que las notificaciones funcionen desde diferentes dispositivos.
- Para un despliegue real, considera usar servicios como Firebase Cloud Messaging o un servidor dedicado.

## Estructura del Proyecto

- `server.js`: Servidor backend con Express.
- `public/index.html`: Página principal.
- `public/app.js`: Lógica del frontend para suscripciones y envío de alertas.
- `public/service-worker.js`: Service Worker para manejar notificaciones push.
- `public/styles.css`: Estilos de la aplicación.
- `package.json`: Dependencias y scripts.
"# alerta-sismo" 
"# alerta-sismo" 
"# alerta-sismo" 
