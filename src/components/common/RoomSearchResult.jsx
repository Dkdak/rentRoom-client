import React, { useState } from 'react'
import RoomCard from '../room/RoomCard'
import { Button, Row } from 'react-bootstrap'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 3  // 이 부분을 단순 변수로 수정했습니다.
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = results.slice(startIndex, endIndex)
    // console.log("paginatedResult result:", paginatedResult); // 서버에서 받은 데이터 출력

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className='text-center mt-5'>검색 결과</h5>
                    <Row>
                        {paginatedResult.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </Row>
                    <Row>
                        {totalResults > resultPerPage && (
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <Button
                            variant='secondary' onClick={onClearSearch} className='mt-3'>
                            검색 지우기
                        </Button>
                    </Row>
                </>
            ) : (
                <p>결과가 없습니다</p>
            )}
        </>
    )
}

export default RoomSearchResult
