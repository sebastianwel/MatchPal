import { useEffect, useState } from "react";
import styled from "styled-components";

export default function DateFilter({ selectedDate, onDateSelect, today }) {
  const [dates, setDates] = useState([]);

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
  }, []);

  return (
    <DatePickerContainer>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  text-align: center;
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
