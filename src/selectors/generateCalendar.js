const Generatecalendar = (datesFilled) => {
    const weeks = [];
    while (datesFilled.length > 0) {
      weeks.push(datesFilled.splice(0, 7));
    }
    return weeks;
}



export default Generatecalendar;