import { timeAgo } from './timeago.js';
import { format } from './numbers-formatter.js';

// https://search.bossjob.com/api/v1/search/job_filter?size=10&query=system

const baseEndPoint = 'https://search.bossjob.com/api/v1/search/job_filter';
// const localEndPoint = './../data.json';
const resultSize = 12;
const currency = '₱';
const form = document.querySelector('.js-search');
const resultsContainer = document.querySelector('.js-results');
const totalJobs = document.querySelector('.js-totaljobs');
const noResult = document.querySelector('.js-noresult');
const noResultQuery = noResult.querySelector('.js-searchquery');

function displayJobs(jobs) {
  // console.log(jobs);
  if (jobs.total_num !== 0) {
    const urlSlug = title =>
      title
        .split(/\W/)
        .filter(item => item !== '')
        .join('-')
        .toLowerCase();

    totalJobs.textContent = `${jobs.total_num} jobs found`;
    const html = jobs.jobs.map(
      job => `<a href="/${urlSlug(job.job_title)}-${
        job.id
      }" class="block mt-5 pt-5 border-t">
        <div class="flex">
          <h2 class="font-medium">${job.job_title}</h2>
          <div class="ml-auto whitespace-no-wrap">
          ${currency}${format(job.salary_range_from)} - 
          ${currency}${format(job.salary_range_to)}
          </div>
        </div>
        <ul class="flex sm:inline-flex flex-wrap text-sm">
          <li class="mt-2 sm:mr-3 w-1/2  sm:w-auto flex items-center">
            <svg
              class="w-4 mr-2 fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M5.64 16.36a9 9 0 1112.72 0l-5.65 5.66a1 1 0 01-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 10-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            ${job.job_location}
          </li>
          <li class="mt-2 sm:mr-3 w-1/2 sm:w-auto flex items-center">
            <svg
              class="w-4 mr-2 fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7V5c0-1.1.9-2 2-2h4a2 2 0 012 2v2h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9c0-1.1.9-2 2-2h4zm8 2H8v10h8V9zm2 0v10h2V9h-2zM6 9H4v10h2V9zm4-2h4V5h-4v2z"
              />
            </svg>
            ${job.xp_lvl}
          </li>
          <li class="mt-2 sm:mr-3 w-1/2 sm:w-auto flex items-center">
            <svg
              class="w-4 mr-2 fill-currents stroke-current  text-blue-600"
              xmlns="http://wwws.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="40"
                d="M32 192L256 64l224 128-224 128L32 192z"
              />
              <path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="40"
                d="M112 240v128l144 80 144-80V240M480 368V192M256 320v128"
              />
            </svg>
            ${job.degree}
          </li>
          <li class="mt-2 sm:mr-3 w-1/2 sm:w-auto flex items-center">
            <svg
              class="w-4 mr-2 fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm1-8.41l2.54 2.53a1 1 0 01-1.42 1.42L11.3 12.7a1 1 0 01-.3-.7V8a1 1 0 012 0v3.59z"
              />
            </svg>
            ${job.job_type}
          </li>
        </ul>
        <div class="mt-4 flex items-center">
          <div class="flex items-center text-sm leading-tight">
            <img class="w-10 mr-2" src="${job.company_logo}" alt="${
        job.company_name
      }" />
            ${job.company_name}
          </div>
          <time class="js-timeago whitespace-no-wrap ml-auto text-right text-xs text-gray-500" datetime="${
            job.updated_at
          }">${job.updated_at}</time>
        </div>
      </a>
      `
    );
    noResult.classList.add('hidden');
    resultsContainer.innerHTML = html.join('');
    timeAgo();
  } else {
    totalJobs.textContent = '';
    resultsContainer.innerHTML = '';
    noResult.classList.remove('hidden');
    noResultQuery.textContent = form.query.value;
  }
}

async function fetchJobs(query) {
  const res = await fetch(`${baseEndPoint}?size=${resultSize}&query=${query}`);
  // const res = await fetch(`${localEndPoint}`);
  const data = await res.json();
  return data;
}

async function fetchAndDisplay(query) {
  resultsContainer.innerHTML = `<svg class="w-16 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"
  >
    <rect width="100%" height="100%" fill="#FFF" />
    <g>
      <path
        d="M75.4 126.63a11.43 11.43 0 01-2.1-22.65 40.9 40.9 0 0030.5-30.6 11.4 11.4 0 1122.27 4.87h.02a63.77 63.77 0 01-47.8 48.05v-.02a11.38 11.38 0 01-2.93.37z"
        fill="#2379ea"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 64 64"
        to="360 64 64"
        dur="600ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>`;
  form.submit.disabled = true;
  const jobs = await fetchJobs(query);
  form.submit.disabled = false;
  displayJobs(jobs.data);
}

function handleSubmit(event) {
  event.preventDefault();
  fetchAndDisplay(form.query.value);
}

form.addEventListener('submit', handleSubmit);
fetchAndDisplay('all');

timeAgo();
