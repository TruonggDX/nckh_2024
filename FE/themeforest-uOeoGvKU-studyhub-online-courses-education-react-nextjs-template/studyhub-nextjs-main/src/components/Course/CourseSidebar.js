import Courses from "@/data/courses.json";
import { useEffect, useState } from 'react';
import api from "/src/route/route"
import { setFilterData } from '@/redux/filter/actionCreator';
import { useSelector, useDispatch } from 'react-redux';

export default function CourseSidebar() {
	const [filters, setFilters] = useState({
	  search: '',
		category: "",
	  aim: "",
	});
	const [FilterData,SetFilterData] = useState([{
		type: "name",
		placeholder: "Tìm khóa học",
		title: "Tìm kiếm"
	}])
	const [filteredCourses, setFilteredCourses] = useState(Courses);
	const dispatch = useDispatch();
	const a = useSelector(state => state.filter);

	useEffect(() => {
		dispatch(setFilterData(a));
	}, [filters]);
	const handleFilterChange = (e, filterType) => {
	  const { id, checked } = e.target;
	  setFilters((prevFilters) => ({
		...prevFilters,
		[filterType]: checked
		  ? [...prevFilters[filterType], id]
		  : prevFilters[filterType].filter((item) => item !== id)
	  }));
	};
  
	const handleSearchChange = (e) => {
	  setFilters((prevFilters) => ({
		...prevFilters,
		search: e.target.value
	  }));
	};
  
	const clearFilters = () => {
	  setFilters({
		  search: '',
		  category: "",
		  aim: "",
	  });
	};
	useEffect(() => {
		api.getCategory().then((res) => {
			let a=[];
			for (const category of res.content) {
				a.push({
					id: category.id,
					label: category.name,
					count: 0,
				})
			}
			SetFilterData(prev => [...prev,{
				type: "checkbox",
				title: "Danh mục",
				items: a
			},{
				type: "checkbox",
				title: "Mục Tiêu",
				items:[
					{ id: 1, label: "0-4.5", count: 0 },
					{ id: 2, label: "4.5+", count: 0 },
					{ id: 3, label: "5.5+", count: 0 },
					{ id: 4, label: "7.5+", count: 0 },
					{ id: 5, label: "0-450", count: 0 },
					{ id: 6, label: "550+", count: 0 },
					{ id: 7, label: "750+", count: 0 },
					{ id: 8, label: "master toeic", count: 0 },
				]
			}]);
		})
	}, []);
	useEffect(() => {
		dispatch(setFilterData(filters));
	}, [filters]);
	// useEffect(() => {
	// 	let updatedCourses = [...Courses];
	//
	// 	// Apply search filter
	// 	if (filters.search) {
	// 		updatedCourses = updatedCourses.filter(course =>
	// 			course.title.toLowerCase().includes(filters.search.toLowerCase())
	// 		);
	// 	}
	//
	// 	// Apply type filter
	// 	if (filters.type.length) {
	// 		updatedCourses = updatedCourses.filter(course =>
	// 			filters.type.includes(course.type)
	// 		);
	// 	}
	//
	// 	// Apply category filter
	// 	if (filters.category.length) {
	// 		updatedCourses = updatedCourses.filter(course =>
	// 			filters.category.includes(course.category.toLowerCase().replace(/\s+/g, "-"))
	// 		);
	// 	}
	//
	// 	// Apply level filter
	// 	if (filters.level.length && !filters.level.includes("all")) {
	// 		updatedCourses = updatedCourses.filter(course =>
	// 			filters.level.includes(course.level.toLowerCase())
	// 		);
	// 	}
	//
	// 	// Set the filtered courses
	// 	setFilteredCourses(updatedCourses);
	// }, []);


	return (
	  <div className="rts-course-filter-area">
		{FilterData.map((filter) => (
		  <div key={filter.title} className="single-filter-left-wrapper">
			<h6 className="title">{filter.title}</h6>
			{filter.type === 'name' ? (
			  <div className="search-filter filter-body">
				<div className="input-wrapper">
				  <input
					type="text"
					placeholder={filter.placeholder}
					value={filters.search}
					onChange={handleSearchChange}
				  />
				  <i className="fa-light fa-magnifying-glass"></i>
				</div>
			  </div>
			) : (
			  <div className="checkbox-filter filter-body">
				<div className="checkbox-wrapper">
				  {filter.items.map((item) => (
					<div key={item.id} className="single-checkbox-filter">
					  <div className="check-box">
						<input
						  type="checkbox"
						  id={item.id}
						  checked={filters[filter.title.toLowerCase()]?.includes(item.id)}
						  onChange={(e) => handleFilterChange(e, filter.title.toLowerCase())}
						/>
						<label htmlFor={item.id}>{item.label}</label>
						<br />
					  </div>
					  {/*<span className="number">({calculateCounts(filter.title.toLowerCase(), item.id)})</span>*/}
					</div>
				  ))}
				</div>
			  </div>
			)}
		  </div>
		))}
		<button onClick={clearFilters} className="rts-btn btn-border">
		  <i className="fa-regular fa-x"></i> Clear All Filters
		</button>
	  </div>
	);
  }
