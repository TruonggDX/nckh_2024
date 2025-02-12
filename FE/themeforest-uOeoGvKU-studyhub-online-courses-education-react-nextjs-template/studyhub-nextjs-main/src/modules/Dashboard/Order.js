import { useState } from "react";

export default function DashboardOrder() {
	const [activeTab, setActiveTab] = useState("today");

	return (
		<div className="rts-reviewd-area-dashed table-responsive">
			<div className="calender-and-tab-btn-between">
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item" role="presentation">
						<button 
							className={`nav-link ${activeTab === "today" ? "active" : ""}`} 
							role="tab" 
							aria-selected={activeTab === "today"}
							onClick={()=>{setActiveTab("today")}}
						>
							Today
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button 
							className={`nav-link ${activeTab === "monthly" ? "active" : ""}`} 
							role="tab" 
							aria-selected={activeTab === "monthly"}
							onClick={()=>{setActiveTab("monthly")}}
						>
							Monthly
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button 
							className={`nav-link ${activeTab === "yearly" ? "active" : ""}`} 
							role="tab" 
							aria-selected={activeTab === "yearly"}
							onClick={()=>{setActiveTab("yearly")}}
						>
							Yearly
						</button>
					</li>
				</ul>

				<div className="date-picker-area">
					<input placeholder="Select your date" type="date" name="checkIn" id="datepicker" className="calendar" />
					<i className="far fa-calendar-alt"></i>
				</div>
			</div>

			<div className="tab-content" id="myTabContent">
				{
					activeTab === "today" ?
						<div className="tab-pane fade show active today" role="tabpanel">
							<h5 className="title">Order History</h5>
							<table className="table-reviews quiz mb--0">
								<thead>
									<tr>
										<th>Order ID</th>
										<th>Course Name</th>
										<th>Date</th>
										<th>Price</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Character Illustration Guide</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#5644</p>
											</div>
										</td>
										<td>
											<span className="questions">Web Design test</span>
										</td>
										<td>
											<span className="marks">November 29, 2023</span>
										</td>
										<td>
											<span >$69.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4487</p>
											</div>
										</td>
										<td>
											<span className="questions">Become a Video Editing Pro</span>
										</td>
										<td>
											<span className="marks">November 30, 2023</span>
										</td>
										<td>
											<span >$49.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="processing">Processing</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#2159</p>
											</div>
										</td>
										<td>
											<span className="questions">Freelance Content Writing</span>
										</td>
										<td>
											<span className="marks">December 11, 2023</span>
										</td>
										<td>
											<span >$79.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#1473</p>
											</div>
										</td>
										<td>
											<span className="questions">Content Writing</span>
										</td>
										<td>
											<span className="marks">December 12, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#6548</p>
											</div>
										</td>
										<td>
											<span className="questions">New Course</span>
										</td>
										<td>
											<span className="marks">November 14, 2023</span>
										</td>
										<td>
											<span >$99.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="processing">Processing</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#6541</p>
											</div>
										</td>
										<td>
											<span className="questions">UI/UX Design</span>
										</td>
										<td>
											<span className="marks">December 15, 2023</span>
										</td>
										<td>
											<span >$29.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#2397</p>
											</div>
										</td>
										<td>
											<span className="questions">Web Development</span>
										</td>
										<td>
											<span className="marks">December 17, 2023</span>
										</td>
										<td>
											<span >$39.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#7845</p>
											</div>
										</td>
										<td>
											<span className="questions">Business & Finance</span>
										</td>
										<td>
											<span className="marks">December 19, 2023</span>
										</td>
										<td>
											<span >$79.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="processing">Processing</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#9548</p>
											</div>
										</td>
										<td>
											<span className="questions">Marketing</span>
										</td>
										<td>
											<span className="marks">December 21, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Art & Dancing</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Graphic Design</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Film & Video Graphic</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="success">Success</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Accounting</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Personal Skill</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Language Skill</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="information-quiz">
												<p className="quiz">#4601</p>
											</div>
										</td>
										<td>
											<span className="questions">Character Illustration Guide</span>
										</td>
										<td>
											<span className="marks">November 28, 2023</span>
										</td>
										<td>
											<span >$59.99</span>
										</td>
										<td>
											<div className="hold-area">
												<span className="hold">On Hold</span>
												<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div> : 
						activeTab === "monthly" ? 
							<div className="tab-pane fade show active monthly" role="tabpanel">
								<h5 className="title">Order History</h5>
								<table className="table-reviews quiz">
									<thead>
										<tr>
											<th>Order ID</th>
											<th>Course Name</th>
											<th>Date</th>
											<th>Price</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Character Illustration Guide</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#5644</p>
												</div>
											</td>
											<td>
												<span className="questions">Web Design test</span>
											</td>
											<td>
												<span className="marks">November 29, 2023</span>
											</td>
											<td>
												<span >$69.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4487</p>
												</div>
											</td>
											<td>
												<span className="questions">Become a Video Editing Pro</span>
											</td>
											<td>
												<span className="marks">November 30, 2023</span>
											</td>
											<td>
												<span >$49.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="processing">Processing</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#2159</p>
												</div>
											</td>
											<td>
												<span className="questions">Freelance Content Writing</span>
											</td>
											<td>
												<span className="marks">December 11, 2023</span>
											</td>
											<td>
												<span >$79.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#1473</p>
												</div>
											</td>
											<td>
												<span className="questions">Content Writing</span>
											</td>
											<td>
												<span className="marks">December 12, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#6548</p>
												</div>
											</td>
											<td>
												<span className="questions">New Course</span>
											</td>
											<td>
												<span className="marks">November 14, 2023</span>
											</td>
											<td>
												<span >$99.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="processing">Processing</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#6541</p>
												</div>
											</td>
											<td>
												<span className="questions">UI/UX Design</span>
											</td>
											<td>
												<span className="marks">December 15, 2023</span>
											</td>
											<td>
												<span >$29.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#2397</p>
												</div>
											</td>
											<td>
												<span className="questions">Web Development</span>
											</td>
											<td>
												<span className="marks">December 17, 2023</span>
											</td>
											<td>
												<span >$39.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#7845</p>
												</div>
											</td>
											<td>
												<span className="questions">Business & Finance</span>
											</td>
											<td>
												<span className="marks">December 19, 2023</span>
											</td>
											<td>
												<span >$79.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="processing">Processing</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#9548</p>
												</div>
											</td>
											<td>
												<span className="questions">Marketing</span>
											</td>
											<td>
												<span className="marks">December 21, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Art & Dancing</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Graphic Design</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Film & Video Graphic</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="success">Success</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Accounting</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Personal Skill</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Language Skill</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className="information-quiz">
													<p className="quiz">#4601</p>
												</div>
											</td>
											<td>
												<span className="questions">Character Illustration Guide</span>
											</td>
											<td>
												<span className="marks">November 28, 2023</span>
											</td>
											<td>
												<span >$59.99</span>
											</td>
											<td>
												<div className="hold-area">
													<span className="hold">On Hold</span>
													<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div> : 
							activeTab === "yearly" ? 
								<div className="tab-pane fade show active yearly" role="tabpanel">
									<h5 className="title">Order History</h5>
									<table className="table-reviews quiz">
										<thead>
											<tr>
												<th>Order ID</th>
												<th>Course Name</th>
												<th>Date</th>
												<th>Price</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Character Illustration Guide</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#5644</p>
													</div>
												</td>
												<td>
													<span className="questions">Web Design test</span>
												</td>
												<td>
													<span className="marks">November 29, 2023</span>
												</td>
												<td>
													<span >$69.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4487</p>
													</div>
												</td>
												<td>
													<span className="questions">Become a Video Editing Pro</span>
												</td>
												<td>
													<span className="marks">November 30, 2023</span>
												</td>
												<td>
													<span >$49.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="processing">Processing</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#2159</p>
													</div>
												</td>
												<td>
													<span className="questions">Freelance Content Writing</span>
												</td>
												<td>
													<span className="marks">December 11, 2023</span>
												</td>
												<td>
													<span >$79.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#1473</p>
													</div>
												</td>
												<td>
													<span className="questions">Content Writing</span>
												</td>
												<td>
													<span className="marks">December 12, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#6548</p>
													</div>
												</td>
												<td>
													<span className="questions">New Course</span>
												</td>
												<td>
													<span className="marks">November 14, 2023</span>
												</td>
												<td>
													<span >$99.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="processing">Processing</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#6541</p>
													</div>
												</td>
												<td>
													<span className="questions">UI/UX Design</span>
												</td>
												<td>
													<span className="marks">December 15, 2023</span>
												</td>
												<td>
													<span >$29.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#2397</p>
													</div>
												</td>
												<td>
													<span className="questions">Web Development</span>
												</td>
												<td>
													<span className="marks">December 17, 2023</span>
												</td>
												<td>
													<span >$39.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#7845</p>
													</div>
												</td>
												<td>
													<span className="questions">Business & Finance</span>
												</td>
												<td>
													<span className="marks">December 19, 2023</span>
												</td>
												<td>
													<span >$79.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="processing">Processing</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#9548</p>
													</div>
												</td>
												<td>
													<span className="questions">Marketing</span>
												</td>
												<td>
													<span className="marks">December 21, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Art & Dancing</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Graphic Design</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Film & Video Graphic</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="success">Success</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Accounting</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Personal Skill</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Language Skill</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="information-quiz">
														<p className="quiz">#4601</p>
													</div>
												</td>
												<td>
													<span className="questions">Character Illustration Guide</span>
												</td>
												<td>
													<span className="marks">November 28, 2023</span>
												</td>
												<td>
													<span >$59.99</span>
												</td>
												<td>
													<div className="hold-area">
														<span className="hold">On Hold</span>
														<span className="hold-i"><i className="fa-regular fa-clipboard-list"></i></span>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div> : null
				}
			</div>
		</div>
	)
}
