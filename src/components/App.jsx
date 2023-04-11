import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromStorage) {
      setContacts(contactsFromStorage);
    }
  }, []);

  useEffect(() => {
    if (contacts.length >= 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const formSubmitHandler = data => {
    const elementContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    setContacts(prevState => [elementContact, ...prevState]);
  };

  const checkSameName = name => {
    return contacts.find(contact => contact.name === name);
  };
  const deleteContact = id => {
    const deletedContact = contacts.filter(contact => {
      return contact.id !== id;
    });
    setContacts(deletedContact);
  };
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const valueFilter = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm submitForm={formSubmitHandler} check={checkSameName} />

      <h2>Contacts</h2>
      <Filter valueFilter={filter} inputFilter={changeFilter} />
      <ContactList contacts={valueFilter} del={deleteContact} />
    </>
  );
};
