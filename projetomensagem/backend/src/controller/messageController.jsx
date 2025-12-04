import { db } from "../config/db.js";

export const sendMessage = (req, res) => {
    const { chat_id, sender_id, content } = req.body;

    db.query(
        "INSERT INTO messages (chat_id, sender_id, content) VALUES (?, ?, ?)",
        [chat_id, sender_id, content],
        (err, result) => {
            if (err) return res.status(500).json(err);
            return res.json({ msg: "Mensagem enviada" });
        }
    );
};
