import { BookWithStatus } from "@/app/_types/books";
import Button from "@/app/_components/ui/Button/page";
import { useFirebaseAuth } from "@/app/_hooks/useFirebaseAuth";

  interface BookCardProps {
    bookWithStatus: BookWithStatus;
  }
  
  export function BookCard({bookWithStatus}: BookCardProps) {

    const firebaseAuth = useFirebaseAuth()

    const handleClick = () => {
      console.log("あとで実装")
    }

    const handleClickAdd = async () => {

      try{

        // const isbn10 = bookWithStatus.volumeInfo?.industryIdentifiers?.find(
        //   id => id.type === "ISBN_10"
        // )?.identifier
  
        const isbn13 = bookWithStatus.volumeInfo?.industryIdentifiers?.find(
          id => id.type === "ISBN_13"
        )?.identifier
  
        const defaultStatus = "WANT_TO_READ"
        const defaultReadCount = 0
  
        await fetch('/api/prisma/bookShelf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: firebaseAuth.uid,
            isbn: isbn13,
            status: defaultStatus,
            readCount: defaultReadCount,
          })
        })

      }catch( error ){
        console.error('Login error:', error);
      }
    }

    return (
      <div 
        className="
          bg-[#272727] 
          rounded-xl 
          overflow-hidden
          shadow-[6px_6px_12px_0px_#1f1f1f,_-6px_-6px_12px_0px_#303030]
          hover:shadow-[8px_8px_16px_0px_#1f1f1f,_-8px_-8px_16px_0px_#303030]
          transition-shadow
          duration-300
        "
      >
        <div className="flex p-4 gap-4">
          {/* 本のサムネイル */}
          <div className="w-24 h-32 flex-shrink-0 bg-[#2a2a2a] rounded-lg shadow-inner overflow-hidden">
            {bookWithStatus.volumeInfo.imageLinks ? (
              <img 
                src={bookWithStatus.volumeInfo.imageLinks.thumbnail}
                alt={bookWithStatus.volumeInfo.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
  
          {/* 本の情報 */}
          <div className="flex-1">
            <h3 className="font-medium text-white mb-2">
              {bookWithStatus.volumeInfo.title}
            </h3>
            
            {bookWithStatus.volumeInfo.authors && (
              <p className="text-sm text-gray-400 mb-1">
                著者: {bookWithStatus.volumeInfo.authors.join(', ')}
              </p>
            )}
            
            {bookWithStatus.volumeInfo.publishDate && (
              <p className="text-sm text-gray-400 mb-1">
                出版: {new Date(bookWithStatus.volumeInfo.publishDate).toLocaleDateString('ja-JP')}
              </p>
            )}
  
            {bookWithStatus.volumeInfo.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {bookWithStatus.volumeInfo.description}
              </p>
            )}
          </div>
        </div>
  
        <div className="px-4 py-3 border-t border-[#303030] flex justify-end">
          <Button onClick={handleClick}>
            詳細を見る（test）
          </Button>
          <Button onClick={handleClickAdd}>
            {bookWithStatus.registrationStatus}
          </Button>
        </div>
      </div>
    );
  }