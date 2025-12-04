import { db } from "../config/db.js";

export const login = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
            if (results.length === 0) {
                return res.status(400).json({ msg: "Usuário não existe" });
            }
            return res.json(results[0]);
        }
    );
};
