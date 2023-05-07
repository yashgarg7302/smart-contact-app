import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";

const LOCAL_STORAGE_KEY = "contacts";
function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);
   // RetrieveContacts
   const retrieveContacts = async () => {
      const response = await api.get("/contacts");
      return response.data;
   };


  const addContactHandler =  async (contact) => {
    const request = { id: uuid(), ...contact };

    const response = await api.post("/contacts",request)
    setContacts([...contacts, response.data]);
  };
  
  const updateContactHandler = async (contact) => {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      const { id, name, email } = response.data;
      setContacts(
        contacts.map((contact) => {
          return contact.id === id ? { ...response.data } : contact;
        })
      );
    };

   useEffect(() => {
  //  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //  if (retriveContacts) setContacts(retriveContacts);

  const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  };

    getAllContacts();
  }, []); 
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

   const searchHandler = (value) => {
      console.log(value);
      setSearchTerm(value);
      if(value !== ""){
        const newContactList = contacts.filter((contact) => {
          return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResults(newContactList);
      }
      else{
        setSearchResults(contacts);
      }
   };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={<ContactList
                /* contacts={contacts} */
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchHandler={searchHandler}
                />}
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit"
            element={<EditContact updateContactHandler={updateContactHandler} />}
          />
          {/* <AddContact addContactHandler={addContactHandler} /> */}
          {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
          <Route 
              path="/contact/:id" element={<ContactDetails/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
