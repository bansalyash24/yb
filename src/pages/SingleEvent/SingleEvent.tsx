import React, { useEffect, useState } from "react";
import "./singleEvent.css";
import { FaCalendar, FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";


interface Event {
    id: string;
    title: string;
    email: string;
    date: string;
    organiser: string;
    speaker: string;
    videoUrl: string;
    location: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude: string;
    longitude: string;
    tagline: string;
    phoneNumber: string;
    endDateTime: string;
    organiserDetails: string;
    shortDescription: string;
    image: string;
    ticketsFrom: string;
    description: string;
}

const EventPage: React.FC = () => {
    const [eventData, setEventData] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddress, setShowAdress] = useState<boolean>(false)
    const [showOrganiser, setShowOrganiser] = useState<boolean>(false)

    const [suggestedEventData, setSuggestedEventData] = useState<Event[]>([])

    
    const { id } = useParams();

    const fetchSuggestedEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/events/?tagline=" + eventData?.tagline); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch event data");
            }
            const data: Event[] = await response.json();
            setSuggestedEventData(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Fetch event data from API
        const fetchEvent = async () => {
            try {
                const response = await fetch("http://localhost:5000/events/"+id); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch event data");
                }
                const data: Event = await response.json();
                setEventData(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, []);

    useEffect(() => {
        if (eventData?.tagline) fetchSuggestedEvents()
    }, [eventData?.tagline])

    console.log(suggestedEventData);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!eventData) {
        return <div>No data available</div>;
    }

    return (
        <div className="event-page">
            {/* Main Layout */}
            <div className="main-layout">
                {/* Left Section */}
                <div className="left-section">
                    {/* Event Info */}
                    <section className="event-info">
                        <img src={eventData.image} alt={eventData.title} className="event-image" />
                        <h1>{eventData.title}</h1>
                        <h4>{eventData.tagline}</h4>
                        <p>{eventData.description}</p>
                        <div className="actions">
                            <a href={eventData.videoUrl} target="_blank" rel="noopener noreferrer">
                                <button className="btn-register">REGISTER</button>
                            </a>
                            <a href={eventData.videoUrl} target="_blank" rel="noopener noreferrer">
                                <button className="btn-watch">WATCH VIDEO</button>
                            </a>
                        </div>
                    </section>

                    {/* Event Schedule */}
                    <section className="event-schedule">
                        <div className="event-day">
                            <div className="event-day-header">
                                <div className="date-icon">
                                    <span className="month">
                                        {new Date(eventData.date).toLocaleString("default", { month: "long" })}
                                    </span>
                                    <FaCalendar className="icon-calendar" />
                                    <span className="date">
                                        {new Date(eventData.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Event Card */}
                            <div className="event-details-card">
                                <div className="time-details">
                                    <FaClock className="icon-clock" />
                                    <span className="time">
                                        {new Date(eventData.date).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        -{" "}
                                        {new Date(eventData.endDateTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                                <div className="event-info">
                                    <h4>{eventData.title}</h4>
                                    <p>{eventData.shortDescription}</p>
                                    <p className="speakers">
                                        <strong>Speakers:</strong> {eventData.speaker}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Section (Map) */}
                <div className="right-section">
                    <iframe
                        title="Event Location"
                        src={`https://www.google.com/maps?q=${eventData.latitude},${eventData.longitude}&hl=es;z=14&output=embed`}
                        className="map"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>

                    <div className="event-details-card  when-where-card">
                        <h4 className="section-title">
                            <span>WHEN & WHERE</span>
                            <span onClick={() => setShowAdress(!showAddress)}><FaMinusCircle /></span>
                        </h4>
                        <hr />
                        {showAddress &&
                            <div className="event-info">
                                <p>
                                    <strong>Location:</strong> {eventData.location}
                                </p>
                                <p>{eventData.address2}</p>
                                <p>
                                    {eventData.city}, {eventData.state}, {eventData.zip}, {eventData.country}
                                </p>
                                <p>
                                    {new Date(eventData.date).toLocaleDateString()} at{" "}
                                    {new Date(eventData.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <div className="btn-calendar"><FaCalendarAlt /> Add to My Calendar</div>

                            </div>
                        }
                        <br />
                        <h4 className="section-title">
                            <span>Organiser</span>
                            <span onClick={() => setShowOrganiser(!showOrganiser)}><FaMinusCircle /></span>
                        </h4>
                        <hr />
                        {showOrganiser &&
                            <div className="event-info">
                                <p>
                                    {eventData.organiser}
                                </p>
                                <p>{eventData.organiserDetails}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* You May Like */}
            <section className="you-may-like">
                <h3>YOU MAY LIKE</h3>
                <div className="related-events">
                    {suggestedEventData?.map((item) => (
                        <Link to={`/event/${item.id}`} key={item.id} className="related-card">
                            <>
                            <img src={item.image} alt="event-s-img" />
                            <h4>{item.title}</h4>
                            <p>{new Date(item.date).toLocaleString()}</p>
                            <p>{item.location}</p>
                            <button>Tickets from {item.ticketsFrom}</button>
                            </>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default EventPage;
