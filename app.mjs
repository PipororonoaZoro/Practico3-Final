import dns from "dns";

// Forzar servidores DNS: Google y Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para formularios y method-override
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
connectDB();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('======================================');
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log('📌 Rutas disponibles:');
  console.log(`   Dashboard: http://localhost:${PORT}/api/heroes`);
  console.log(`   Agregar:   http://localhost:${PORT}/api/heroes/agregar`);
  console.log(`   Editar:    http://localhost:${PORT}/api/heroes/:id/editar`);
  console.log('======================================');
});

