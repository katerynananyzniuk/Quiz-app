import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-app-f417d-default-rtdb.europe-west1.firebasedatabase.app/'
})