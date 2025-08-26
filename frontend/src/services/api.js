// API Service for Angastr Construction Company
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Contact Form API
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        buildingType: formData.buildingType || null,
        area: formData.area || null,
        message: formData.message || null
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: error.message || 'Произошла ошибка при отправке формы'
    };
  }
};

// Company Info API
export const getCompanyInfo = async () => {
  try {
    const response = await fetch(`${API_BASE}/company-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Company info fetch error:', error);
    return {
      success: false,
      error: error.message || 'Ошибка загрузки информации о компании'
    };
  }
};

// Services API
export const getServices = async () => {
  try {
    const response = await fetch(`${API_BASE}/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Services fetch error:', error);
    return {
      success: false,
      error: error.message || 'Ошибка загрузки списка услуг'
    };
  }
};

// Projects API
export const getProjects = async () => {
  try {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Projects fetch error:', error);
    return {
      success: false,
      error: error.message || 'Ошибка загрузки списка проектов'
    };
  }
};

// Admin API (optional)
export const getContactRequests = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/contact-requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Contact requests fetch error:', error);
    return {
      success: false,
      error: error.message || 'Ошибка загрузки заявок'
    };
  }
};