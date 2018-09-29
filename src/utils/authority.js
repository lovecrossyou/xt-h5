export function getAccessToken() {
  const token = localStorage.getItem('accessToken') ;
  return token===undefined? '' : token ;
}

export function setAccessToken(authority) {
  return localStorage.setItem('accessToken', authority);
}
