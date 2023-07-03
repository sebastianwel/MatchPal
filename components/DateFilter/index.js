import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

export default function DateFilter({ selectedDate, onDateSelect, today }) {
  const [dates, setDates] = useState([]);
  const datePickerRef = useRef();

  useEffect(() => {
    const pastDates = [];
    const futureDates = [];

    for (let i = 7; i > 0; i--) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() - i);
      pastDates.push(newDate);
    }

    for (let i = 0; i <= 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      futureDates.push(newDate);
    }

    setDates([...pastDates, ...futureDates]);
  }, [today]);

  useEffect(() => {
    if (datePickerRef.current && dates.length > 0) {
      const selectedDateIndex = dates.findIndex(
        (date) => date.toDateString() === selectedDate?.toDateString()
      );

      if (selectedDateIndex !== -1) {
        const elementWidth = datePickerRef.current.children[0].offsetWidth;
        const containerWidth = datePickerRef.current.offsetWidth;
        const scrollOffset = (containerWidth - elementWidth) / 2;
        const scrollTo = selectedDateIndex * elementWidth - scrollOffset;

        datePickerRef.current.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [dates, selectedDate]);

  return (
    <DatePickerContainer ref={datePickerRef}>
      {dates.map((date) => (
        <DateItem
          key={date.toISOString()}
          onClick={() => onDateSelect(date)}
          selected={
            selectedDate && date.toDateString() === selectedDate.toDateString()
          }
        >
          <Day>
            {date.getDate() === today.getDate() ? (
              <Today>Heute</Today>
            ) : (
              date.toLocaleDateString("de-DE", { weekday: "short" })
            )}
          </Day>
          <FormattedDate>
            {date.toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
            })}
          </FormattedDate>
        </DateItem>
      ))}
    </DatePickerContainer>
  );
}

const DatePickerContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const DateItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#0079FF" : "#000")};
  border-bottom: ${({ selected }) => (selected ? "2px solid #0079FF" : "none")};
`;

const Today = styled.p`
  margin: 0;
`;

const Day = styled.div`
  font-size: 14px;
`;

const FormattedDate = styled.div`
  font-size: 16px;
`;

export { DatePickerContainer, DateItem, Day, FormattedDate, Today };
