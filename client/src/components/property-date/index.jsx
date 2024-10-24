import styles from './style.module.scss'
import { useState } from "react";
import PropTypes from "prop-types";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; //for the style of the date

export default function CustomDateRangePicker({ className }) {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: addDays(new Date(), 7), });

  const handleDateChange = (date, name) => {
    setDateRange((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  return (
    <section className={styles.container}>
        <div className={className}>
            <div>
            <DatePicker selected={dateRange.from} onChange={(date) => handleDateChange(date, "from")} selectsStart startDate={dateRange.from} endDate={dateRange.to} inline />
            <DatePicker selected={dateRange.to} onChange={(date) => handleDateChange(date, "to")} selectsEnd startDate={dateRange.from} endDate={dateRange.to} inline />
            </div>
            <hr />  
            <div className={styles.cost__breakdown}>
                <p>Cost Breakdown</p>
                <p>Start Date: {format(dateRange.from, "MMM dd, yyyy")}</p>
                <p>End Date: {format(dateRange.to, "MMM dd, yyyy")}</p>
                <p>Total Stay: $100 x {Math.max(0, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))).toFixed(0)} nights</p>
                <p>Taxes and fees: ${Math.max(0, (dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)).toFixed(2) * 5}</p>
                <h3>Total: ${Math.max(0, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))) * 100 + Math.max(0, (dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)).toFixed(2) * 5}</h3>
                <button onClick={() => console.log("Reserve Now")}>Reserve Now</button>
                <button onClick={() => setDateRange({ from: new Date(), to: addDays(new Date(), 7) })}>Clear Date</button>
            </div>
        </div>
    </section>
  );
}

CustomDateRangePicker.propTypes = {
  className: PropTypes.string,
};
