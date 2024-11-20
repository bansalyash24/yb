import React, { useState, useEffect } from 'react';
import './Header.css';

// Rename `Event` to `EventType` to avoid conflicts with the global Event type
interface Event {
  id: number; // Assuming each event has a unique ID
  title: string;
  date: string;
  location: string;
  ticketsFrom: string;
  image: string;
  tagline: string;
}

interface HeaderProps {
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;  // Update to EventType[]
  events: Event[];  // Update to EventType[]
  originalEvents: Event[];
}

const Header: React.FC<HeaderProps> = ({ setEvents, events ,originalEvents}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');  // State for the selected category

  useEffect(() => {
    // Call sortEventByTags whenever selectedTag or events change
    sortEventByTags(selectedTag);
  }, [selectedTag, events]);

  const sortEventByTags = (tag: string) => {
    let filteredEvents = originalEvents;

    if (tag !== 'All') {
      filteredEvents = filteredEvents.filter(event => event.tagline.toLowerCase() === tag.toLowerCase());
    }

    setEvents(filteredEvents);  // Update the events state with filtered data
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="https://via.placeholder.com/40" alt="Logo" />
        <span>Events</span>
      </div>

      <nav className="nav-links">
        <ul>
          <li
            className="tab-button"
            onClick={() => setSelectedTag('All')}  // Show all events
          >
            All
          </li>
          <li
            className="tab-button"
            onClick={() => setSelectedTag('Festival')}  // Show only Festival events
          >
            Festival

          </li>
          <li
            className="tab-button"
            onClick={() => setSelectedTag('Conference')}  // Show only Conference events
          >
            Conference

          </li>
          <li
            className="tab-button"
            onClick={() => setSelectedTag('Playground')}  // Show only Playground events
          >
            Playground
          </li>
        </ul>
      </nav>
      <div className="search-sort">
        <input
          type="text"
          className="search-bar"
          placeholder="Location search"
          // value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="sort-by">
          <label htmlFor="sort-options">Sort By</label>
          <select id="sort-options" name="sort-options">
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
