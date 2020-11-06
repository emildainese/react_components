import React, { useState, useContext } from 'react';
import Button from '../../Button/Button';
import { WizardContext } from '../context/wizard-context';

const Page2 = (props) => {
  const ctx = useContext(WizardContext);

  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const setWizardState = (e) => {
    e.preventDefault();
    ctx.page2InputHandler(email, sex);
    clearInput();
    setIsTouched(false);
    props.nextPage();
  };

  const touchedInput = () => {
    setIsTouched(true);
  };

  const clearInput = () => {
    setEmail('');
  };

  return (
    <form className="wizard-form page-2" onSubmit={setWizardState}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={touchedInput}
        />
      </div>
      <div className="form-control">
        <label htmlFor="sex">Sex</label>
        <div className="radio-input-group">
          <div className="radio-input">
            <input
              type="radio"
              name="male"
              checked={sex === 'male'}
              onChange={(e) => setSex(e.target.value)}
              value="male"
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              name="female"
              checked={sex === 'female'}
              onChange={(e) => setSex(e.target.value)}
              value="female"
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              name="other"
              checked={sex === 'other'}
              onChange={(e) => setSex(e.target.value)}
              value="other"
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <Button className="btn btn-success" onClick={props.prevPage}>
          <i
            className="fas fa-caret-left"
            style={{ marginRight: '0.3rem' }}
          ></i>
          PREV
        </Button>
        <Button className="btn btn-success" type="submit">
          NEXT <i className="fas fa-caret-right"></i>
        </Button>
      </div>
    </form>
  );
};

export default Page2;
