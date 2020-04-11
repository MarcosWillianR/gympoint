import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export const priceFormatter = value => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const userTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const dateListFormat = date => {
  return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });
};

export const dateFormFormat = date => {
  return format(parseISO(date), "dd'/'MM'/'yyyy", {
    locale: pt,
  });
};

export const cleanNumber = data => {
  const cleanData = [];

  const dataKeys = Object.keys(data);

  if (!dataKeys.length) {
    return cleanData;
  }

  dataKeys.forEach(value => {
    const cleanedValue = data[value]
      .replace(/[A-Za-z]|[!@#$%^&*(),.?":{}|<>]|[\n]/g, '')
      .trim();

    cleanData.push({ [value]: cleanedValue });
  });

  return Object.assign(...cleanData);
};

export const cleanPrice = price => {
  return price
    .replace(/[R$]/g, '')
    .trim()
    .replace(',', '.');
};
