import axiosInstance from "./axios";

export async function signUp(userData: any) {
  try {
    const response = await axiosInstance.post("/auth/signUp", userData);
    const accessToken = response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    console.error("Failed to sign up:", error);
    throw error;
  }
}

export async function signIn(userData: any) {
  try {
    const response = await axiosInstance.post("/auth/signIn", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to sign in:", error);
    throw error;
  }
}

interface URLSearchParamsProps {
  limit?: number;
  order?: string;
  page?: number;
}

export async function getArticles({
  page = 1,
  limit = 10,
  order = "recent",
}: Partial<URLSearchParamsProps> = {}) {
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: limit.toString(),
    orderBy: order,
  }).toString();
  const url = `/articles?${query}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data.list;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getBestArticles({
  limit = 3,
  order = "like",
}: Partial<URLSearchParamsProps> = {}) {
  const query = new URLSearchParams({
    pageSize: limit.toString(),
    orderBy: order,
  }).toString();
  const url = `/articles?${query}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data.list;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

export async function getArticleInfo(articleID: number) {
  console.log(`Fetching article info for articleID: ${articleID}`);
  const url = `/articles/${articleID}`;

  try {
    const response = await axiosInstance.get(url);
    console.log(`Data fetched for articleID ${articleID}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch article info for articleID ${articleID}:`,
      error
    );
    throw error;
  }
}

export async function getArticleComments(articleID: number) {
  const url = `/articles/${articleID}/comments?limit=10`;

  try {
    const response = await axiosInstance.get(url);
    return response.data.list;
  } catch (error) {
    console.error(`Failed to fetch comments`, error);
    throw error;
  }
}

export async function postComment(articleID: number, content: string) {
  const url = `/articles/${articleID}/comments`;
  try {
    const response = await axiosInstance.post(url, { content });
    return response.data;
  } catch (error) {
    console.error(`Failed to post comment`, error);
    throw error;
  }
}

export async function postArticle(postData: any) {
  try {
    const response = await axiosInstance.post("/articles", postData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
