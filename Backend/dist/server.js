"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const conn_1 = __importDefault(require("./DB/conn"));
const auth_1 = __importDefault(require("./routes/auth"));
const blog_1 = __importDefault(require("./routes/blog"));
const upload_1 = __importDefault(require("./routes/upload"));
const category_1 = __importDefault(require("./routes/category"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express_1.default.json());
// Increase the limit to, for example, 10MB
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
(0, conn_1.default)();
app.use('/api/v1/blog', blog_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/upload', upload_1.default);
app.use('/api/v1/categories', category_1.default);
app.get('/api/v1', (_req, res) => {
    res.send('Server is running!');
});
app.get('/', (_req, res) => {
    res.send('Server is running!');
});
app.listen(process.env.PORT || 8080, () => console.log(`Server started on http://localhost:${process.env.PORT}`));
