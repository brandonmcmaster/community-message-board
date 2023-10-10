import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar library
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the DayGrid plugin
import './App.css';


const Home = () => {

  const events = [
    { title: 'Event 1', date: '2023-10-01' },
    { title: 'Event 2', date: '2023-10-05' },
  ];


  const calendarRef = React.useRef(null);

  React.useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    const updateView = () => {
      if (window.innerWidth < 768) {
        calendarApi.changeView('dayGridDay');
      } else {
        calendarApi.changeView('dayGridMonth');
      }
    };
    window.addEventListener("resize", updateView);
    updateView();
    return () => window.removeEventListener("resize", updateView);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">
    <h1 className="text-4xl font-bold mb-4">Community Message Board</h1>
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-3xl font-bold mb-4">Featured Content</h2>
      {/* Placeholder for featured content like flyers and videos */}
      <div className="bg-gray-700 p-4 rounded">
        <img src="https://thugbrarianreview.files.wordpress.com/2014/07/blackflag.jpg" alt="Flyer for show" className="w-full h-auto rounded mb-4"/>
        <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/qHeh6RofFdU?si=7wqsxoVn_h0uSPYO" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
        </iframe>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
      
      <div className="max-h-[calc(100vh-4rem)] overflow-auto">
      <FullCalendar 
        ref={calendarRef}
        plugins={[dayGridPlugin]} 
        initialView="dayGridMonth"
        height="auto"
        contentHeight={400}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={events}
        eventColor="#4CAF50"
      />
      </div>

    </div>
  </div>
);
};

export default Home;
