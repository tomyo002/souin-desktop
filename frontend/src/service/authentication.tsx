import { dataType } from 'src/utils';

export function getAuthentication() {
  const storedDataJSON = localStorage.getItem('authenticationData');
  if (storedDataJSON) {
    return JSON.parse(storedDataJSON);
  }
}

export function setAuthentication(data: Record<dataType, string>) {
  localStorage.setItem('authenticationData', JSON.stringify(data));
}
