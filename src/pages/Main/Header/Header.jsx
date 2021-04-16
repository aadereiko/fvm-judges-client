import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Nav, Navbar, DropdownButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavbarElement } from './elements';

export const Header = ({ name, onLogout, role, nextMark }) => {
  const isAdmin = role === 'admin';
  const adminPrefix = isAdmin ? '/management' : '';
  return (
    <div>
      <NavbarElement bg="gray">
        <Navbar.Brand as={Link} to="/home">
          ФВМ.Жюри
        </Navbar.Brand>
        <Nav className="mr-auto">
          {isAdmin && (
            <Nav.Link as={Link} to="/management">
              Управление
            </Nav.Link>
          )}
          <Nav.Link as={Link} to={`${adminPrefix}/nominations`}>
            Номинации
          </Nav.Link>
          <Nav.Link as={Link} to={`${adminPrefix}/participants`}>
            Участники
          </Nav.Link>
        </Nav>
        {!isAdmin && (
          <Button
            as={Link}
            // to={nextMark ? `/photos/${nextMark.nominationId}/${nextMark.participantId}` : '#'}
            to={nextMark ? `/nextPhoto` : '#'}
            variant="dark"
            disabled={!nextMark}
          >
            Оценивать
          </Button>
        )}

        <DropdownButton variant="light" title={name} menuAlign="right">
          <Dropdown.Item onClick={onLogout}>Выйти</Dropdown.Item>
        </DropdownButton>
      </NavbarElement>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  role: PropTypes.oneOf(['judge', 'admin']),
  nextMark: PropTypes.shape({
    nominationId: PropTypes.string,
    participantId: PropTypes.string,
  }),
};
