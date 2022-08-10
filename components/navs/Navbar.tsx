import {Container, Nav, NavDropdown, Navbar as NavbarBase} from 'react-bootstrap';

//TODO: Sashe Vuchkov: Align it with the sidebar
export default function Navbar() {
    return (
        <NavbarBase expand="lg" fixed="top" variant="dark" className="d-block d-lg-none bg-nav">
            <Container>
                <NavbarBase.Brand >
                    <span className="focus-color">Next.Js</span> Crowd
                </NavbarBase.Brand>
                <NavbarBase.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBase.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </NavbarBase.Collapse>
            </Container>
        </NavbarBase>
    );
}