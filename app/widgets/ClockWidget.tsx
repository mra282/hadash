import React, { useEffect, useRef } from 'react';

type ClockWidgetProps = {
  
};

export const ClockWidget = () => {
  const hourRef = useRef<HTMLDivElement>(null); // Add type annotation to hourRef
  const minuteRef = useRef<HTMLDivElement>(null); // Add type annotation to minuteRef
  const secondRef = useRef<HTMLDivElement>(null); // Add type annotation to secondRef

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const second = now.getSeconds();
      const minute = now.getMinutes();
      const hour = now.getHours();

      if (secondRef.current) {
        const secondElement = secondRef.current; // Remove unnecessary type casting
        secondElement.style.setProperty('--p', `${second * 100 / 60}`); // Convert number to string
        const secondsElement = secondElement.querySelector('#seconds');
        if (secondsElement) {
          secondsElement.textContent = second.toString(); // Convert second to a string
        }
      }

      if (minuteRef.current) {
        const minuteElement = minuteRef.current; // Remove unnecessary type casting
        minuteElement.style.setProperty('--p', `${minute * 100 / 60}`); // Convert number to string
        const minutesElement = minuteElement.querySelector('#minutes');
        if (minutesElement) {
          minutesElement.textContent = minute.toString(); // Convert minute to a string
        }
      }

      if (hourRef.current) {
        hourRef.current.style.setProperty('--p', `${hour * 100 / 24}`); // Convert number to string
        const hourElement = hourRef.current.querySelector('#hour');
        if (hourElement) {
          hourElement.textContent = hour.toString(); // Convert hour to a string
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
   <main className="container flex flex-col lg:flex-row gap-8 lg:gap-10">
  <article
    ref={hourRef}
    className="relative w-32 h-32 inline-grid place-content-center text-center border-8 border-[#191919] rounded-full before:rounded-full after:rounded-full after:absolute before:absolute before:-inset-2 pie no-round"
    style={{ '--p': 20, '--c': 'rgba(253, 41, 112, 1)' } as React.CSSProperties} // Add type annotation to style object
  >
    <h3 className="font-bold text-base lg:text-lg xl:text-xl flex flex-col gap-1 lg:gap-3">
      <span className="text-4xl " id="hour"></span>
    </h3>
  </article>
  <article
    ref={minuteRef}
    className="relative w-32 h-32 inline-grid place-content-center text-center border-8 border-[#191919] rounded-full before:rounded-full after:rounded-full after:absolute before:absolute before:-inset-2 pie no-round"
    style={{ '--p': 20, '--c': 'rgba(252, 230, 0, 1)' } as React.CSSProperties}
  >
    <h3 className="font-bold text-base lg:text-lg xl:text-xl flex flex-col gap-1 lg:gap-3">
      <span className="text-4xl " id="minutes"></span>
    </h3>
  </article>
  <article
    ref={secondRef}
    className="relative w-32 h-32 inline-grid place-content-center text-center border-8 border-[#191919] rounded-full before:rounded-full after:rounded-full after:absolute before:absolute before:-inset-2 pie no-round"
    style={{ '--p': 20, '--c': 'rgba(6, 252, 63, 1)' } as React.CSSProperties}
  >
    <h3 className="font-bold text-base lg:text-lg xl:text-xl flex flex-col gap-1 lg:gap-3">
      <span className="text-4xl " id="seconds"></span>
    </h3>
  </article>
</main>
  );
};