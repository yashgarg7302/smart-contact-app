import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
const EditContact = ({ updateContactHandler }) => {
  
     const location = useLocation();
    const { id, name, email } = location.state.contact; 
  
    const [contactDetails, setContactDetails] = useState({
      id: id,
      name: name,
      email: email,
    });

 /*  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); */
  const history = useNavigate();   

  const update = (e) => {
    e.preventDefault();
    if (contactDetails.name === "" || contactDetails.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler(contactDetails);
    /* setName("");
    setEmail(""); */
     setContactDetails({ id, name: "", email: "" }); 
    /* setContactDetails({
      ...contactDetails,
      name: e.target.value,
      email: e.target.value, 
    });*/
    
    history("/");
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="px-5 py-10 ">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Edit Contact Details
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={contactDetails.name}
                    /* onChange={(e) => setName(e.target.value)} */
                    onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          name: e.target.value,
                        })
                      }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={contactDetails.email}
                    /* onChange={(e) => setEmail(e.target.value)} */
                    onChange={(e) =>
                        setContactDetails({
                          ...contactDetails,
                          email: e.target.value,
                        })
                      }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={update}
                >
                  Update
                </button>
              </div>

              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditContact; 