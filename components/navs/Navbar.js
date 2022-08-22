"use strict";
exports.__esModule = true;
var react_bootstrap_1 = require("react-bootstrap");
//TODO: Sashe Vuchkov: Align it with the sidebar
function Navbar() {
    return (<react_bootstrap_1.Navbar expand="lg" fixed="top" variant="dark" className="d-block d-lg-none bg-nav">
            <react_bootstrap_1.Container>
                <react_bootstrap_1.Navbar.Brand>
                    <span className="focus-color">Next.Js</span> Crowd
                </react_bootstrap_1.Navbar.Brand>
                <react_bootstrap_1.Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <react_bootstrap_1.Navbar.Collapse id="responsive-navbar-nav">
                    <react_bootstrap_1.Nav className="me-auto">
                        <react_bootstrap_1.Nav.Link href="#features">Features</react_bootstrap_1.Nav.Link>
                        <react_bootstrap_1.Nav.Link href="#pricing">Pricing</react_bootstrap_1.Nav.Link>
                        <react_bootstrap_1.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <react_bootstrap_1.NavDropdown.Item href="#action/3.1">Action</react_bootstrap_1.NavDropdown.Item>
                            <react_bootstrap_1.NavDropdown.Item href="#action/3.2">
                                Another action
                            </react_bootstrap_1.NavDropdown.Item>
                            <react_bootstrap_1.NavDropdown.Item href="#action/3.3">Something</react_bootstrap_1.NavDropdown.Item>
                            <react_bootstrap_1.NavDropdown.Divider />
                            <react_bootstrap_1.NavDropdown.Item href="#action/3.4">
                                Separated link
                            </react_bootstrap_1.NavDropdown.Item>
                        </react_bootstrap_1.NavDropdown>
                    </react_bootstrap_1.Nav>
                    <react_bootstrap_1.Nav>
                        <react_bootstrap_1.Nav.Link href="#deets">More deets</react_bootstrap_1.Nav.Link>
                        <react_bootstrap_1.Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </react_bootstrap_1.Nav.Link>
                    </react_bootstrap_1.Nav>
                </react_bootstrap_1.Navbar.Collapse>
            </react_bootstrap_1.Container>
        </react_bootstrap_1.Navbar>);
}
exports["default"] = Navbar;
