const moment = require('moment');

const tglFormat = (value) => {
  let tgl = moment(value).format("D MMM YYYY");
  return tgl
}

const tglFormatForm = value => {
  let tgl = moment(value).format("L");
  return tgl
}

const tglFormatSertif = value => {
  moment.locale('id')
  let tgl = moment(value).format("LL")
  return tgl
}

const duration = (a, b) => {
  moment.locale('id')
  const tglmulai = moment(a);
  const tglselesai = moment(b);
  let diff = tglselesai.from(tglmulai)
  const getDuration = diff.slice(6);
  
  // console.log(moment);
  console.log(tglmulai);
  console.log(tglselesai);
  console.log(diff);
  console.log(getDuration);

  // if (getDuration === 'sebulan' || 'setahun') {
  //   return '1 bulan'
  // }
  return getDuration
}

const noSertif = (value) => {
  if (value.toString().length === 2) {
    return `0${value}`
  }
  return `00${value}`;
}

const nipFormat = (value) => {
  let str = value;

  let str1 = str.slice(0, 8);
  let str2 = str.slice(8, 14);
  let str3 = str.slice(-4, -3);
  let str4 = str.slice(-3);

  return `${str1}  ${str2}  ${str3}  ${str4}`
}

const capitalize = (value) => {
  arr = value.split(' ');
  let capitalizeLetter = arr.map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase());

  return capitalizeLetter.join(' ');
}

module.exports = {tglFormat, tglFormatForm, tglFormatSertif, duration, noSertif, nipFormat, capitalize}