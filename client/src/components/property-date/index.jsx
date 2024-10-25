import styles from './style.module.scss';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // for the style of the date

export default function CustomDateRangePicker({
  className,
  propertyId,
  fetchBookedDatesUrl,
  onReserveSuccess, // Callback after successful reservation
}) {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: addDays(new Date(), 7) });
  const [bookedDates, setBookedDates] = useState([]);
  const [pricePerNight, setPricePerNight] = useState(null);
  const [error, setError] = useState(null);
  
  // Retrieve userId from localStorage
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // Fetch property details including price per night
        const propertyResponse = await fetch(`http://localhost:5000/properties/${propertyId}`);
        if (!propertyResponse.ok) throw new Error("Failed to fetch property details");
        const propertyData = await propertyResponse.json();
        setPricePerNight(propertyData.pricePerNight);

        // Fetch booked dates for the property
        const bookedDatesResponse = await fetch(fetchBookedDatesUrl);
        if (!bookedDatesResponse.ok) throw new Error("Failed to fetch booked dates");
        const bookedDatesData = await bookedDatesResponse.json();
        setBookedDates(bookedDatesData);
      } 
      catch (err) {
        setError(err.message);
      }
    };

    fetchPropertyData();
  }, [propertyId, fetchBookedDatesUrl]);

  const handleDateChange = (date, name) => {
    setDateRange((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const reserveBooking = async () => {
    // Log the required values for debugging
    console.log("UserId:", userId);
    console.log("PropertyId:", propertyId);
    console.log("Start Date:", dateRange.from);
    console.log("End Date:", dateRange.to);
    console.log("Price Per Night:", pricePerNight);

    // Validate required fields
    if (!userId || !propertyId || !dateRange.from || !dateRange.to || pricePerNight === null) {
      setError("Missing required fields for booking.");
      return;
    }

    const totalNights = Math.max(0, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)));
    const totalCost = totalNights * pricePerNight;

    // Create reservation data
    const reservationData = {
      userId,
      propertyId,
      startDate: dateRange.from.toISOString(), // Convert to ISO string
      endDate: dateRange.to.toISOString(), // Convert to ISO string
      totalCost,
    };

    // Send reservation request to the server
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Capture error message from server
        throw new Error(errorData.message || "Failed to reserve booking");
      }

      const data = await response.json();
      console.log("Booking successful:", data);

      // Call the success callback if provided
      if (onReserveSuccess) {
        onReserveSuccess(reservationData);
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
};

  const isDateBlocked = (date) => {
    return bookedDates.some(({ startDate, endDate }) => {
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.className}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.flex}>
          <DatePicker className={`${styles.date} ${styles['date-picker']}`} selected={dateRange.from} onChange={(date) => handleDateChange(date, "from")} selectsStart startDate={dateRange.from} endDate={dateRange.to} excludeDates={bookedDates.flatMap(({ startDate, endDate }) => {
              const range = [];
              let currentDate = new Date(startDate);
              while (currentDate <= new Date(endDate)) {
                range.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return range;
            })}
            inline
          />
          <DatePicker className={`${styles.date} ${styles['date-picker']}`} selected={dateRange.to} onChange={(date) => handleDateChange(date, "to")} selectsEnd startDate={dateRange.from} endDate={dateRange.to} excludeDates={bookedDates.flatMap(({ startDate, endDate }) => {
              const range = [];
              let currentDate = new Date(startDate);
              while (currentDate <= new Date(endDate)) {
                range.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return range;
            })}
            inline
          />
        </div>
        <hr />
        <div className={styles.cost__breakdown}>
          <p className={styles.cost}>Cost Breakdown</p>
          <p>Start Date: {format(dateRange.from, "MMM dd, yyyy")}</p>
          <p>End Date: {format(dateRange.to, "MMM dd, yyyy")}</p>
          <p>Total Stay: ${pricePerNight} x {Math.max(0, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)))} nights</p>
          <h3>Total: ${(Math.max(0, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))) * (pricePerNight || 0)).toFixed(2)}</h3>
          <button onClick={reserveBooking} disabled={!pricePerNight}>Reserve Now<i className="ri-arrow-right-line"></i></button>
          <button className={styles.clear} onClick={() => setDateRange({ from: new Date(), to: addDays(new Date(), 7) })}>Clear Date<i className="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </section>
  );
}

CustomDateRangePicker.propTypes = {
  className: PropTypes.string,
  propertyId: PropTypes.string.isRequired,
  fetchBookedDatesUrl: PropTypes.string.isRequired,
  onReserveSuccess: PropTypes.func,
};
