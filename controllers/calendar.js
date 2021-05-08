const Event = require('../models/event');
const BlockedEvent = require('../models/blockedEvent');

const customdate = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayInMonth = currentDate.getDate();
    return  `${dayInMonth}.${month+1}.${year}`;
}

const sendEvents = (date, events, blockedEvents) => {
    const currentDate = new Date(date) 
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayInMonth = currentDate.getDate(); // This is number of the day in month  1 - 31
    const day = currentDate.getDay(); // This is number of the day in week 0 - 6
    const customDate = customdate(currentDate);
    const eventsList = [];     

    const check = (blockedEv, event) => {
        if (blockedEv.length > 0) {
            return  blockedEv.map((blockedEvent) => { 
                if(blockedEvent.date === customDate && blockedEvent.eventId === event.id) {
                    return true
                } else {
                    return false
                }
            })
        } else {
            return false
        }   
    }

        events.map((event, i) => { 
            const fullEventDate = new Date(event.date);
            const eventYear = fullEventDate.getFullYear();
            const eventMonth = fullEventDate.getMonth();
            const eventDayInMonth = fullEventDate.getDate();
            const eventDay = fullEventDate.getDay();
            const eventDate = `${eventDayInMonth}.${eventMonth+1}.${eventYear}`;
            
            if (check(blockedEvents, event)[0] === false || check(blockedEvents, event) === false) {
                if (eventDate === customDate) {
                    eventsList.push(event);       
                } else if (event.repeat === 'weekly' && eventDay === day && month >= eventMonth && year >= eventYear) {     
                    if (month === eventMonth && dayInMonth > eventDayInMonth) {
                        eventsList.push(event); 
                    } else if (month > eventMonth  && year === eventYear)  {
                        eventsList.push(event); 
                    } else if (year > eventYear) {
                        eventsList.push(event);
                    }
                } else if (event.repeat === 'monthly' && eventDayInMonth === dayInMonth && month >= eventMonth && year >= eventYear) {
                    eventsList.push(event);
                } else if (event.repeat === 'yearly' && eventDayInMonth === dayInMonth && eventMonth === month && year >= eventYear) {
                    eventsList.push(event);
                }               
            }                                     
        })
    return  eventsList
}

const daysWithEvents = (events, blockedEvents) => {
    const eventsDatesList = [];
    
    const check = (blockedEv, customDate) => {
        if (blockedEv.length > 0) {
            return blockedEv.map((blockedEvent) => { 
                if(blockedEvent.date === customDate) {
                    return true
                } else {
                    return false
                }
            })
        } else {
            return false
        }   
    }
  
    events.map((event, i) => {
        const date = new Date(event.date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate(); //Before pushing into production add +1 because server have different date propably // let day = date.getDate()+1;


        if (event.repeat === 'norepeat') {
            eventsDatesList.push(`${day}.${month}.${year}`);  
            console.log(`${day}.${month}.${year}`)
            if (`${day}.${month}.${year}` === `${1}.${month}.${year}`) {
                console.log(`${day}.${month}.${year}`)
                eventsDatesList.push(`${day}.${month}.${year}`); 
            }      
        } else if (event.repeat === 'weekly') {
            let count = 0;
            for (count = 0; count < 500; count++) {
                let daysInMonth = 0;
                if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12 ) {
                 daysInMonth = 31;
                } else if (month === 2) {
                    if (year % 4 === 0) {
                     daysInMonth = 29; 
                    } else {
                     daysInMonth = 28; 
                    }
                } else if (month === 4 || month === 6 || month === 9 || month === 11) {
                    daysInMonth = 30;
                } 

                if (day > daysInMonth - 7) {
                    if (month === 12) {
                        if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                            eventsDatesList.push(`${day}.${month}.${year}`);
                        } 
                        day = day + 7 - daysInMonth
                        month = 1
                        year = year + 1 
                    } else {
                        if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                            eventsDatesList.push(`${day}.${month}.${year}`);
                        } 
                        month = month+1
                        day = day + 7 - daysInMonth 
                    }
                } else {
                    if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                        eventsDatesList.push(`${day}.${month}.${year}`);
                    } 
                    day = day + 7
                }
            } 
        } else if (event.repeat === 'monthly') {
            let count = 0;
            for (count = 0; count < 300; count++) {
                if (month === 12) {
                    if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                        eventsDatesList.push(`${day}.${month}.${year}`);
                    } 
                    year = year + 1
                    month = 1
                } else {
                    if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                        eventsDatesList.push(`${day}.${month}.${year}`);
                    } 
                    month = month + 1
                }
            } 
        } else if (event.repeat === 'yearly') {
            let count = 0;
            for (count = 0; count < 60; count++) {
                if (check(blockedEvents, `${day}.${month}.${year}`)[0] === false || check(blockedEvents, `${day}.${month}.${year}`) === false) {
                    eventsDatesList.push(`${day}.${month}.${year}`);
                } 
                year = year + 1
            } 
        }
    })
    return eventsDatesList
}

exports.getEvents = async (req, res, next) => {
    if (req.body.cookies.loged) {
        const userData = JSON.parse(req.body.cookies.loged);
        const currentDate = new Date(req.body.date);
        // const customDate = customdate(currentDate);
        

        const blockedEvents = await BlockedEvent.findAll({ where: { userId: userData.id } });
        const events = await Event.findAll({ where: { userId: userData.id } });

        res.json({ events: sendEvents(currentDate, events, blockedEvents)}); 
    } else {
        res.json({ note: 'err' })
    }
}

exports.createEvent = async (req, res, next) => {
    if (req.body.cookies.loged) {
    const userData = JSON.parse(req.body.cookies.loged);
    const date = req.body.date
    const eventName = req.body.eventName
    const description = req.body.description
    const repeat = req.body.repeat
    const from = req.body.from
    const to = req.body.to 

    const currentDate = new Date(req.body.date);
    // const customDate = customdate(currentDate);

        await Event.create({
            userId: userData.id,
            date: date,
            eventName: eventName,
            description: description,
            repeat: repeat,
            from: from,
            to: to
        });
        
        const blockedEvents = await BlockedEvent.findAll({ where: { userId: userData.id } });
        const events = await Event.findAll({ where: { userId: userData.id }}); 
       
        res.json({ events: sendEvents(currentDate, events, blockedEvents), note: 'successfuly created' ,daysWithEvents: daysWithEvents(events, blockedEvents)});
    } else {
        res.json({ note: 'err' })
    }
}

exports.deleteEvent = async (req, res, next) => {
    if (req.body.cookies.loged) {
        const userData = JSON.parse(req.body.cookies.loged);
        const currentDate = new Date(req.body.date);
        // const customDate = customdate(currentDate);

        await Event.destroy({ where: { id: req.body.eventId }});
        await BlockedEvent.destroy({ where: { eventId: req.body.eventId } }); ////////////

// this have to be called on last place because if not it will not response with the new events but only wiht the old ones
        const blockedEvents = await BlockedEvent.findAll({ where: { userId: userData.id } });
        const events = await Event.findAll({ where: { userId: userData.id }}); 
   
        res.json({ events: sendEvents(currentDate, events, blockedEvents) ,daysWithEvents: daysWithEvents(events, blockedEvents)});
    } else {
        res.json({ note: 'err' })
    }
} 

exports.deleteEventOnDate = async (req, res, next) => { // function that block repeated events on specific date
    if (req.body.cookies.loged) {
        const userData = JSON.parse(req.body.cookies.loged);
        const eventId = req.body.eventId
        const currentDate = new Date(req.body.date);
        const customDate = customdate(currentDate);

        await BlockedEvent.create({
            userId: userData.id,
            eventId,
            date: customDate,
        });

        const blockedEvents = await BlockedEvent.findAll({ where: { userId: userData.id } });
        const events = await Event.findAll({ where: { userId: userData.id }});

        res.json({ events: sendEvents(currentDate, events, blockedEvents) ,daysWithEvents: daysWithEvents(events, blockedEvents)});
    } else {
        res.json({ note: 'err' })
    }
}

exports.getDaysWithEvents = async (req, res, next) => {
    if (req.body.cookies.loged) {
    	const userData = JSON.parse(req.body.cookies.loged);

    	// Figure out how to return all the dates where the events are and send it back 
    	//best will be create function that we can use because we need to send it back for all others changes 

    	const events = await Event.findAll({ where: { userId: userData.id }});
    	const blockedEvents = await BlockedEvent.findAll({ where: { userId: userData.id } });
    	
    	res.json({ daysWithEvents: daysWithEvents(events, blockedEvents)})
    } else {
        res.json({ note: 'err' });
    }
}

