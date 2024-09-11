document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.querySelector('.calendar-container');
    const currentDateElement = document.getElementById('current-date');
    const calendarElement = document.getElementById('calendar');
    const daysOfWeekElement = document.getElementById('days-of-week');
    const dateInput = document.getElementById('date-input');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    // Задаем дни недели
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    
    function renderDaysOfWeek() {
        daysOfWeekElement.innerHTML = '';
        daysOfWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            daysOfWeekElement.appendChild(dayDiv);
        });
    }

    function setSeasonBackground(month) {
        calendarContainer.classList.remove('winter', 'spring', 'summer', 'autumn');
        if (month === 11 || month <= 1) {
            calendarContainer.classList.add('winter');
        } else if (month >= 2 && month <= 4) {
            calendarContainer.classList.add('spring');
        } else if (month >= 5 && month <= 7) {
            calendarContainer.classList.add('summer');
        } else if (month >= 8 && month <= 10) {
            calendarContainer.classList.add('autumn');
        }
    }

    function renderCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        calendarElement.innerHTML = '';

        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDiv = document.createElement('div');
            calendarElement.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.addEventListener('click', () => {
                dateInput.value = `${day < 10 ? '0' : ''}${day}/${month + 1 < 10 ? '0' : ''}${month + 1}/${year}`;
                updateCurrentDate(year, month, day);
            });
            calendarElement.appendChild(dayDiv);
        }
    }

    function updateCurrentDate(year, month, day) {
        const date = new Date(year, month, day);
        const options = { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' };
        currentDateElement.textContent = date.toLocaleDateString('ru-RU', options);
    }

    function updateCalendar() {
        setSeasonBackground(currentMonth);
        renderDaysOfWeek();
        renderCalendar(currentYear, currentMonth);
        updateCurrentDate(currentYear, currentMonth, 1);
    }

    prevMonthButton.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    dateInput.addEventListener('change', () => {
        const [day, month, year] = dateInput.value.split('/').map(Number);
        if (day && month && year) {
            const date = new Date(year, month - 1, day);
            if (date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year) {
                currentYear = year;
                currentMonth = month - 1;
                updateCalendar();
            } else {
                alert('Некорректная дата');
            }
        }
    });

    updateCalendar();
});
