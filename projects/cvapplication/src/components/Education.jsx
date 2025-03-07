import { useState } from "react";
import { DateYear } from "./Date";

export function Education() {
  const [isPublished, setIsPublished] = useState(false);
  const [degree, setDegree] = useState({
    level: "HBO",
    school: "",
    title: "",
    graduationYear: false,
  });
  return (
    <div className="education-container">
      <h2>Education:</h2>
      {!isPublished ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPublished(true);
          }}
        >
          <div className="input-fields">
            <label htmlFor="level">Education level:</label>
            <select
              name="level"
              id="level"
              value={degree.level}
              onChange={(e) => setDegree({ ...degree, level: e.target.value })}
            >
              <option value="MBO">MBO - middle-level applied education</option>
              <option value="HBO">HBO - higher professional education</option>
              <option value="WO">WO - scientific education</option>
            </select>
            <label htmlFor="schoolName">School name:</label>
            <input
              id="schoolName"
              placeholder="Springfield A&M University"
              type="text"
              value={degree.school}
              onChange={(e) => setDegree({ ...degree, school: e.target.value })}
            />
            <label htmlFor="title">Title of study:</label>
            <input
              id="title"
              placeholder="Beer and Donuts Studies"
              type="text"
              value={degree.title}
              onChange={(e) => setDegree({ ...degree, title: e.target.value })}
            />
            <label htmlFor="year">Graduation year:</label>
            <DateYear
              year={degree.graduationYear}
              onChange={(year) =>
                setDegree({ ...degree, graduationYear: year })
              }
            />
          </div>
          <button className="publish-btn" type="submit" value="submit">
            Publish
          </button>
        </form>
      ) : (
        <div className="degree-published">
          <div className="degree-info">
            <p className="title">Education level:</p>{" "}
            <p className="info">{degree.level}</p>
            <p className="title">School name:</p>{" "}
            <p className="info">{degree.school}</p>
            <p className="title">Title of study:</p>{" "}
            <p className="info">{degree.title}</p>
            <p className="title">Graduation year:</p>{" "}
            <p className="info">{degree.graduationYear.getFullYear()}</p>
          </div>
          <button className="edit-btn" onClick={() => setIsPublished(false)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
