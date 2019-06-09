import {timeParse} from "d3-time-format";

function parseData(parse) {
    return function(d) {
        let dd = {};
        dd.time = parse(d.time);
        dd.price = parseFloat(d.price);
        dd.quantity = parseFloat(d.quantity);
        return dd;
    };
}

const parseDate = timeParse("%Y-%m-%dT%H:%M:%SZ");

export function getData(data) {
    return data.map(parseData(parseDate))
}
