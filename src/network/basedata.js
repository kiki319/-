import {request} from "./request";

export function getBaseData() {
    return request({
        url: '/subway/data'
    })
}

export function getLineData(line) {
    return request({
        url: '/subway/data/line',
        params: {
            line
        }
    })
}

export function getTransferData(startStation,endStation) {
    return request({
        url: '/subway/data/transfer',
        params: {
            startStation,
            endStation
        }
    })
}

export function getStationData(station) {
    return request({
        url: '/subway/data/station',
        params: {
            station
        }
    })
}