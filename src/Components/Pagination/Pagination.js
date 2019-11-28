import React from 'react'
import Table from 'react-bootstrap/Navbar';



const Pagination = ({totalPost,postPage, paginate, arrayPaginas}) => {


    const pageNumber = [];


    return (
  
        <nav>
            <ul className="pagination justify-content-center" >
                {arrayPaginas.map(number => (
                    <li key={number}  className="page-item">
                        <a  onClick={() => paginate(number)} className="page-link">{number}</a> 
                    </li>        
                ))}

            </ul>
        </nav>
    )
}
export default Pagination