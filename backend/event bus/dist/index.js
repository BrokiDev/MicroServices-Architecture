"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const events = [];
const PORT = 3005;
app.use(express_1.default.json());
app.post('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    events.push(req.body);
    yield axios_1.default.post('http://posts-cluster-ip-srv:3000/events', req.body);
    // await axios.post('http://localhost:3001/events',req.body)
    // await axios.post('http://localhost:3002/events',req.body).catch((err) => console.log('Error conectando al query services'));
    // await axios.post('http://localhost:3003/events',req.body)
    res.send({ status: 'OK' });
}));
app.get('/events', (req, res) => {
    res.send(events);
});
app.listen(PORT, () => {
    console.log(`APP Listening on http://localhost:${PORT}`);
});
