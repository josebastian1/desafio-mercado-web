import express from 'express';
import { create } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Instancia de express
const app = express();

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});

// INICIO CONFIGURACIÓN HANDLEBARS
const hbs = create({
    layoutsDir: path.resolve(__dirname, "./views/layouts/"),
    partialsDir: path.resolve(__dirname, "./views/partials/"),
    defaultLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// FIN CONFIGURACIÓN HANDLEBARS

// INICIO MIDDLEWARES
app.use(express.static("public"));

// Dejar públicos los archivos de jquery y bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use('/jquery', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

// FIN MIDDLEWARES

// RUTAS DE VISTAS
app.get("/", (req, res) => {
    const productos = [
        { nombre: 'Bananas', imagen: '/assets/img/banana.png' },
        { nombre: 'Cebollas', imagen: '/assets/img/cebollas.png' },
        { nombre: 'Lechugas', imagen: '/assets/img/lechuga.png' },
        { nombre: 'Papas', imagen: '/assets/img/papas.png' },
        { nombre: 'Pimentón', imagen: '/assets/img/pimenton.png' },
        { nombre: 'Tomate', imagen: '/assets/img/tomate.png' }
    ];

    res.render("home", {
        titulo: "Bienvenido al <strong>Mercado Web</strong>, seleccione sus productos",
        productos: productos
    });
});
