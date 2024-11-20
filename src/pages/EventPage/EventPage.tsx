import React, { useEffect, useState } from 'react';
import EventCard from '../../components/Events/EventCard';
import './eventPage.css';
import Header from '../../components/Header/Header';
import axios from 'axios';

// Define the type for an Event object
interface Event {
  id: number; // Assuming each event has a unique ID
  title: string;
  date: string;
  location: string;
  ticketsFrom: string;
  image: string;
  tagline:string
}

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // State typed as an array of Event
  const [originalEvents,setOriginalEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:5000/events');
        setEvents(response.data); // Set the response data to events state
        setOriginalEvents(response.data)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the async function to fetch events
  }, []);

  return (
    <>
      <Header setEvents={setEvents} events={events} originalEvents={originalEvents}/>
      <div className="event-body">
        <div className="event-page">
          <div className="event-list">
            {events.map((event) => (
              <EventCard
                key={event.id} // Use a unique ID for the key
                title={event.title}
                date={event.date}
                location={event.location}
                ticketsFrom={event.ticketsFrom}
                image={event.image}
              />
            ))}
          </div>
          <button className="see-all-button">See All Events</button>
        </div>
      </div>
    </>
  );
};

export default EventPage;
