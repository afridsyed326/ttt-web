export const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login"; // Redirect to login page
};
