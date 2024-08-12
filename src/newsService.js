import axios from "axios";

const API_URL = "https://smart-board-backend.vercel.app/news";

// Helper function to get the authorization headers
const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo || !userInfo.token) {
    alert("Authentication token is missing. Please log in.");
    // throw new Error("Authentication token is missing");
  }
  return { Authorization: `Bearer ${userInfo.token}` };
};

const getAllNews = async () => {
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

const getNewsById = async (id) => {
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

const createNews = async (newsData) => {
  const formData = new FormData();

  Object.keys(newsData).forEach((key) => {
    const value = newsData[key];
    if (key === "image" && value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  // Log formData for debugging
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading form data", error);
    throw error;
  }
};

const updateNews = async (id, newsData) => {
  const formData = new FormData();

  Object.keys(newsData).forEach((key) => {
    const value = newsData[key];
    if (key === "image" && value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else if (key === "date" && value === null) {
      formData.append(key, new Date().toISOString());
    } else {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading form data", error);
    throw error;
  }
};

const deleteNews = async (id) => {
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

export { getAllNews, getNewsById, createNews, updateNews, deleteNews };

// import axios from "axios";

// const API_URL = "http://localhost:5000/news";

// const getAllNews = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// const getNewsById = async (id) => {
//   console.log(`${API_URL}/${id}`);
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// const createNews = async (newsData) => {
//   const formData = new FormData();

//   Object.keys(newsData).forEach((key) => {
//     const value = newsData[key];
//     if (key === "image" && value instanceof FileList) {
//       for (let i = 0; i < value.length; i++) {
//         formData.append(key, value[i]);
//       }
//     } else {
//       formData.append(key, value instanceof File ? value : String(value));
//     }
//   });

//   // Log the keys of the formData object to verify
//   for (let pair of formData.entries()) {
//     console.log(`${pair[0]}: ${pair[1]}`);
//   }

//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading form data", error);
//     throw error;
//   }
// };

// // const updateNews = async (id, newsData) => {
// //   const formData = new FormData();
// //   Object.keys(newsData).forEach((key) => formData.append(key, newsData[key]));

// //   const response = await axios.put(`${API_URL}/${id}`, formData, {
// //     headers: { "Content-Type": "multipart/form-data" },
// //   });
// //   return response.data;
// // };
// const updateNews = async (id, newsData) => {
//   const formData = new FormData();

//   Object.keys(newsData).forEach((key) => {
//     const value = newsData[key];
//     if (key === "image" && value instanceof FileList) {
//       for (let i = 0; i < value.length; i++) {
//         formData.append(key, value[i]);
//       }
//     } else if (key === "date" && value === null) {
//       // Set a default date value if it's null
//       formData.append(key, new Date().toISOString());
//     } else {
//       formData.append(key, value instanceof File ? value : String(value));
//     }
//   });

//   // Log the keys of the formData object to verify
//   for (let pair of formData.entries()) {
//     console.log(`${pair[0]}: ${pair[1]}`);
//   }

//   try {
//     const response = await axios.put(`${API_URL}/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error uploading form data", error);
//     throw error;
//   }
// };

// const deleteNews = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };

// export { getAllNews, getNewsById, createNews, updateNews, deleteNews };
