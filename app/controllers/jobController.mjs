import * as jobService from "../services/jobService.mjs"

const listJob = async (req, res) => {
    try{
        let jobs = await jobService.getAllJob();

        if (req.query.description) {
            jobs = await jobService.getJobFilterByDescription(jobs, req.query.description);
        }

        if (req.query.location) jobs = jobService.getJobFilterByLocation(jobs, req.query.location);
        
        if (req.query.full_time) jobs = jobService.getJobFilterByFulltime(jobs);

        if (req.query.page) jobs = jobService.getPagingData(jobs, (req.param.page - 1), 10);

        res.status(200).send(jobs);
    }
    catch(e){
        res.status(404).send(e);
    }
}

const showJob = async (req, res) => {
    try{
        let job = await getJobById(req.params.id);
        res.status(200).send(job);
    }
    catch(e){
        res.status(404).send(e);
    }
}

export { listJob, showJob }