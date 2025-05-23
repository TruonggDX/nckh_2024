import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function JoinTeam() {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

	return (
		<div className="join-our-team-area v-1 rts-section-gap shape-move" ref={shapeMoveRef}>
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="thumbnail-jointeam-one pl--70">
							<Image src="/images/instructor/02.png" alt="join" width="368" height="497" />
							<div className="shape-area-one shape-image">
								<Image src="/images/instructor/shape/01.png" alt="shape" data-speed="0.04" className=" shape one" width="57" height="57" />
								<Image src="/images/instructor/shape/02.png" alt="shape" data-speed="0.04" data-revert="true" className=" shape two" width="75" height="227" />
								<Image src="/images/instructor/shape/03.png" alt="shape" data-speed="0.04" className=" shape three" width="502" height="236" />
								<Image src="/images/instructor/shape/04.png" alt="shape" data-speed="0.04" data-revert="true" className=" shape four" width="185" height="198" />
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="title-area-left-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="22" height="22" />
								<span>Trở thành giảng viên & Truyền cảm hứng học tập</span>
							</div>
							<h2 className="title">Là giảng viên tại Studyhub, bạn sẽ có cơ hội truyền cảm hứng, hướng dẫn và dìu dắt một cộng đồng học viên đa dạng.</h2>
							<p className="post-title"> Chia sẻ kiến thức – Biến kinh nghiệm của bạn thành tài liệu học tập giá trị</p>
							<Link href="http://localhost:3000/instructor" className="rts-btn btn-primary with-arrow">Tham gia <i className="fa-regular fa-arrow-right"></i></Link>
						</div>
					</div>
				</div>
			</div>
			<div className="shape-area shape-image">
				<Image src="/images/instructor/shape/05.png" data-speed="0.04" alt="shape" className="shape" width="394" height="452" />
			</div>
		</div>
	)
}
