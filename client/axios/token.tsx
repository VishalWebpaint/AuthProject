import { getSession } from "next-auth/react";

const getToken = async (): Promise<string | null> => {
  try {
    const session: any = await getSession();
    console.log(session, "Session Data:");
    if (session && session.token) {
      return session.token; 
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
const getAuthHeaders = async (): Promise<{ [key: string]: string }> => {
  const token = await getToken();
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

export default getAuthHeaders;