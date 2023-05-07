import React from 'react';
import { Link, useLocation } from "react-router-dom";


const ContactDetails = (props) => {
  const location = useLocation();
   /*  if (!props.location.state || !props.location.state.contact) {
        return <div>No contact details found.</div>;
      } */
      const {id, name, email} = location.state?.contact
      console.log(id)
  return (
    <div className="text-center text-5xl py-10 indent-8">
        <div className="pb-10">Name : {name}</div>
        <div className="pb-10">Email : {email}</div>
        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"></div>
        <div className="pt-10">
          <Link to="/">
            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Back to Contact List
            </button>
          </Link>
        </div>
    </div>
    
  );
};

export default ContactDetails;