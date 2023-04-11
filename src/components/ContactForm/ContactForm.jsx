import { useState } from 'react';
import PropTypes from 'prop-types';
import { FieldSet, ContactButton } from './ContactForm.styled';

export const ContactForm = ({ check, submitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleStateInput = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const addContact = e => {
    e.preventDefault();

    check(name) === undefined
      ? submitForm({ name, number })
      : alert('This name exists yet.Try again!');

    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={addContact}>
      <FieldSet>
        <label htmlFor="inputName">Name </label>

        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleStateInput}
          id="inputName"
          required
        />

        <label htmlFor="inputNumber">Number</label>

        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleStateInput}
          id="inputNumber"
          required
        />

        <ContactButton type="submit">Add contact</ContactButton>
      </FieldSet>
    </form>
  );
};

ContactForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
