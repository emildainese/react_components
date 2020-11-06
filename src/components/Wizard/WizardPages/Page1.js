import React, { useContext, useState } from 'react';
import { WizardContext } from '../context/wizard-context';
import Button from '../../Button/Button';

const Page1 = (props) => {
  const ctx = useContext(WizardContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const setWizardState = (e) => {
    e.preventDefault();
    ctx.page1InputHandler(firstName, lastName);
    clearInput();
    setIsTouched(false);
    props.nextPage();
  };

  const touchedInput = () => {
    setIsTouched(true);
  };

  const clearInput = () => {
    setFirstName('');
    setLastName('');
  };

  return (
    <form className="wizard-form page-1" onSubmit={setWizardState}>
      <div className="form-control">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={touchedInput}
        />
      </div>
      <div className="form-control">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onBlur={touchedInput}
        />
      </div>
      <Button className="btn btn-success" type="submit">
        NEXT
        <i className="fas fa-caret-right" style={{ marginLeft: '0.25rem' }}></i>
      </Button>
    </form>
  );
};

export default Page1;
