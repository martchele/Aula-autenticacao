/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    
    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor
        this.serverUrl = 'http://localhost:3333';
        // rota do servidor
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login - email e senha
     * @returns **true** caso sucesso, **false** caso erro
     */
    async login(login) {       
        try {
            // faz a requisição POST ao servidor...
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // passando as informações de login no corpo da requisição
                body: JSON.stringify(login)
            });
            
            // Verifica alguma falha na comunicação
            if (!response.ok) {
                console.log('Erro na autenticação');
                throw new Error('Falha no login');
            }
            // caso a requisição seja bem sucedida, armazena a resposta em uma constante
            const data = await response.json();
            console.log( data );

            // verifica se o atributo auth da resposta tem o valor TRUE, se tiver é porque a autenticação teve sucesso
            if (data.auth) {
                // persistem o token, o nome e o id do professor no localstorage
                this.persistToken(data.token, data.usuario.nome, data.usuario.id_usuario);
            }

            // retorna a resposta da requisição a quem chamou a função
            return true;
        } catch (error) {
            // lança um erro em caso de falha
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} username - nome usuário recebido do servidor
     * @param {*} idUsuario - idUsuario recebido do servidor
     */
    persistToken(token, username, idUsuario) {
        // adiciona o token no localstorade com o apelido de token
        localStorage.setItem('token', token);
        // adiciona o nome de usuário no localstorade com o apelido de username
        localStorage.setItem('username', username);
        // adiciona o id da pessoa no localstorade com o apelido de idPessoa
        localStorage.setItem('idUsuario', idUsuario);
    }

    /**
     * Remove o token no localStorage
     */
    removeToken() {
        // remove o token do localstorade
        localStorage.removeItem('token');
        // remove o username do localstorage
        localStorage.removeItem('username');
        // remove o idPessoa do localstorage
        localStorage.removeItem('idPessoa');
        // redireciona o usuário para a página Home
        window.location.href = '/';
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry() {
        // recupera o valor do token no localstorage
        const token = localStorage.getItem('token');
        
        // verifica se o valor é diferente de vazio
        if (token) {
            // recupera a data de expiração do token
            const payload = JSON.parse(atob(token.split('.')[1]));
            // recuepra a hora de expiração do token
            const expiry = payload.exp;
            // pega a data e hora atual
            const now = Math.floor(Date.now() / 1000);

            // verifica se o token está expirado
            if (expiry < now) {
                // invoca a função para remover o token do localstorage
                this.removeToken();
                // retorna false
                return false;
            }
            // caso o token não esteja expirado, retorna true
            return true;
        }
        // caso o token esteja vazio, retorna false
        return false;
    }
}

export default new AuthRequests();
