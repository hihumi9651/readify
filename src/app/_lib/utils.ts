// utils.ts

/**
 * 与えられた文字列が有効なISBNかどうかを検証します
 */
export function isValidISBN(isbn: string): boolean {
    // ISBN-13の検証
    if (isbn.length === 13) {
      const digits = isbn.split('').map(Number);
      const sum = digits
        .slice(0, -1)
        .reduce((acc, digit, index) => acc + digit * (index % 2 === 0 ? 1 : 3), 0);
      const checkDigit = (10 - (sum % 10)) % 10;
      return checkDigit === digits[12];
    }
    return false;
  }
  
  /**
   * 日付を指定されたフォーマットで整形します
   */
  export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
  
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
  
  /**
   * 書籍のステータスを日本語に変換
   */
  export function translateBookStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'WANT_TO_READ': '読みたい',
      'STACKED': '積読中',
      'READING': '読書中',
      'FINISHED': '読了'
    };
    return statusMap[status] || status;
  }
  
  /**
   * エラーメッセージを標準化
   */
  export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
  
  /**
   * 文字列を指定された長さで切り取り、必要に応じて末尾に「...」を追加
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }