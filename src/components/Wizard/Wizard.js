import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { WizardProvider } from './context/wizard-context';
import Page1 from './WizardPages/Page1';
import Page2 from './WizardPages/Page2';
import Page3 from './WizardPages/Page3';
import './Wizard.scss';

const Wizard = (props) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const reset = () => {
    setPage(1);
  };

  return (
    <WizardProvider>
      <div className="container">
        {page === 1 && <Page1 nextPage={nextPage} />}
        {page === 2 && <Page2 nextPage={nextPage} prevPage={prevPage} />}
        {page === 3 && <Page3 prevPage={prevPage} reset={reset} />}
      </div>
    </WizardProvider>
  );
};

Wizard.propTypes = {
  maxPage: PropTypes.number.isRequired,
};

export default Wizard;
