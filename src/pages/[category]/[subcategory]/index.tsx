import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Category() {
	const router = useRouter()
	const productId = router.query.category
	const subcategory = router.query.subcategory
	
    console.log(productId);
	console.log(subcategory);
    console.log();
    
    
	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<CategoryBanner category={productId} />
				<div className="pb-16 lg:pb-20">
					<ProductGrid category={productId} subCategory={subcategory} className="3xl:grid-cols-6" />
				</div>
				<Subscription />
			</Container>
		</div>
	);
}

Category.Layout = Layout;

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
