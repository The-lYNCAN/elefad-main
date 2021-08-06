import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
	const router = useRouter()
	const id = router.query.slug
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
	const [productP, setProductP] = useState(ProtoProduct)
	useEffect(() => {
		console.log(id);
		axios({
			url: "http://localhost:3003/api/products",
			method: "GET"
		}).then(res => {
			console.log(res.data);
			res.data.forEach(product => {
				if(product._id === id){
					console.log(product);
					setProductP(product)
					
				}
			})
		})
	}, [])
	
	return (
		<>
			<Divider className="mb-0" />
			<Container>
				<div className="pt-8">
					<Breadcrumb />
				</div>
				<ProductSingleDetails product={productP} />
				{/* <RelatedProducts sectionHeading="text-related-products" /> */}
				<Subscription />
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
