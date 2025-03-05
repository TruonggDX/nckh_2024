import {useEffect, useState} from "react";
import api from "../route/cart";

const useCartData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [addCart(),removeData()]);

    function getData() {
        api.getAllCart().then((response) => {
            setData(response.data);
        });
    }

    function removeData(id) {
        api.deleteCart([id])
            .then(() => {
                getData()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateData(id, req) {
        api.updateCart(id, req)
            .then(() => {
                getData();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function addCart(itemId,req){
        api.addCart([{itemId,...req}]).then(() => {
            getData()
        }).catch((error) => {
            console.error(error);
        })
    }

    return {data, setData, getData, removeData, updateData,addCart};
};

export default useCartData;
