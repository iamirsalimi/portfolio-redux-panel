import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'https://ggyvmzjvnhinwptohcap.supabase.co/rest/v1/',
    headers: {
        'Content-type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneXZtemp2bmhpbndwdG9oY2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1MTEwNzksImV4cCI6MjAwNzA4NzA3OX0.6wZXdw6rDjT_BvSUX_KwCqTRQiC-vvrpeYrraNed7NY',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneXZtemp2bmhpbndwdG9oY2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1MTEwNzksImV4cCI6MjAwNzA4NzA3OX0.6wZXdw6rDjT_BvSUX_KwCqTRQiC-vvrpeYrraNed7NY'
    }
})

export default axiosInstance