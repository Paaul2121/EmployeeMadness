import React from "react";
import ReactPaginate from 'react-paginate'
import { useAtom } from "jotai";
import state from "./Atom";

const Pagination = ( {employeesPerPage, employees} ) => {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useAtom(state.currentPage);
    
    for(let i=0; i<Math.ceil(employees/ employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return(
            <ReactPaginate
                pageCount={employees.length / employeesPerPage}
                marginPagesDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-center"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-Link"
                activeClassName="active"
              />        
    )
}

export default Pagination