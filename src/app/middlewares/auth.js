import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

function authMiddleware(request, response, next) {
    // Obtém o token do cabeçalho de autorização
    const authToken = request.headers.authorization;

    // Verifica se o token está presente
    if (!authToken) {
        return response.status(401).json({ error: "Token not provided" });
    }

    // Extrai o token do cabeçalho
    const token = authToken.split(' ')[1];

    // Verifica o token JWT
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            // Se houver erro na verificação, retorna erro 401
            return response.status(401).json({ error: "Token is invalid" });
        }
        // Se o token for válido, adiciona o ID e o nome do usuário à solicitação
        request.userId = decoded.id;
        request.userName = decoded.name;

        // Continua para o próximo middleware ou rota
        return next();
    });
}

export default authMiddleware;
