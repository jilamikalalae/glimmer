export function getAuthUser() {
    // Simulate checking if the user is authenticated
    // In a real app, you'd check cookies, local storage, or make a request to your authentication API
    const user = localStorage.getItem("authUser");
  
    if (user) {
      return JSON.parse(user); // Assuming user data is stored as a JSON string
    } else {
      return null;
    }
  }
  
  // Example of how you might store a user after login
  export function setAuthUser(user) {
    localStorage.setItem("authUser", JSON.stringify(user));
  }
  
  // Example of how you might log a user out
  export function clearAuthUser() {
    localStorage.removeItem("authUser");
  }