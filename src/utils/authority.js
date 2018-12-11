export function getAccessToken() {
  // return 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTQzNzU4ODYwLCJzdWIiOiJEWjAwMDAxMTMwIn0.CTaQPiO7JM-LBaoWqqp8EKUN1J3ekJfxLxKkfHeTots'
  const token = localStorage.getItem('accessToken') ;
  return token===undefined? '' : token ;
}

export function setAccessToken(authority) {
  if(authority&&authority!=undefined){
    return localStorage.setItem('accessToken', authority);
  }
}
