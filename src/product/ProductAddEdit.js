import { doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { collection } from '@firebase/firestore';
import React, { useState } from 'react';




export default function ProductAddEdit(props) {
    const [product, setProduct] = useState({ desc: "", price: 0 })
    const handleClickDesc = function (e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    useEffect(() => setProduct({ ...props.product }), [props.product]);
    const action = !props.product.id ? "新增" : "修改";
    const handleChange = function (e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const update = async function () {
        const db = getFirestore();
        try {
            if (action === "新增") {
                const docRef = await addDoc(collection(db, "product"), {
                    desc: product.desc,
                    price: parseInt(product.price)
                });
                console.log(docRef.id);
            }
            else {
                await setDoc(doc(db, "product", product.id), {
                    desc: product.desc,
                    price: parseInt(product.price)
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        props.close();
    }

}