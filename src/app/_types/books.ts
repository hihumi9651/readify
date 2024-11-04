export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail: string;
        };
        publishDate?: Date;
    };
}
  
export interface SearchResponse {
    items: Book[];
    totalItems: number;
}