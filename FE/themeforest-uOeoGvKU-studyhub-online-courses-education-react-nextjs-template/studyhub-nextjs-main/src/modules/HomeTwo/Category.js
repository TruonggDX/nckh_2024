import SingleCategoryTwo from "@/components/Category/CategoryTwo";
import Categories from "@/data/categories.json";
import Image from "next/image";

export default function Category() {

	return (
		<div className="top-category-area rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>Top Category</span>
							</div>
							<h2 className="title">Explore 2000+ Free Online Courses</h2>
							<p className="post-title">You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
				<div className="row g-5 mt--30">
					{
						Categories.map((category, index) => {
							return (
								<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
									<SingleCategoryTwo
										Slug={category.slug}
										Img={category.img}
										Title={category.title}
										categoryCount={category.categoryCount}
										imgWidth={category.imgWidth}
										imgHeight={category.imgHeight}
									/>
								</div>
							);
						}).slice(0, 8)
					}
				</div>
			</div>
		</div>
	)
}
