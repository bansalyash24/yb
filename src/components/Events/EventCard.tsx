// src/components/EventCard.tsx
import React from 'react';

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  ticketsFrom: string;
  image: string;
};

const EventCard: React.FC<EventCardProps> = ({ title, date, location, ticketsFrom, image }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <p className="event-date-location">{date} on {location}</p>
        <p className="event-ticket-price">Tickets from {ticketsFrom}</p>
        <p className="event-date-location">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla nemo ad eos corporis laboruplaceat ab quam cum! Officia, esse itaque.</p>
        <button className="event-button">Tickets & Details</button>
      </div>
    </div>
  );
};

export default EventCard;
