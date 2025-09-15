/**
 * Format a Date object or timestamp to a custom string
 * @param {Date|number|string} date - Date object, timestamp, or ISO string
 * @param {string} format - format string: YYYY, MM, DD, HH, mm, ss
 * @returns {string}
 *
 * Example:
 *   customTimeDisplay(new Date(), "YYYY/MM/DD HH:mm:ss")
 */

function customTimeDisplay(date, format) {
    let d = date instanceof Date ? date : new Date(date);
    const pad= (num)=> num.toString().padStart(2,'0');
    return format.replace('YYYY', d.getFullYear())
                .replace('MM', pad(d.getMonth() + 1))
                .replace('DD', pad(d.getDate()))
                .replace('HH', pad(d.getHours()))
                .replace('mm', pad(d.getMinutes()))
                .replace('ss', pad(d.getSeconds()));   
}

/*
    * Simple logger that logs messages to console with timestamp
*/
function fromNow(date= new Date()){
    const d = date instanceof Date ? date : new Date(date);
    const diff = Date.now() - d.getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
} 

module.exports = { customTimeDisplay, fromNow };
