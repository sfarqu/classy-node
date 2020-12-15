const fs = require('fs');
const fetch = require('node-fetch');

const currFormat = new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});

const fundraiserId = process.env.CLASSY_FUNDRAISER_ID;
const clientId = process.env.CLASSY_CLIENT_ID;
const clientSecret = process.env.CLASSY_CLIENT_SECRET;

let expiry = Date.now() - 10;
let accessToken = "";

function fetchToken() {
    const url = 'https://api.classy.org/oauth2/auth';
    return fetch(url,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
        })
        .then(resp => resp.json());
}

function updateMetrics(token, fundraiser) {
    const url = 'https://api.classy.org/2.0/fundraising-pages/' + fundraiser + '/overview';
    fetch(url, {method: 'GET', headers: {'Authorization': 'bearer ' + token}})
        .then(resp => resp.json())
        .then(resp => {
            let total = resp.metrics.donations_amount;
            const re = /(?<=<div id="total">)\$.*(?=<\/div>)/i;
            let html = fs.readFileSync('total.html', 'utf8');
            let newhtml = html.replace(re,currFormat.format(total));
            fs.writeFileSync('total.html',newhtml,{encoding:'utf8',flag:'w'})
        })
}

async function cycle() {
    if (Date.now() >= expiry) {
        const auth = await fetchToken();
        accessToken = auth.access_token;
        expiry = Date.now() + auth.expires_in - 10;
        console.log("Fetching new authentication token");
    }
    updateMetrics(accessToken, fundraiserId)
}

console.log("Starting sync of fundraiser donation total...")
setInterval(cycle,11000);