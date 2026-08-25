export interface Post {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  coverImage: string | null;
  tags: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  guestName: string;
  content: string;
  createdAt: Date;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}
