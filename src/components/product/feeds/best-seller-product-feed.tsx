import ProductsBlock from "@containers/products-block";
import { useBestSellerProductsQuery } from "@framework/product/get-all-best-seller-products";
import axios from "axios";
import { useState } from "react";

export default function BestSellerProductFeed() {
	const { data, isLoading, error } = useBestSellerProductsQuery({
		limit: 10,
	});
	const [bestSelling, setBestSelling] = useState(data)
	console.log("below is best seller");
	console.log(data);
	const [rproducts, setRProducts] = useState(data)
	const ProAr = []

	axios({
		url: "http://localhost:3003/best",
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
			sectionHeading="text-best-sellers"
			products={rproducts}
			loading={isLoading}
			error={error?.message}
			uniqueKey="best-sellers"
		/>
	);
}
