import { useState } from "react";
import "../styles/GeneralInfo.css";

export function GeneralInfo() {
  const [isPublished, setIsPublished] = useState(false);
  const [name, setName] = useState("Homer Simpson");
  const [email, setEmail] = useState("homer.simpson@springfield.com");
  const [phone, setPhone] = useState("(555) 123-4567");

  return (
    <>
      {!isPublished ? (
        <div className="general-container">
          <h2>General Information:</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsPublished(true);
            }}
          >
            <div className="input-fields">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                placeholder="Homer Simpson"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                placeholder="homer.simpson@springfield.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phone">Phone number:</label>
              <input
                id="phone"
                placeholder="(555) 123-4567"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button className="publish-btn" type="submit" value="submit">
              Publish
            </button>
          </form>
        </div>
      ) : (
        <div className="general-container">
          <h1>{name} </h1>
          <div className="contact-info">
            <p>Contact information:</p>
            <p>{email} </p>
            <p>{phone}</p>
          </div>
          <button className="edit-btn" onClick={() => setIsPublished(false)}>
            Edit
          </button>
        </div>
      )}
    </>
  );
}
