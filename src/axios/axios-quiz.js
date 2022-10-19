import axios from 'axios'

export default axios.create({
  baseURL: 'https://read-quiz-917b5-default-rtdb.europe-west1.firebasedatabase.app'
})