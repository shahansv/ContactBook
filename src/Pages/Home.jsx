import React, { useEffect, useState } from "react";
import {
  addContact,
  deleteContact,
  editContact,
  getContacts,
  updateFavorite,
} from "../services/allAPI";
import Swal from "sweetalert2";

const Home = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [contactList, setContactList] = useState([]);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getContactInfo();
  }, []);

  const onClickAdd = async () => {
    if (name.trim().length == 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please add name",
      });
    } else if (phone.trim().length == 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please add phone number",
      });
    } else {
      let reqBody = {
        name: name,
        phone: phone,
        email: email,
        photo: photo,
        favorite: false,
      };
      try {
        let apiResponse = await addContact(reqBody);
        if (apiResponse.status == 201) {
          setName("");
          setPhone("");
          setEmail("");
          setPhoto("");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Contact details added",
          });
          getContactInfo();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add contact details",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add contact details",
        });
      }
    }
  };

  const getContactInfo = async () => {
    try {
      let apiResponse = await getContacts();
      if (apiResponse.status == 200) {
        setContactList(apiResponse.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch data",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch data",
      });
      console.log(error);
    }
  };

  const onClickDelete = async (id) => {
    try {
      let apiResponse = await deleteContact(id);
      if (apiResponse.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Contact details deleted",
        });
        getContactInfo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete contact",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete contact",
      });
    }
  };

  const onClickEdit = (eachContact) => {
    setEditId(eachContact.id);
    setName(eachContact.name);
    setPhone(eachContact.phone);
    setEmail(eachContact.email);
    setPhoto(eachContact.photo);
  };

  const editContactDetails = async () => {
    try {
      let reqBody = {
        name: name,
        phone: phone,
        email: email,
        photo: photo,
      };
      let apiResponse = await editContact(editId, reqBody);
      if (apiResponse.status == 200) {
        setName("");
        setPhone("");
        setEmail("");
        setPhoto("");
        setEditId("");
        Swal.fire({
          icon: "success",
          title: "Edited",
          text: "Contact details edited",
        });
        getContactInfo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to edit contact details",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to edit contact details",
      });
    }
  };

  const onClickAddFavorite = async (id) => {
    try {
      let reqBody = {
        favorite: true,
      };
      let apiResponse = await updateFavorite(id, reqBody);
      if (apiResponse.status == 200) {
        getContactInfo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add favorite contact ",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add favorite contact ",
      });
    }
  };

  const onClickRemoveFavorite = async (id) => {
    try {
      let reqBody = {
        favorite: false,
      };
      let apiResponse = await updateFavorite(id, reqBody);
      if (apiResponse.status == 200) {
        getContactInfo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove favorite contact ",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to remove favorite contact ",
      });
    }
  };

  return (
    <>
      <div className="flex h-10 my-12 items-center justify-center">
        <img src="/ContactBookLogo.png" alt="logo" className="h-full m-2" />
        <h1 className="text-center text-4xl font-medium text-slate-200">
          Contact Book
        </h1>
      </div>
      <div className=" m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <div className="shadow-xl border border-base-300 p-6 flex flex-col justify-center items-center rounded-xl bg-white">
            <h2 className="text-slate-800 text-2xl font-semibold my-3">
              Add Contact
            </h2>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-slate-700">Name</legend>
              <input
                type="text"
                placeholder="Name"
                className="input my-1 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-slate-700">
                Phone Number
              </legend>
              <label className="input my-1 w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <input
                  type="tel"
                  className="tabular-nums w-full"
                  required
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minLength="10"
                  maxLength="10"
                  title="Must be 10 digits"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-slate-700">Email</legend>
              <label className="input my-1 w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="label text-slate-500">Optional</div>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-slate-700">Photo</legend>
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </g>
                </svg>
                <input
                  type="url"
                  required
                  placeholder="https://"
                  pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                  title="Must be valid URL"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </label>
              <div className="label text-slate-500">Optional</div>
            </fieldset>
            {editId ? (
              <button
                className="btn m-1 bg-amber-100 text-amber-500 rounded-2xl border-0 hover:bg-amber-200 hover:shadow-lg hover:text-amber-600"
                onClick={editContactDetails}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn m-1 bg-sky-100 text-sky-500 rounded-2xl border-0 hover:bg-sky-200 hover:shadow-lg hover:text-sky-600"
                onClick={onClickAdd}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-[1.2em]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14m7-7H5"
                  />
                </svg>
                Add
              </button>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 shadow-xl border border-base-300 rounded-xl bg-white">
          <div className=" p-8">
            <h1 className="text-2xl font-semibold m-3 text-slate-800">
              Favorite Contacts
            </h1>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {contactList.length > 0 ? (
                    contactList
                      .filter((favContact) => favContact.favorite == true)
                      .map((eachContact, index) => (
                        <tr key={index}>
                          <td>
                            {eachContact.favorite == true ? (
                              <div
                                className="tooltip tooltip-right"
                                data-tip="Remove from favorites"
                              >
                                <button
                                  className="btn btn-circle"
                                  title="Add to Fav"
                                  onClick={() =>
                                    onClickRemoveFavorite(eachContact.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#FE4072"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-[1.3em]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div
                                className="tooltip tooltip-right"
                                data-tip="Add to favorites"
                              >
                                <button
                                  className="btn btn-circle"
                                  onClick={() =>
                                    onClickAddFavorite(eachContact.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="size-[1.2em]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      eachContact.photo
                                        ? eachContact.photo
                                        : "https://cdn-icons-png.flaticon.com/512/7310/7310896.png "
                                    }
                                    alt={eachContact.name}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">
                                  {eachContact.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <a
                              href={`tel:${eachContact.phone}`}
                              className="text-blue-900 hover:underline"
                            >
                              {eachContact.phone}
                            </a>
                          </td>
                          <td className="text-center">
                            {eachContact.email ? (
                              <a
                                href={`mailto:${eachContact.email}`}
                                className="text-blue-900 hover:underline"
                              >
                                {eachContact.email}
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn m-1 bg-amber-100 text-amber-500 rounded-2xl border-0 hover:bg-amber-200 hover:shadow-lg hover:text-amber-600"
                              onClick={() => onClickEdit(eachContact)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn m-1 bg-red-100 text-red-500 rounded-2xl border-0 hover:bg-red-200 hover:shadow-lg hover:text-red-600"
                              onClick={() => onClickDelete(eachContact.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-xl text-red-500 font-semibold"
                      >
                        No favorite contacts added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className=" p-8">
            <h1 className="text-2xl font-semibold m-3">All Contacts</h1>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {contactList.length > 0 ? (
                    contactList.map((eachContact, index) => (
                      <tr key={index}>
                        <td>
                          {eachContact.favorite == true ? (
                            <div
                              className="tooltip tooltip-right"
                              data-tip="Remove from favorites"
                            >
                              <button
                                className="btn btn-circle"
                                title="Add to Fav"
                                onClick={() =>
                                  onClickRemoveFavorite(eachContact.id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#FE4072"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-[1.3em]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div
                              className="tooltip tooltip-right"
                              data-tip="Add to favorites"
                            >
                              <button
                                className="btn btn-circle"
                                onClick={() =>
                                  onClickAddFavorite(eachContact.id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2.5"
                                  stroke="currentColor"
                                  className="size-[1.2em]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={
                                    eachContact.photo
                                      ? eachContact.photo
                                      : "https://cdn-icons-png.flaticon.com/512/7310/7310896.png "
                                  }
                                  alt={eachContact.name}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {eachContact.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <a
                            href={`tel:${eachContact.phone}`}
                            className="text-blue-900 hover:underline"
                          >
                            {eachContact.phone}
                          </a>
                        </td>
                        <td className="text-center">
                          {eachContact.email ? (
                            <a
                              href={`mailto:${eachContact.email}`}
                              className="text-blue-900 hover:underline"
                            >
                              {eachContact.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn m-1 bg-amber-100 text-amber-500 rounded-2xl border-0 hover:bg-amber-200 hover:shadow-lg hover:text-amber-600"
                            onClick={() => onClickEdit(eachContact)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn m-1 bg-red-100 text-red-500 rounded-2xl border-0 hover:bg-red-200 hover:shadow-lg hover:text-red-600"
                            onClick={() => onClickDelete(eachContact.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-xl text-red-500 font-semibold"
                      >
                        No contacts added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
