import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-17f3a-default-rtdb.europe-west1.firebasedatabase.app/'
})