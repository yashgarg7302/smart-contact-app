import React, { useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  console.log(props)
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
        /* to={{ pathname: `/contact/${contact.id}`, state: { contact } }} */
      />
    );
  });
  
  const getSearchTerm = () => {
      // console.log(inputEl.current.value);
      props.searchHandler(inputEl.current.value);
  };

  return (
    <div className="text-center px-5 py-10 lg:w-1/2 md:w-2/3 mx-auto">
      <h1 className="text-6xl pb-10">
        Contact List
        <div className="pt-10">
          <Link to="/add">
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Add Contact
            </button>
          </Link>
        </div>
      </h1>
       <div className="text-2xl py-4 pb-10">
  <input
    ref={inputEl}
    type="text"
    placeholder="Search the contact"
    className="bg-gray-100 border-2 border-gray-200 rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    value={ props.term} onChange={getSearchTerm}
  
  />
  
</div>
{/* <div className="text-2xl py-4 pb-10 relative">
  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M21 21l-4.35-4.35"
      />
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  </span>
  <input
    type="text"
    placeholder="Search the contact"
    className="bg-gray-100 border-2 border-gray-200 rounded-md py-2 pl-10 pr-4 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
  />
</div> */}

      <div>{renderContactList.length > 0 ? renderContactList: "No Contacts Available"}</div>
      
    </div>
  );
};

export default ContactList;
