class PessoaRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeListarPessoas = '/pessoas';
    }

    async listarPessoas() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarPessoas}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível listar as pessoas.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

    // Função de logout para apagar dados do localStorage
    logout() {
        // Remover o token e quaisquer outros dados armazenados
        localStorage.removeItem('token');
        // Se houver outros dados do usuário, remova-os aqui
        // localStorage.removeItem('userData');

        // Redirecionar o usuário para a página de login ou inicial
        window.location.href = '/login'; // ou outra página que deseje redirecionar
    }
}

// Criar os botões de logout e adicionar os eventos
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const logoutButtonNovo = document.getElementById('logoutButtonNovo'); // Novo botão
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            const pessoaRequests = new PessoaRequests();
            pessoaRequests.logout();
        });
    }

    // Adicionando o evento para o novo botão
    if (logoutButtonNovo) {
        logoutButtonNovo.addEventListener('click', () => {
            const pessoaRequests = new PessoaRequests();
            pessoaRequests.logout();
        });
    }
});

// No seu HTML, crie os botões com os ids "logoutButton" e "logoutButtonNovo"
// <button id="logoutButton">Logout</button>
// <button id="logoutButtonNovo">Sair da Conta</button>

export default new PessoaRequests();
