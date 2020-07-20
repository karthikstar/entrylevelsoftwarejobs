var fetch = require('node-fetch');


const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub(){

    let resultCount = 1, onPage = 0;
    const allJobs = []

    while(resultCount >0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs); // since jobs itself is an array, if we just pass it into alljobs array, it will become an array of arrays.
        // hence we use spread operator to spreading the values into the all jobs array.
        resultCount = jobs.length;
        console.log('got', jobs.length, 'jobs');
        onPage ++;
    }

    console.log('got', allJobs.length, 'jobs')

}
// we want to run this routine for every page of jobs.github, as the current url only gives the first page of 50 jobs. 

fetchGithub()
module.exports = fetchGithub