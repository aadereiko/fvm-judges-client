import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContainer } from '../Login';
import { NominationsContainer } from '../Nominations';
import { NominationContainer } from '../Nomination';
import { ParticipantContainer } from '../Participant';
import { ParticipantPhotoContainer } from '../ParticipantPhoto';
import { ParticipantsContainer } from '../Participants';
import { Home } from '../Home';

export const authRoutes = [
  { path: '/home', component: Home },
  { path: '/participants', component: ParticipantsContainer },
  { path: '/participants/:id', component: ParticipantContainer },
  { path: '/nominations', component: NominationsContainer },
  { path: '/nominations/:id', component: NominationContainer },
  { path: '/photos/:nominationId/:participantId', component: ParticipantPhotoContainer },
  { path: '/home', isRedirect: true },
];

export const notAuthRoutes = [
  { path: '/login', component: LoginContainer },
  { path: '/login', isRedirect: true },
];
const generateRoute = ({ path, component, isRedirect = false }) =>
  isRedirect ? (
    <Redirect from="*" key={`redirect-${path}`} to={path} />
  ) : (
    <Route path={path} key={path} exact component={component} />
  );

export const generateRoutes = (isAuth) => {
  return (
    (isAuth !== null &&
      (isAuth ? authRoutes : notAuthRoutes).map((route) => generateRoute(route))) ||
    null
  );
};
