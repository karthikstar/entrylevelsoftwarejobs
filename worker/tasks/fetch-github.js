
var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

// converting the client.get function into a promise

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client); 
const setAsync = promisify(client.set).bind(client); 

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub(){

    let resultCount = 1, onPage = 0;
    const allJobs = []
    // fetch all pages
    while(resultCount >0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs); // since jobs itself is an array, if we just pass it into alljobs array, it will become an array of arrays.
        // hence we use spread operator to spreading the values into the all jobs array.
        resultCount = jobs.length;
        console.log('got', jobs.length, 'jobs');
        onPage ++;
    }
    // filter algorithm to fetch just those for junior roles

    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        // algorithm logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
            ){
            return false
        }

        return true;

    })


    console.log('filtered down to', jrJobs.length);

    // set in redis
    console.log('got', allJobs.length, 'jobs total')
    const success = await setAsync('github',JSON.stringify(jrJobs));

    console.log({success});
}
// we want to run this routine for every page of jobs.github, as the current url only gives the first page of 50 jobs. 

// fetchGithub();

module.exports = fetchGithub;
