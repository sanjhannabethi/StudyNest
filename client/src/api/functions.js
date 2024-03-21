import axios from 'axios'
axios.defaults.withCredentials = true

export async function onSearchMentors(mentorData) {
    return await axios.get(
      `http://localhost:5000/api/mentors?searchQuery=${mentorData}`
    )
}
export async function onSearchMentees(menteeData) {
    return await axios.get(
      `http://localhost:5000/api/mentees?searchQuery=${menteeData}`
    )
}

export async function oncreateGroup(groupData) {
  return await axios.post(
    `http://localhost:5000/api/creategroup`,groupData
  )
}

export async function ongetGroups() {
  return await axios.get(
    `http://localhost:5000/api/getgroups`
  )
}