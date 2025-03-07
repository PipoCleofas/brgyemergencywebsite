import { useGetItems } from "./useGetItems";

export const useHandleClicks = () => {
  const { checkAccounts, error } = useGetItems();

  const handleNavClick = (navigate: (path: string) => void, target: string) => {
    try {
      navigate(target);
      console.log('navigating');
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const onLoginClick = async (
    e: React.FormEvent<HTMLFormElement>,
    navigate: (path: string) => void,
    username: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const isAdminValid = await checkAccounts('admin', username, password);

      if (isAdminValid) {
        localStorage.setItem('username', username);
        navigate('/AdminDashboard');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error("Error during login click:", error);
    }
  };

  return {
    onLoginClick,
    handleNavClick,
    error,
  };
};
