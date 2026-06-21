# Platform 4 Solutions — Monorepo Corp

Monorepo full-stack corporativo para la agencia simulada de desarrollo de software **Platform 4 Solutions**. Este proyecto presenta los servicios premium de la empresa y ofrece un soporte técnico interactivo impulsado por Inteligencia Artificial (Gemini 1.5 Flash).

La arquitectura del proyecto está estructurada como un **Monorepo** con **NPM Workspaces** y está preparada para integrarse con un CMS headless (como Strapi) mediante archivos de contenido centralizados en formato JSON.

---

## 🔮 Estructura del Monorepo

```text
ProyFinal/
├── package.json          # Configuración de Workspaces (Root)
├── package-lock.json     # Árbol de dependencias bloqueado (Root)
├── .gitignore            # Exclusión de archivos (node_modules, .env, dist)
├── README.md             # Documentación general
├── backend/              # Microservicio del Backend (Express.js)
│   ├── package.json
│   ├── .env.example
│   ├── .env              # Variables de entorno locales (Excluido de Git)
│   └── server.js         # Servidor Express + SDK de Gemini 1.5 Flash
└── frontend/             # Aplicación de Cliente (React + Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── index.css     # Estilos de Tailwind CSS v4 y animaciones
        ├── App.jsx       # Rutas y envoltorios globales
        ├── data/
        │   └── content.json # Contenido dinámico centralizado (CMS-Ready)
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ChatWidget.jsx # Interfaz de chat reutilizable
        │   └── AgentFAB.jsx   # Botón flotante del agente de IA
        └── pages/
            ├── Home.jsx
            ├── About.jsx
            ├── Downloads.jsx
            └── Support.jsx
```

---

## 🛠️ Stack Tecnológico

1. **Frontend:** React 18 (Vite), React Router DOM (navegación), Tailwind CSS v4 (estilos y animaciones), Lucide React (iconografía).
2. **Backend:** Node.js, Express, CORS.
3. **IA:** SDK Oficial de Google Gen AI (`@google/genai` v2.9.0) cargando el modelo **Gemini 1.5 Flash**.

---

## ⚙️ Configuración e Instalación

### Requisitos Previos
* **Node.js:** Versión 20.0.0 o superior instalada.

### Paso 1: Clonar e Instalar Dependencias
Desde la raíz del proyecto (`ProyFinal/`), ejecuta el siguiente comando para instalar las dependencias de **ambos** workspaces de forma automatizada:
```bash
npm install
```

### Paso 2: Configurar las Variables de Entorno del Backend
Abre el archivo [backend/.env](file:///c:/Users/VICTUS/Documents/Doc%20Personales/UAGRM-FICCT/Taller-SW/ProyFinal/backend/.env) e introduce tu clave de API de Gemini:
```env
PORT=3001
GEMINI_API_KEY=tu_clave_de_api_de_gemini_aqui
```
*(El archivo `.env` está en el `.gitignore` y nunca se subirá a repositorios públicos).*

### Paso 3: Ejecutar en Desarrollo
Ejecuta el servidor y la interfaz del cliente de forma simultánea desde la raíz con un solo comando:
```bash
npm run dev
```

* **Frontend:** Disponible en [http://localhost:5173/](http://localhost:5173/)
* **Backend API:** Disponible en [http://localhost:3001/](http://localhost:3001/)

---

## ⚡ Simulación y Edición de Contenidos (Preparación para CMS / Strapi)

Toda la información estática del sitio (textos corporativos, slogans, integrantes del equipo, recursos de descarga, categorías y descripciones) se lee dinámicamente de un solo archivo de configuración:
* [content.json](file:///c:/Users/VICTUS/Documents/Doc%20Personales/UAGRM-FICCT/Taller-SW/ProyFinal/frontend/src/data/content.json)

Si necesitas simular otra empresa o actualizar la propuesta comercial, **edita ese archivo JSON**. Esto asegura que el sistema esté completamente listo para reemplazar la carga estática por peticiones HTTP dinámicas a un CMS como Strapi en futuras fases del proyecto.

---

## 🤖 Agente Call Center IA & Prompts
El backend incluye una llamada con instrucción del sistema (*System Instruction*) estricta para el agente de Gemini:
> *"Eres el agente principal de Call Center de Platform 4 Solutions... Tu objetivo es dar soporte de primer nivel... Si un usuario tiene un problema técnico, pídele su número de ticket. Nunca respondas preguntas fuera del ámbito de la empresa o del desarrollo de software."*

### Pruebas de Comportamiento:
* **Ámbito del Negocio:** Si le preguntas sobre desarrollo web, descargas o servicios, el bot responderá de forma amable y técnica.
* **Fuera del Ámbito:** Si le pides recetas de cocina o temas no relacionados a la ingeniería de software, el agente denegará la respuesta de acuerdo al System Prompt.
* **Function Calling (Mockup):** En `backend/server.js` se incluye una sección comentada detallando cómo implementar herramientas de consulta dinámicas (como la función `checkTicketStatus`) para futuras expansiones del proyecto.
