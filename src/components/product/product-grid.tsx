import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { ComponentDidMount } from "src/pages/search";
import axios from "axios";
interface ProductGridProps {
	className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "", category, subCategory, tag, }) => {
	const { query } = useRouter();
	
	const {
		isFetching: isLoading,
		isFetchingNextPage: loadingMore,
		fetchNextPage,
		hasNextPage,
		data,
		error,
	} = useProductsQuery({ limit: 10, ...query });
	if (error) return <p>{error.message}</p>;
	const ProtoProduct = {
		description: "Sporty Outfit for athelits and some other shit to fill the description",
		gallery: [
			{
				id: 0,
				original: "/assets/images/products/p-20-1.png",
				thumbnail: "/assets/images/products/p-20-1.png"
			},
			{
				id: 1,
				original: "/assets/images/products/p-20-2.png",
				thumbnail: "/assets/images/products/p-20-2.png"
			}
		],
		image: {
			id: 10,
			original: "/assets/images/products/p-20-m.png",
			thumbnail: "/assets/images/products/p-20-m.png"
		},
		name: "Test Athelite Dress for Kids",
		price: 99,
		sale_price: 69,
		slug: "Test Athelite Dress for Kids",
		variations: [
			{
				id: 56,
				value: "S",
				attribute: {
					id: 56,
					name: "Size",
					slug: "size"
				}
			},
			{
				id: 160,
				value: "M",
				attribute: {
					id: 56,
					name: "length",
					slug: "length"
				}
			}
		]
	}
	const [Related, setRelated] = useState([ProtoProduct])
	const { t } = useTranslation("common");
	useEffect(() => {
		if(!subCategory){
			if(tag){
				console.log("tag present");
				const catRelated = []
				console.log("inside use EFFECT");
				axios({
					url: "http://localhost:3003/api/products",
					method: "GET"
				}).then(res => {
					
					console.log(res.data);
					res.data.forEach(prod => {
						console.log(prod);
						const tags = prod.tags.split(" ")
						
						if(prod.category.toLowerCase() === category.toLowerCase() && tags.includes(tag)){
							catRelated.push(prod)
						}
						
					})
					setRelated(catRelated)
					
				})
				console.log(category);				
			}else{
				const catRelated = []
			console.log("inside use EFFECT");
			axios({
				url: "http://localhost:3003/api/products",
				method: "GET"
			}).then(res => {
				
				console.log(res.data);
				res.data.forEach(prod => {
					console.log(prod);
					
					if(prod.category.toLowerCase() === category.toLowerCase()){
						catRelated.push(prod)
					}
					
				})
				setRelated(catRelated)
				
			})
			console.log(category);
			}
		}else{
			const catRelated = []
			axios({
				url: "http://localhost:3003/api/products",
				method: "GET"
			}).then(res => {
				console.log(res.data);
				res.data.forEach(prod => {
					if(prod.category.toLowerCase() === category.toLowerCase() && prod.subCategory.toLowerCase() === subCategory){
						console.log("yah i found something for you");
						catRelated.push(prod)
						
					}
				})
				setRelated(catRelated)
			})

			
		}
		
		
	}, [])
	
	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !data?.pages?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					data?.pages?.map((page) => {
						return Related.map((product) => (					
							<ProductCard
								key={`product--key${product.id}`}
								product={product}
								variant="grid"
							/>
						));
					})
				)}
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)}
			</div>
		</>
	);
};
