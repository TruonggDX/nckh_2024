import SingleBlogList from "@/components/Blog/List";
import Blogs from "@/data/blogs.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function BlogListArea() {
	const paginatePerPage = 3;
	
	const [ totalPaginate, setTotalPaginate ] = useState( Blogs.length );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}
	
	return (
		<div className="rts-latest-blog-area-three rts-section-gap">
        	<div className="container rts-section-gapBottom">
				<div className="row g-5">
					{/*  rts blog post area */}
					{	
						Blogs.map((blog, index) => {
							return (
								<div key={index} className="col-lg-6">
									<SingleBlogList
										Slug={blog.slug}
										Img={blog.image}
										detailsImg={blog.detailsImg}
										Category={blog.category}
										Tag={blog.tag}
										Author={blog.author}
										Title={blog.title}
										publishedDate={blog.publishedDate}
										btnText={blog.btnText}
									/>
								</div>
							);
						}).slice(startItemCount,endItemCount)
					}
					<div className="col-lg-12">
						<div className="rts-elevate-pagination">
							<ReactPaginate
								key={paginationKey}
								breakLabel="..."
								onPageChange={ handlePageChange }
								nextLabel={ <i className="fa-solid fa-chevron-right"></i> }
								previousLabel={ <i className="fa-solid fa-chevron-left"></i> }
								pageRangeDisplayed={ 3 }
								forcePage={ forcePage }
								pageCount={ Math.ceil(
									totalPaginate / paginatePerPage
								) }
								renderOnZeroPageCount={ null }
							/>
						</div>
					</div>
				</div>
			</div>
      	</div>
	)
}
