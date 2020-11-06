import React, { useState, useContext } from 'react';
import { WizardContext } from '../context/wizard-context';
import Button from '../../Button/Button';

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const Page3 = (props) => {
  const ctx = useContext(WizardContext);
  console.log(ctx);
  const [color, setColor] = useState('');
  const [employed, setEmployed] = useState(false);
  const [note, setNote] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const setWizardState = (e) => {
    e.preventDefault();
    ctx.page3InputHandler(color, employed, note);
    setIsTouched(false);
  };

  const touchedInput = () => {
    setIsTouched(true);
  };

  return (
    <form className="wizard-form page-3" onSubmit={setWizardState}>
      <div className="form-control">
        <label htmlFor="color">Favourite Colors</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select a color...</option>
          {colors.map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control checkbox">
        <label htmlFor="employed">Employed</label>
        <input
          type="checkbox"
          name="employed"
          value={employed}
          onChange={(e) => setEmployed(e.target.checked)}
        />
      </div>
      <div className="form-control">
        <textarea
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={touchedInput}
        ></textarea>
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
          SUBMIT
        </Button>
      </div>
    </form>
  );
};

export default Page3;
