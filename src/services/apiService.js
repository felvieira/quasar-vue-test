import axios from "axios";

const API_BASE_URL = "https://sys-dev.searchandstay.com/api/admin/house_rules";
const TOKEN =
  "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const HouseRuleService = {
  createHouseRule: async (name, active) => {
    const requestData = {
      house_rules: {
        name: name,
        active: active,
      },
    };
    try {
      const response = await axios.post(API_BASE_URL, requestData, { headers });
      return response.data;
    } catch (error) {
      console.error("Error creating house rule:", error);
      throw new Error("Failed to create house rule");
    }
  },

  updateHouseRule: async (id, name, active) => {
    const requestData = {
      house_rules: {
        name: name,
        active: active,
      },
    };

    try {
      const url = `${API_BASE_URL}/${id}`;
      const response = await axios.put(url, requestData, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updating house rule:", error);
      throw new Error("Failed to update house rule");
    }
  },

  deleteHouseRule: async (id) => {
    try {
      const url = `${API_BASE_URL}/${id}`;
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleting house rule:", error);
      throw new Error("Failed to delete house rule");
    }
  },

  getHouseRule: async (id) => {
    try {
      const url = `${API_BASE_URL}/${id}`;
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error retrieving house rule:", error);
      throw new Error("Failed to retrieve house rule");
    }
  },

  listHouseRules: async () => {
    try {
      const response = await axios.get(API_BASE_URL, { headers });
      return response.data;
    } catch (error) {
      console.error("Error listing house rules:", error);
      throw new Error("Failed to list house rules");
    }
  },

  loadEntitiesByUrl: async (page) => {
    try {
      const url = `${API_BASE_URL}?page=${page}`;
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error loading entities by URL:", error);
      throw new Error("Failed to load entities by URL");
    }
  },
};

export default HouseRuleService;
