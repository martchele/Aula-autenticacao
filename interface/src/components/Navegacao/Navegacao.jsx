import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {
    // criando estados para controlar a renderização condicional
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');  // novo estado para armazenar o nome do usuário

    /**
    * Verifica a autenticação do usuário
    */
    useEffect(() => {
        const token = localStorage.getItem('token');  // recupera o token do localstorage
        const storedUserName = localStorage.getItem('userName');  // recupera o nome do usuário do localStorage
        if (token && AuthRequests.checkTokenExpiry()) {  // verifica a validade do token
            setIsAuthenticated(true);  // caso o token seja válido, seta o valor de autenticação para true
            setUserName(storedUserName || '');  // define o nome do usuário
        } else {
            setIsAuthenticated(false);  // caso o token seja inválido, seta o valor de autenticação para false
            setUserName('');  // limpa o nome do usuário
        }
    }, []);

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const logout = () => {
        AuthRequests.removeToken();
    }

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    {/* a opção Home é renderizada para todos os usuários, independente de estarem autenticados ou não */}
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    {isAuthenticated ? ( // verifica se o usuário está autenticado (true)
                        // renderiza as opções de navegação para usuário autenticado
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>
                            {/* Saudação ao usuário logado */}
                            <Navbar.Text style={{ marginRight: '10px' }}>
                                Olá ADMINISTRADOR {userName}
                            </Navbar.Text>
                            <Button variant='light' onClick={logout}>Sair</Button>
                        </>
                    ) : (
                        // renderiza as opções de navegação para usuário não autenticado
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;