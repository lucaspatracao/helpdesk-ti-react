import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar({ paginaAtiva, onMudarPagina }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">HelpDesk TI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            active={paginaAtiva === 'form'}
                            onClick={() => onMudarPagina('form')}
                            role="button"
                        >
                            Abrir Chamado
                        </Nav.Link>
                        <Nav.Link
                            active={paginaAtiva === 'lista'}
                            onClick={() => onMudarPagina('lista')}
                            role="button"
                        >
                            Chamados Abertos
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;