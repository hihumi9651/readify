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
        industryIdentifiers?: {
            type: "ISBN_10" | "ISBN_13"
            identifier: string
        }[]
    };
}
  
export interface SearchResponse {
    items: Book[];
    totalItems: number;
}

export interface RegisteredBookStatus {
    isbn: string;
    status: BookStatus
}

export interface BookWithStatus extends Book {
    registrationStatus: BookStatus | 'UNREGISTERED'
}

export type BookStatus = "WANT_TO_READ" | "STACKED" | "READING" | "FINISHED"