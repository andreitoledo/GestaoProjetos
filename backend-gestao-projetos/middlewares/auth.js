const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // 👈 já vai conter `perfil` se o token foi gerado corretamente
    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido' });
  }
};
