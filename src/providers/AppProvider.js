import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

export const AppContext = createContext();

const INITIAL_STATE1 = {
  statusLinkCopied: false,
};

export function AppProvider({ children }) {
  const [statusLinkCopied, setStatusLinkCopied] = useState(INITIAL_STATE1);

  const values = useMemo(() => ({
    statusLinkCopied, setStatusLinkCopied,
  }), [statusLinkCopied, setStatusLinkCopied]);

  return (
    <AppContext.Provider value={ values }>
      <div>{children}</div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
