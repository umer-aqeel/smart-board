import axios from 'axios';

const API_URL = 'https://smart-board-backend.vercel.app/announcements';

// Helper function to get the authorization headers
const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo || !userInfo.token) {
    alert("Authentication token is missing. Please log in.");
    // throw new Error("Authentication token is missing");
  }
  return { Authorization: `Bearer ${userInfo.token}` };
};

const getAllAnnouncements = async () => {
  try {
    const response = await axios.get(API_URL, {
      // headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAnnouncementById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createAnnouncement = async (announcementData) => {
  try {
    const response = await axios.post(API_URL, announcementData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAnnouncement = async (id, announcementData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, announcementData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAnnouncement = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getAllAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncement, deleteAnnouncement };

// import axios from 'axios';

// const API_URL = 'http://localhost:5000/announcements';

// const getAllAnnouncements = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// const getAnnouncementById = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// const createAnnouncement = async (announcementData) => {
//   const response = await axios.post(API_URL, announcementData);
//   return response.data;
// };

// const updateAnnouncement = async (id, announcementData) => {
//   const response = await axios.patch(`${API_URL}/${id}`, announcementData);
//   return response.data;
// };

// const deleteAnnouncement = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };

// export { getAllAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncement, deleteAnnouncement };
