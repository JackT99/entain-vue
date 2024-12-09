import axios from 'axios';

const ROOT_URL = 'https://api.neds.com.au/rest/v1';
const COUNT = 10;

export default {
    fetchRaces() {
        return axios.get(ROOT_URL + '/racing/?method=nextraces&count=' + COUNT)
            .then(response => Object.values(response.data.data.race_summaries)
        )
    },
}