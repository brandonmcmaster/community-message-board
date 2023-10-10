import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import './App.css';

const Home = () => {
  const events = [
    { title: 'RAMONES', date: '2023-10-01', image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/punk-rock-flyer-design-template-76be9ac1eff3d7ef5aef11a692917218_screen.jpg?ts=1636984177" },
    { title: 'DEAD KENNEDYS', date: '2023-10-05', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_RHjVrkH6yg8sFw65jPCBpMxryOnMsGS5699PAQN6g&s" },
    { title: 'BLACK FLAG', date: '2023-10-10', image: "https://thugbrarianreview.files.wordpress.com/2014/07/blackflag.jpg" },
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

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <img 
          src={eventInfo.event.extendedProps.image} 
          alt={eventInfo.event.title} 
          className="w-12 h-12 rounded-full cursor-pointer" 
          onClick={() => window.open(eventInfo.event.extendedProps.image, '_blank')} // Opens image in a new tab
        />
        <div>{eventInfo.event.title}</div>
      </>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
    <h1 className="text-4xl font-bold mb-4">Community Message Board</h1>
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-3xl font-bold mb-4">Featured Content</h2>
      {/* Placeholder for featured content like flyers and videos */}
      <div className="bg-gray-700 p-4 rounded">
        <img src="https://thugbrarianreview.files.wordpress.com/2014/07/blackflag.jpg" alt="Flyer for show" className="w-[300px] h-[400px] rounded mb-4 mx-auto"/>
        <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/qHeh6RofFdU?si=7wqsxoVn_h0uSPYO" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
        className="block mx-auto">
        </iframe>
      </div>
      
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
        eventContent={renderEventContent}  // Custom event rendering
      />
    </div>

    </div>
  </div>
);
};

export default Home;
