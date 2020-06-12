import {request} from "./request";

export function increaseData(line,station,time) {
    return request({
      url: '/subway/admin/increase',
      params: {
        line,
        station,
        time
      }
    })
}

export function deleteData(line,station) {
  return request({
    url: '/subway/admin/delete',
    params: {
      line,
      station
    }
  })
}

export function editData(station,newStation) {
  return request({
    url: '/subway/admin/edit',
    params: {
      station,
      newStation
    }
  })
}