const Findreminders = (data, dates) => {
    return (dates.filter(o => o.date === data)).sort((a,b) => (a.time > b.time) ? 1 : -1);
}
export default Findreminders;
