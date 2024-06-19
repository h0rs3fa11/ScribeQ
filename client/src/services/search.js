import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;
const searchURI = BASE_URI + '/api/search'

const search = async ( term ) => {
    const res = await axios.get(searchURI, {
        params: { term: term }
    })
    return res.data
}

export default { search }