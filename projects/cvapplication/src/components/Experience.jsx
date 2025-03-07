import { useState } from "react";
import { DateRange } from "./Date";

export function Experience() {
  const [isPublished, setIsPublished] = useState(false);
  const [company, setCompany] = useState({
    name: "",
    position: "",
    resposibilieties: "",
    startDate: false,
    endDate: false,
  });

  function formateDate(date) {
    let year = date.getFullYear();
    let monthIndex = date.getMonth();
    const monthsArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthsArray[monthIndex]} ${year}`;
  }

  return (
    <div className="experience-container">
      <h2>Experience</h2>
      {!isPublished ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPublished(true);
          }}
        >
          <div className="input-fields">
            <label htmlFor="companyName">Company name:</label>
            <input
              placeholder="Springfield Nuclear Power Plant"
              id="companyName"
              type="text"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
            />
            <label htmlFor="position">Position title:</label>
            <input
              placeholder="Safety Operations Manager"
              id="position"
              type="text"
              value={company.position}
              onChange={(e) =>
                setCompany({ ...company, position: e.target.value })
              }
            />
            <label htmlFor="period">Work period:</label>
            <DateRange
              start={company.startDate}
              end={company.endDate}
              onChangeStart={(date) =>
                setCompany({ ...company, startDate: date })
              }
              onChangeEnd={(date) => setCompany({ ...company, endDate: date })}
            />
            <label htmlFor="responsibilities">Responsibilities:</label>
            <textarea
              placeholder="Oversaw nuclear safety protocols, managed staff and ensured plant compliance with safety regulations"
              id="responsibilities"
              value={company.resposibilieties}
              onChange={(e) =>
                setCompany({ ...company, resposibilieties: e.target.value })
              }
              rows={4}
              cols={40}
            />
          </div>

          <button className="publish-btn" type="submit" value="submit">
            Publish
          </button>
        </form>
      ) : (
        <div className="experience-published">
          <div className="company-info">
            <p className="title">Company:</p>
            <p className="info">{company.name} </p>
            <p className="title">Position:</p>
            <p className="info">{company.position} </p>
            <p className="title">Responsibilities:</p>
            <p className="info">{company.resposibilieties}</p>
            <p className="title">Work period:</p>
            <p className="info">
              {formateDate(company.startDate)} - {formateDate(company.endDate)}
            </p>
          </div>
          <button className="edit-btn" onClick={() => setIsPublished(false)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
