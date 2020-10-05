import moment from 'moment';


export const slugify = (string) =>
  string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-')
    .replace(/[^\w-]+/g, '');


export const stripHtml = (string) => 
  string.replace(/<[^>]*>?/gm, '');


export const extractYear = (dateString) => 
  moment(
    dateString,
    'ddd, DD MMM YYYY HH:mm:ss ZZ'
  ).year()
