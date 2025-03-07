import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateYear({ year, onChange }) {
  return (
    <div id="year">
      <DatePicker
        className="year"
        placeholderText="graduation year..."
        dateFormat="yyyy"
        selected={year}
        onChange={onChange}
        showYearPicker
        required
      />
    </div>
  );
}

export function DateRange({ start, end, onChangeStart, onChangeEnd }) {
  return (
    <div id="period">
      <DatePicker
        placeholderText="start month"
        selectsStart
        selected={start}
        onChange={onChangeStart}
        startDate={start}
        showMonthYearPicker
        dateFormat="yyyy MMM"
        className="start-date"
      />
      <DatePicker
        placeholderText="end month"
        selectsEnd
        selected={end}
        onChange={onChangeEnd}
        endDate={end}
        startDate={start}
        minDate={start}
        showMonthYearPicker
        dateFormat="yyyy MMM"
        className="end-date"
      />
    </div>
  );
}
