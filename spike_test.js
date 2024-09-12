import http from "k6/http";
import { sleep, check } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '20s', target: 100 },
        { duration: '30s', target: 2000 },
        { duration: '20s', target: 100 },      
    ],
};

export default function () {
    const res = http.get('http://3.37.30.99:8080');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
};