import { post } from '../services/ajax.js'
export function addReadRecord(fabricCode) {
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.id;
  let searchHistoryId = localStorage.getItem("searchHistoryId")
  let url = `/statistic/addReading/${searchHistoryId}/${userId}/${fabricCode}`
  post(url).then(res => {
    console.log("addReadRecord:", res.msg);
  })
    .catch(err => {
      console.log("addReadRecord:", err);
    });
}