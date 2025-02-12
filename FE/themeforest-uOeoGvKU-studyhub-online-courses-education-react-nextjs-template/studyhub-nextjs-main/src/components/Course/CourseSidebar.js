import Courses from "@/data/courses.json";
import FilterData from "@/data/filters.json";
import { useEffect, useState } from 'react';

import { setFilterData } from '@/redux/filter/actionCreator';
import { useDispatch } from 'react-redux';

export default function CourseSidebar() {
	const [filters, setFilters] = useState({
	  search: '',
	  type: [],
	  category: [],
	  level: [],
	  author: [],
	  tags: [],
	  price: []
	});

	const [filteredCourses, setFilteredCourses] = useState(Courses);
	const dispatch = useDispatch();
  
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
		type: [],
		category: [],
		level: [],
		author: [],
		tags: [],
		price: []
	  });
	};

	// Calculate counts for the sidebar filters
	const calculateCounts = (filterType, filterId) => {
		switch (filterType) {
			case 'type':
				return filteredCourses.filter(course => course.type === filterId).length;
			case 'category':
				return filteredCourses.filter(course => course.category.toLowerCase().replace(/\s+/g, "-") === filterId).length;
			case 'level':
				if (filterId === 'all') {
					return filteredCourses.length;
				}
				return filteredCourses.filter(course => course.level.toLowerCase() === filterId).length;
			case 'author':
				return filteredCourses.filter(course => course.author.toLowerCase() === filterId.toLowerCase()).length;
			case 'tags':
				return filteredCourses.filter(course => course.tag.toLowerCase() === filterId.toLowerCase()).length;
			case 'price':
				return filterId === 'free'
					? filteredCourses.filter(course => parseFloat(course.price) === 0).length
					: filteredCourses.filter(course => parseFloat(course.price) > 0).length;
			default:
				return 0;
		}
	};
	
	// Recalculate filteredCourses based on filters
	useEffect(() => {
		dispatch(setFilterData(filters));
	}, [filters]);

	useEffect(() => {
		let updatedCourses = [...Courses];

		// Apply search filter
		if (filters.search) {
			updatedCourses = updatedCourses.filter(course =>
				course.title.toLowerCase().includes(filters.search.toLowerCase())
			);
		}

		// Apply type filter
		if (filters.type.length) {
			updatedCourses = updatedCourses.filter(course =>
				filters.type.includes(course.type)
			);
		}

		// Apply category filter
		if (filters.category.length) {
			updatedCourses = updatedCourses.filter(course =>
				filters.category.includes(course.category.toLowerCase().replace(/\s+/g, "-"))
			);
		}

		// Apply level filter
		if (filters.level.length && !filters.level.includes("all")) {
			updatedCourses = updatedCourses.filter(course =>
				filters.level.includes(course.level.toLowerCase())
			);
		}

		// Set the filtered courses
		setFilteredCourses(updatedCourses);
	}, []);


	return (
	  <div className="rts-course-filter-area">
		{FilterData.map((filter) => (
		  <div key={filter.title} className="single-filter-left-wrapper">
			<h6 className="title">{filter.title}</h6>
			{filter.type === 'search' ? (
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
					  <span className="number">({calculateCounts(filter.title.toLowerCase(), item.id)})</span>
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
