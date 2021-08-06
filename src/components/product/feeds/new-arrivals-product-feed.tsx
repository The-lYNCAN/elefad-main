import ProductsBlock from "@containers/products-block";
import { useNewArrivalProductsQuery } from "@framework/product/get-all-new-arrival-products";
import axios from "axios";
import { useState } from "react";

export default function NewArrivalsProductFeed() {
	const { data, isLoading, error } = useNewArrivalProductsQuery({
		limit: 10,
	});
	const [rproducts, setRProducts] = useState(data)
	const ProAr = []

	axios({
		url: "http://localhost:3003/new",
		method: "GET",
	}).then(res => {
		const pids = res.data[0].topProducts
		console.log(pids);
		axios({
			url: "http://localhost:3003/api/products",
			method: "GET"
		}).then(response => {

			response.data.forEach(product => {
				if(pids.includes(product._id)){
					console.log("yes");
					console.log(data);
					ProAr.push(product)
				}else{
					console.log("no");
					
				}
			})
			if(rproducts === data){

				setRProducts(ProAr)
			}
		})
	})

	return (
		<ProductsBlock
			sectionHeading="text-new-arrivals"
			products={rproducts}
			loading={isLoading}
			error={error?.message}
			uniqueKey="new-arrivals"
		/>
	);
}
