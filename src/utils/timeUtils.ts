const formatTimerDuration = (timer: { hours: number, minutes: number, seconds: number }) => {
    if (timer && (timer.hours > 0 || timer.minutes > 0 || timer.seconds > 0)) {
      const { hours, minutes, seconds } = timer;
  
      const formattedHours = hours ? String(hours).padStart(2, '0') : '00';
      const formattedMinutes = minutes ? String(minutes).padStart(2, '0') : '00';
      const formattedSeconds = seconds ? String(seconds).padStart(2, '0') : '00';
  
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    return '';
};

export default formatTimerDuration;