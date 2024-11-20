import React, { useState } from 'react';
import './CreateEvent.css';
import axios from 'axios';
// Validation helper functions
const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone: string) => /^\d{10}$/.test(phone); // Assuming a 10-digit phone number
const validateRequired = (value: string) => value.trim() !== '';

const CreateEvent: React.FC = () => {
  // State for form data
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: 'Festival',
    tagline: '',
    email: '',
    phoneNumber: '',
    startDate: '',
    endDate: '',
    organiser: '',
    organiserDetails: '',
    speaker: '',
    videoUrl: '',
    imageFolderPath: '',
    ticketPrice: '',
    speakerDescription: '',
    description: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    lat: '',
    long: '',
  });

  // State for errors
  const [errors, setErrors] = useState<any>({});

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: any = {};

    // Validate all required fields
    if (!validateRequired(eventData.eventName)) validationErrors.eventName = 'Event name is required';
    if (!validateRequired(eventData.tagline)) validationErrors.tagline = 'Tagline is required';
    if (!validateRequired(eventData.email) || !validateEmail(eventData.email)) validationErrors.email = 'Valid email is required';
    if (!validateRequired(eventData.phoneNumber) || !validatePhone(eventData.phoneNumber)) validationErrors.phoneNumber = 'Valid phone number is required';
    if (!validateRequired(eventData.startDate)) validationErrors.startDate = 'Start date is required';
    if (!validateRequired(eventData.endDate)) validationErrors.endDate = 'End date is required';
    if (!validateRequired(eventData.organiser)) validationErrors.organiser = 'Organizer is required';
    if (!validateRequired(eventData.speaker)) validationErrors.speaker = 'Speaker is required';
    if (!validateRequired(eventData.imageFolderPath)) validationErrors.imageFolderPath = 'Image folder path is required';
    if (!validateRequired(eventData.speakerDescription)) validationErrors.speakerDescription = 'Speaker description is required';
    if (!validateRequired(eventData.description)) validationErrors.description = 'Description is required';
    if (!validateRequired(eventData.address1)) validationErrors.address1 = 'Address1 is required';
    if (!validateRequired(eventData.city)) validationErrors.city = 'City is required';
    if (!validateRequired(eventData.state)) validationErrors.state = 'State is required';
    if (!validateRequired(eventData.zipCode)) validationErrors.zipCode = 'Zip code is required';
    if (!validateRequired(eventData.country)) validationErrors.country = 'Country is required';
    if (!validateRequired(eventData.lat)) validationErrors.lat = 'Latitude is required';
    if (!validateRequired(eventData.long)) validationErrors.long = 'Longitude is required';

    if (Object.keys(validationErrors).length === 0) {
      // Handle successful form submission, e.g., creating a new event
      // Create a new FormData object
      const formData = new FormData();

      // Append form data
      formData.append('eventName', eventData.eventName);
      formData.append('eventType', eventData.eventType);
      formData.append('tagline', eventData.tagline);
      formData.append('email', eventData.email);
      formData.append('phoneNumber', eventData.phoneNumber);
      formData.append('startDate', eventData.startDate);
      formData.append('endDate', eventData.endDate);
      formData.append('organiser', eventData.organiser);
      formData.append('speaker', eventData.speaker);
      formData.append('speakerDescription', eventData.speakerDescription);
      formData.append('description', eventData.description);
      formData.append('address1', eventData.address1);
      formData.append('city', eventData.city);
      formData.append('state', eventData.state);
      formData.append('zipCode', eventData.zipCode);
      formData.append('country', eventData.country);
      formData.append('lat', eventData.lat);
      formData.append('long', eventData.long);

      // Optional: append files (e.g., image)
      // formData.append('image', imageFile);
      const response = await axios.post("http://localhost:5000/events", formData)
      console.log('Event created:', response);
    } else {
      setErrors(validationErrors);
      setTimeout(()=>{
        setErrors({});
      },2000)
    }
  };


  // Function to handle geolocation API and set lat/long
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setEventData({
            ...eventData,
            lat: latitude.toString(),
            long: longitude.toString(),
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          setErrors({
            ...errors,
            lat: 'Unable to retrieve location',
            long: 'Unable to retrieve location',
          });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setErrors({
        ...errors,
        lat: 'Geolocation is not supported by this browser.',
        long: 'Geolocation is not supported by this browser.',
      });
    }
  };


  // Enable Create button only if all required fields are valid
  const isFormValid = Object.keys(errors).length === 0 && Object.values(eventData).every((value) => value.trim() !== '');

  return (
    <div className="create-event-container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleInputChange}
            required
          />
          {errors.eventName && <span className="error">{errors.eventName}</span>}
        </div>

        {/* Event Type */}
        <div className="form-group">
          <label>Event Type</label>
          <select
            name="eventType"
            value={eventData.eventType}
            onChange={handleInputChange}
            required
          >
            <option value="Festival">Festival</option>
            <option value="Conference">Conference</option>
            <option value="Playground">Playground</option>
          </select>
        </div>

        {/* Tagline */}
        <div className="form-group">
          <label>Tagline</label>
          <input
            type="text"
            name="tagline"
            value={eventData.tagline}
            onChange={handleInputChange}
            required
          />
          {errors.tagline && <span className="error">{errors.tagline}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={eventData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={eventData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        {/* Start Date */}
        <div className="form-group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDate"
            value={eventData.startDate}
            onChange={handleInputChange}
            required
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </div>

        {/* End Date */}
        <div className="form-group">
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            name="endDate"
            value={eventData.endDate}
            onChange={handleInputChange}
            required
          />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </div>

        {/* Organizer */}
        <div className="form-group">
          <label>Organizer</label>
          <input
            type="text"
            name="organiser"
            value={eventData.organiser}
            onChange={handleInputChange}
            required
          />
          {errors.organiser && <span className="error">{errors.organiser}</span>}
        </div>

        {/* Organizer Details (Optional) */}
        <div className="form-group">
          <label>Organizer Details</label>
          <input
            type="text"
            name="organiserDetails"
            value={eventData.organiserDetails}
            onChange={handleInputChange}
          />
        </div>

        {/* Speaker */}
        <div className="form-group">
          <label>Speaker</label>
          <input
            type="text"
            name="speaker"
            value={eventData.speaker}
            onChange={handleInputChange}
            required
          />
          {errors.speaker && <span className="error">{errors.speaker}</span>}
        </div>

        {/* Video URL (Optional) */}
        <div className="form-group">
          <label>Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={eventData.videoUrl}
            onChange={handleInputChange}
          />
        </div>

        {/* Image Folder Path */}
        <div className="form-group">
          <label>Image Folder Path</label>
          <input
            type="text"
            name="imageFolderPath"
            value={eventData.imageFolderPath}
            onChange={handleInputChange}
            required
          />
          {errors.imageFolderPath && <span className="error">{errors.imageFolderPath}</span>}
        </div>

        {/* Ticket Price (Optional) */}
        <div className="form-group">
          <label>Ticket Price</label>
          <input
            type="text"
            name="ticketPrice"
            value={eventData.ticketPrice}
            onChange={handleInputChange}
          />
        </div>

        {/* Speaker Description */}
        <div className="form-group">
          <label>Speaker Description</label>
          <input
            type="text"
            name="speakerDescription"
            value={eventData.speakerDescription}
            onChange={handleInputChange}
            required
          />
          {errors.speakerDescription && <span className="error">{errors.speakerDescription}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <input
            type='text'
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        {/* Address1 */}
        <div className="form-group">
          <label>Address1</label>
          <input
            type="text"
            name="address1"
            value={eventData.address1}
            onChange={handleInputChange}
            required
          />
          {errors.address1 && <span className="error">{errors.address1}</span>}
        </div>

        {/* Address2 (Optional) */}
        <div className="form-group">
          <label>Address2</label>
          <input
            type="text"
            name="address2"
            value={eventData.address2}
            onChange={handleInputChange}
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={eventData.city}
            onChange={handleInputChange}
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* State */}
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={eventData.state}
            onChange={handleInputChange}
            required
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        {/* Zip Code */}
        <div className="form-group">
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={eventData.zipCode}
            onChange={handleInputChange}
            required
          />
          {errors.zipCode && <span className="error">{errors.zipCode}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={eventData.country}
            onChange={handleInputChange}
            required
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        {/* Latitude */}
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="text"
            name="lat"
            value={eventData.lat}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={getLocation}>Use Current Location</button>
          {errors.lat && <span className="error">{errors.lat}</span>}
        </div>

        {/* Longitude */}
        <div className="form-group">
          <label>Longitude</label>
          <input
            type="text"
            name="long"
            value={eventData.long}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={getLocation}>Use Current Location</button>
          {errors.long && <span className="error">{errors.long}</span>}
        </div>


        {/* Create Event Button */}
        <div className="form-group">
          <button type="submit" disabled={!isFormValid}>
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
