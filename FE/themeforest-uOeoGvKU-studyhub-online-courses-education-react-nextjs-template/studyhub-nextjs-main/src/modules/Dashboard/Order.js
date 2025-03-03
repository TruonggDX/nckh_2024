import {useEffect, useState} from "react";
import api from '../../route/bill'
import {formatDateTime} from "@/utils/dateUtils";

export default function DashboardOrder() {
    const [bill, setBill] = useState([]);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        api.getBillByEmail().then(data => {
            setBill(data.content)
            console.log('data bill', data.content)
        })
        api.getBillDetailById(bill.id).then(data => {
            console.log('bill details', data)
        })
    }, [])
    const handleShow = (id) =>{
        console.log('handleShow', id)
    }
    return (
        <div className="rts-reviewd-area-dashed table-responsive">
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active today" role="tabpanel">
                    <h5 className="title">Khóa học đã mua</h5>
                    <table className="table-reviews quiz mb--0">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Ngày mua</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            bill.map((bill, index) => (
                                <tr>
                                    <td>
                                        <span className="questions">{index + 1}</span>
                                    </td>
                                    <td>
                                        <span className="questions">{bill.code}</span>
                                    </td>
                                    <td>
                                        <span className="marks">{formatDateTime(bill.createdDate)}</span>
                                    </td>
                                    <td>
                                        <div className="hold-area" style={{marginLeft: '20px'}}>
                                            <span onClick={() =>handleShow(bill.id)} className="hold-i"><i  className="fa-regular fa-clipboard-list"></i></span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
