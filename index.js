import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import EmailSender from "./SendEmail.js";
import multer from 'multer';

dotenv.config();
const app = express();
const upload = multer();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
const port = process.env.PORT || 5000;

// Second API for testing file attachmend to email
app.post("/send", upload.single('file'), async (req, res) => {
  try {
    const { fullName, date, city, birth, tournament, category, email, phone, message, } = req.body;
    const file = req.file;
    EmailSender({fullName, date, city, birth, tournament, category, email, phone, message, file})
    res.json({ msg: 'Message has been sent' });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" })
  }
})

app.get("/check", async (req, res) => {
  try {
    res.json({ msg: 'Get endpoint work fine' });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" })
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
