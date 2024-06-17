export interface Comment {
  id: number;
  content: string;
  updatedAt: number;
  writer: {
    image: string;
    nickname: string;
  };
}

export type Order = "recent" | "like";
