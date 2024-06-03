import axiosInstance from "./axios";

async function fetchData(url: string) {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    throw error;
  }
}

interface URLSearchParamsProps {
  limit?: number;
  order?: string;
}

export async function getArticles({
  limit = 10,
  order = "recent",
}: Partial<URLSearchParamsProps> = {}) {
  const query = new URLSearchParams({
    pageSize: limit.toString(),
    orderBy: order,
  }).toString();
  const url = `/articles?${query}`;

  try {
    const data = await fetchData(url);
    return data.list;
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
    const data = await fetchData(url);
    return data.list;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
