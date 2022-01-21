
import axios from "axios";

const getAllJob = async () => {
    try {
        const { data } = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`)
        return data
    } catch (error) {
        console.error(error);
    }
};

const getJobFilterByDescription = (jobs, description) => {
    // return jobs.filter(job => job.description.includes(description))
    return jobs.filter(job => new RegExp('^' + description + '$', 'i').test(job.description))
};

const getJobFilterByLocation = (jobs, location) => {
    // return jobs.filter(job => job.location.includes(location))
    return jobs.filter(job => new RegExp('^' + location + '$', 'i').test(job.location))
};

const getJobFilterByFulltime = (jobs) => {
    return jobs.filter(job => job.type == "Full Time")
};

const getPagingData = (jobs, page, limit) => {
    const totalItems = jobs.lenght;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    jobs = jobs.slice(currentPage * limit, (currentPage + 1) * limit);
  
    return { totalItems, jobs, totalPages, currentPage };
  };

const getJobById = async (id) => {
    try {
        const { data } = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json/${id}`)
        return data
    } catch (error) {
        console.error(error);
    }
};

export { getAllJob, getJobFilterByDescription, getJobFilterByLocation, getJobFilterByFulltime, getPagingData, getJobById };