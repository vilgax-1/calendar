import * as _ from 'lodash';
import * as moment from 'moment';

export const Filldates = (currentDate) => {
    const firstOfMonth = moment(currentDate).startOf('month').day();
    const firstDayOfGrid = moment(currentDate).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42).map((date) => {
            const d = moment(firstDayOfGrid).date(date);
            return {
            today: isToday(d),
            mDate: d,
            };
        });
}

const isToday= (date) => {
    return moment().isSame(moment(date), 'day');
}

export const isSelectedMonth = (date, currentDate) => {
    return moment(date).isSame(currentDate, 'month');
}

// export default {Filldates, isSelectedMonth}