import Moment from 'moment'

export function getRiskfactor(tickets, ticket, users, comments) {
    var riskFactor = 5,
        counter = 0,
        filterTickets = [],
        date,
        ticketPrice = ticket.price,
        sum = 0,
        percentage = 0;

    try {
        const userId = ticket.users.id;
        filterTickets = tickets.filter(ticket => ticket.users.id === userId);
        filterTickets = Object.values(filterTickets);
        counter = filterTickets.length;
        date = Moment(ticket.uploadDate).format('H');
    } catch (e) {
        console.log("error");
    }

    // add 10%
    if (counter === 1) riskFactor = 10;

    // ticket lower and higher
    filterTickets.forEach(function (ticket) {
        sum = sum + ticket.price;
    });

    let average = parseInt(sum / counter, 10);
    percentage = Math.abs(parseInt((average - ticketPrice) * 100 / average, 10));
    if (ticketPrice < average) {
        if (percentage > 10) riskFactor += 10;
        else riskFactor += percentage;
    } else {
        if (percentage > 10) riskFactor -= 10;
        else riskFactor -= percentage;
    }

    // business hours
    if (date >= 9 && date <= 17) riskFactor -= 10;
    else riskFactor += 10;

    // comments more than 3
    const filterComments = comments.filter(comment => comment.tickets.id == ticket.id)
    if (filterComments.length > 3) riskFactor += 5;

    // check if its les than 5% or more than 95%
    if (riskFactor < 5) riskFactor = 5;
    if (riskFactor > 95) riskFactor = 95;

    return riskFactor;
}