export interface Song {
  _id?: string;
  title: string;
  duration: number;
  rating: number;
  albumId: string;
  listened: boolean;
}
